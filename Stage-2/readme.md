🌍 Country Data API

A simple NestJS + Prisma + MySQL API that fetches, stores, and serves real-time country data including estimated GDP and currency information.

🚀 Features

Fetch and store countries from external APIs

Case-insensitive filtering and sorting

Dynamic summary image generation (/countries/image)

Auto-computed GDP estimates

Fully type-safe with Prisma ORM

🧠 Tech Stack

Node.js / TypeScript

Express.js

Prisma ORM

MySQL

Axios

Canvas (for image generation)

🛠️ Setup Instructions
1. Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

2. Install dependencies
npm install

3. Configure environment variables

Create a .env file in the root directory and add the following:

DATABASE_URL="mysql://<user>:<password>@localhost:3306/<database_name>"
PORT=3000

4. Setup Prisma
npx prisma generate
npx prisma migrate dev

5. Start the development server
npm run start:dev

📡 API Endpoints
Method	Endpoint	Description
POST	/countries/refresh	Fetch and store country data
GET	/countries	Get all countries (filters: region, currency, sort)
GET	/countries/:name	Get country by name (case-insensitive)
DELETE	/countries/:name	Delete a country by name
GET	/countries/status	Get total countries + last refresh
GET	/countries/image	Generate a summary image
📦 Dependencies

Main packages used:

"dependencies": {
  "@prisma/client": "^6.x",
  "axios": "^1.x",
  "express": "^4.x",
  "canvas": "^2.x"
},
"devDependencies": {
  "typescript": "^5.x",
  "ts-node-dev": "^2.x",
  "prisma": "^6.x"
}


Install all with:

npm install

🧩 Notes

The summary image is cached at /cache/summary.png.

On refresh, existing countries are updated automatically.

Case-insensitive filters supported: region, currency, and name.