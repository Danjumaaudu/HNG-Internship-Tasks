import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createCanvas } from "canvas";
import axios from "axios";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export const refreshCountries = async (req: Request, res: Response) => {
  try {
    // 1️⃣ Fetch all countries
    const { data: countries } = await axios.get(
      "https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies"
    );

    // 2️⃣ Fetch exchange rates (USD as base)
    const { data: ratesResponse } = await axios.get(
      "https://open.er-api.com/v6/latest/USD"
    );
    const rates = ratesResponse.rates;

    async function processInBatches<T>(
      items: T[],
      batchSize: number,
      callback: (item: T) => Promise<any>
    ) {
      const results = [];
      for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await Promise.all(batch.map(callback));
        results.push(...batchResults);
      }
      return results;
    }
    req.setTimeout(30000); // 30 seconds

    // 3️⃣ Iterate and process countries
    const processedCountries = await processInBatches(
      countries,
      2,
      async (c: any) => {
        const currency = c.currencies?.[0]?.code || null;
        const exchangeRate = currency ? rates[currency] || null : null;
        const randomMultiplier =
          Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

        const estimated_gdp =
          exchangeRate && c.population
            ? (c.population * randomMultiplier) / exchangeRate
            : 0;

        // Upsert: update if exists, else insert
        return prisma.country.upsert({
          where: { name: c.name },
          update: {
            capital: c.capital || null,
            region: c.region || null,
            population: c.population || 0,
            currency_code: currency,
            exchange_rate: exchangeRate,
            estimated_gdp,
            flag_url: c.flag || null,
            last_refreshed_at: new Date(),
          },
          create: {
            name: c.name,
            capital: c.capital || null,
            region: c.region || null,
            population: c.population || 0,
            currency_code: currency,
            exchange_rate: exchangeRate,
            estimated_gdp,
            flag_url: c.flag || null,
          },
        });
      }
    );
    // ✅ Response
    return res.status(200).json({
      message: "Countries refreshed successfully",
      total: processedCountries.length,
      last_refreshed_at: new Date(),
    });
  } catch (error) {
    console.error(error);
    return res.status(503).json({
      error: "External data source unavailable",
    });
  } finally {
    await prisma.$disconnect();
  }
};

//to get all countries
export const getCountries = async (req: Request, res: Response) => {
  try {
    const { region, currency, sort } = req.query;

    const where: any = {};

    if (region) {
      where.region = { equals: String(region), mode: "insensitive" };
    }

    if (currency) {
      where.currency_code = { equals: String(currency), mode: "insensitive" };
    }

    let orderBy: any = undefined;

    if (sort === "gdp_desc") orderBy = { estimated_gdp: "desc" };
    if (sort === "gdp_asc") orderBy = { estimated_gdp: "asc" };

    const countries = await prisma.country.findMany({
      where,
      orderBy,
      select: {
        id: true,
        name: true,
        capital: true,
        region: true,
        population: true,
        currency_code: true,
        exchange_rate: true,
        estimated_gdp: true,
        flag_url: true,
        last_refreshed_at: true,
      },
    });

    res.json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get country by Name
export const getCountryByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const country = await prisma.country.findFirst({
      where: {
        name: { equals: name.toLowerCase() },
      },
    });

    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }

    return res.json(country);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//delete by na,e
export const deletebyname = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const deleted = await prisma.country.deleteMany({
      where: {
        name: {
          equals: name.toLowerCase(),
        },
      },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ error: "Country not found" });
    }

    return res.status(200).json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
//get coyuntry status
export const getcounrtyStatus = async (req: Request, res: Response) => {
  try {
    const totalCountries = await prisma.country.count();
    const lastRefreshed = await prisma.country.findFirst({
      orderBy: { last_refreshed_at: "desc" },
      select: { last_refreshed_at: true },
    });
    return res.status(200).json({
      total_countries: totalCountries,
      last_refreshed_at: lastRefreshed?.last_refreshed_at || null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//getcountrybyimage

export const getCountrySummaryImage = async (req: Request, res: Response) => {
  try {
    const totalCountries = await prisma.country.count();

    const topGDP = await prisma.country.findMany({
      orderBy: { estimated_gdp: "desc" },
      take: 5,
      select: { name: true, estimated_gdp: true },
    });

    const latest = await prisma.country.findFirst({
      orderBy: { last_refreshed_at: "desc" },
      select: { last_refreshed_at: true },
    });

    const canvas = createCanvas(1000, 500);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#111827";
    ctx.font = "bold 36px Arial";
    ctx.fillText("🌍 Global Country Summary", 40, 70);

    ctx.font = "24px Arial";
    ctx.fillText(`Total Countries: ${totalCountries}`, 60, 140);

    ctx.font = "bold 24px Arial";
    ctx.fillText("Top 5 Countries by Estimated GDP:", 60, 200);

    ctx.font = "22px Arial";
    topGDP.forEach((c, i) => {
      const gdpValue = c.estimated_gdp ?? 0;
      ctx.fillText(
        `${i + 1}. ${c.name} - $${gdpValue.toLocaleString()}`,
        80,
        240 + i * 40
      );
    });

    ctx.font = "20px Arial";
    ctx.fillStyle = "#374151";
    ctx.fillText(
      `Last Refreshed: ${
        latest?.last_refreshed_at
          ? new Date(latest.last_refreshed_at).toLocaleString()
          : "N/A"
      }`,
      60,
      450
    );

    // Save + respond with PNG
    const buffer = canvas.toBuffer("image/png");
    const cacheDir = path.join(process.cwd(), "cache");
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);
    fs.writeFileSync(path.join(cacheDir, "summary.png"), buffer);

    // 🟢 Display image in browser
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Disposition", "inline; filename=summary.png");
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate image" });
  }
};
