import express from "express";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/config/mongodb";
import exitHook from "async-exit-hook";
import { env } from "~/config/environment";
import { APIs_V1 } from "~/routes/v1"

const START_SERVER = () => {
    const app = express();

    app.use(express.json())

    app.use("/", APIs_V1);

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`Hello ${env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`);
    });

    exitHook(() => {
        console.log("Disconnecting from MongoDB Compass");
        CLOSE_DB();
    });
};

(async () => {
    try {
        console.log("Connecting to MongoDB Compass...");
        await CONNECT_DB();
        console.log("Connected to MongoDB Compass!");
        START_SERVER();
    } catch (error) {
        console.error(error);
    }
})();
