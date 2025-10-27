import { Router } from "express";
import {
  deletebyname,
  getcounrtyStatus,
  getCountries,
  getCountryByName,
  getCountrySummaryImage,
  refreshCountries,
} from "../controllers/country.controller";

const countryRoutes = Router();
countryRoutes.post("/refresh", refreshCountries);

countryRoutes.get("/", getCountries);
countryRoutes.get("/status", getcounrtyStatus);
countryRoutes.get("/image", getCountrySummaryImage);
countryRoutes.get("/:name", getCountryByName);
countryRoutes.delete("/:name", deletebyname);

export default countryRoutes;
