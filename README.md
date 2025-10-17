#    HNG INTERNSHIP - Stage-0 Tasks

#     Dynamic Profile Endpoint 
   
   This project is my submission to HNG internship stage 0 (Backend Track).

# Base URL
https://hng-internship-tasks.pxxl.click/me
# Endpont

   This is  a simple GET/me Endpoint that returns my profile information alongside a random cat fact fetched from an external api


#   Tech Stack used
   
   ¬Nodejs / Express
   
   ¬typescript
   
   ¬Axios - for collecting data from the external Api
   
   ¬CORS, MORGAN, Express-rate-limiter, and dotenv - used for best practices and stability


#   Features 
    
    ¬ Returns my profile data (email, name, backend stack)
    
    ¬Fetches a random fact from the Cat Facts API
    
    ¬Includes a live UTC timestamp in ISO 8601 format
    
    ¬Implements basic error handling, logging, and rate limiting
    
    ¬Uses environment variables for configuration

   

# HOW TO RUN LOCALLY 
   1. Clone the repository 
        git clone <repo url>

   2. Install dependecies
        npm install 

   3. Create a .env file in the directory 
        CAT_API_URL=https://catfact.ninja/fact
        USER_EMAIL=youremail@example.com
        USER_NAME=Your Full Name
        USER_STACK=Node.js/Express/TypeScript
    4. Run the development Server
        npm run dev


   
