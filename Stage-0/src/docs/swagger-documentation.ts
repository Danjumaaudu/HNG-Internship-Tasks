import swaggerJSDoc from "swagger-jsdoc";
import merouter from "../routes/me";


const swaggerDefinition= {
        openapi : "3.0.0",
        info : {
            title : "HNG Stage-Zero",
            version: "1.0.0",
            description : "A GET endpoint that fetchs random cat facts each time its called",
        },
        servers : [
            {
                url: "http://localhost:3000"
            },
        ],
    };

    const options = {
        swaggerDefinition,
        // apis : ["./src/routes/me.ts"],
    }
export const swaggerspec = swaggerJSDoc(options)