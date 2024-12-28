const MONGODB_URI = "mongodb://localhost:27017";
const DATABASE_NAME = "balance_management";

import { MongoClient, ServerApiVersion } from "mongodb";

let balanceManagementDBInstance = null;

const mongoClientInstance = new MongoClient(MONGODB_URI);

export const CONNECT_DB = async () => {
    await mongoClientInstance.connect();

    balanceManagementDBInstance = mongoClientInstance.db(DATABASE_NAME);
};

export const GET_DB = () => {
    if (!balanceManagementDBInstance) throw new Error("Must connect to database first!");
    return balanceManagementDBInstance;
};
