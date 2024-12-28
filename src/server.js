import express from "express";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/config/mongodb";
import exitHook from "async-exit-hook";

const START_SERVER = () => {
    const app = express();

    const hostname = "localhost";
    const port = 8017;

    app.get("/", async (req, res) => {
        console.log(await GET_DB().listCollections().toArray());
        res.end("<h1>Hello World!</h1><hr>");
    });

    app.listen(port, hostname, () => {
        console.log(`Hello Chun, I am running at http://${hostname}:${port}/`);
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
