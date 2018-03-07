import { createConnection } from "typeorm";

import { Movie } from "./entities/movie";

/*
Please set the env var:

export DATABASE_USER=postgres \
export DATABASE_PASSWORD=secret \
export DATABASE_HOST=localhost \
export DATABASE_PORT=5432 \
export DATABASE_DB=demo

*/

export async function getDbConnection() {

    const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
    const DATABASE_USER = process.env.DATABASE_USER || "";
    const DATABASE_PORT = 5432;
    const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "";
    const DATABASE_DB = "demo";

    const entities = [
        Movie
    ];

    const conn = await createConnection({
        type: "postgres",
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_DB,
        entities: entities,
        synchronize: true
    });

    return conn;

}
