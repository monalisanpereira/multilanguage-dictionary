import { createConnection } from "typeorm/globals.js"; 
import { Entry } from "./entities/Entry";
import express from "express";
import 'dotenv/config';
import { entriesRouter } from "./routes/entries";

const app = express();

const main = async () => {
    try {
        const connection = await createConnection({
            type: "postgres",
            host: process.env.DB_HOST,
            port: process.env.DB_PORT as unknown as number,
            username: process.env.DB_USER,
            database: process.env.DB_NAME,
            entities: [ Entry ],
            synchronize: true
        })
        console.log(`Connected to PostgreSQL`);
        
        const server_port = process.env.SERVER_PORT as unknown as number
        app.use(express.json());
        app.use(entriesRouter);
        app.listen(server_port, () => {
            console.log(`Server listening on port ${server_port}...`)
        })
    } catch (error) {
        console.error(error);
        throw new Error("Unable to start server.")
    }
}

main();