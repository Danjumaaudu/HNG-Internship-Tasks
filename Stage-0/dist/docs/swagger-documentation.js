"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerspec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "HNG Stage-Zero",
        version: "1.0.0",
        description: "A GET endpoint that fetchs random cat facts each time its called",
    },
    servers: [
        {
            url: "http://localhost:3000"
        },
    ],
};
const options = {
    swaggerDefinition,
    // apis : ["./src/routes/me.ts"],
};
exports.swaggerspec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger-documentation.js.map