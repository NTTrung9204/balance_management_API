import { env } from "~/config/environment";

import { MongoClient } from "mongodb";

let balanceManagementDBInstance = null;

const mongoClientInstance = new MongoClient(env.MONGODB_URI);

export const CONNECT_DB = async () => {
    await mongoClientInstance.connect();

    balanceManagementDBInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

export const CLOSE_DB = async () => {
    await mongoClientInstance.close();
};

export const GET_DB = () => {
    if (!balanceManagementDBInstance) throw new Error("Must connect to database first!");
    return balanceManagementDBInstance;
};
