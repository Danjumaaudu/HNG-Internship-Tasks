#    HNG INTERNSHIP - Stage-0 Tasks

#     Dynamic Profile Endpoint 
   
   This project is my submission to HNG internship stage 0 (Backend Track).

   Its a simple restful api thats returns my profile information along side with a random cat fact fetched from an external api

#   Tech Stack used
   
   ¬Nodejs / Express
   
   ¬typescript
   
   ¬Axios - for collecting data from the exteral Api
   
   ¬CORS,MORGAN, Express-rate-limiter and dotenv - used for best pratices and stablity
   
   ¬Swagger UI - used for documentation


#   Features 
    
    ¬ Returns my profile data (email, name, backend stack)
    
    ¬Fetches a random fact from the Cat Facts API
    
    ¬Includes a live UTC timestamp in ISO 8601 format
    
    ¬Implements basic error handling, logging, and rate limiting
    
    ¬Uses environment variables for configuration

    ¬Swagger documentation available at /api-docs

# HOW TO RUN LOCALLY 
   1. Clone the repository 
        git clone <repo url>

   2. Install dependecies
        npm install 

   3. Create a .env file in directory 
        CAT_API_URL=https://catfact.ninja/fact
        USER_EMAIL=youremail@example.com
        USER_NAME=Your Full Name
        USER_STACK=Node.js/Express/TypeScript
    4. Run the development Server
        npm run dev

#  Visit:

     API Endpoint: http://localhost:3000/me

     Swagger Docs: http://localhost:3000/api-docs
   