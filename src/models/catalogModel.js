import Joi from "joi";
import { GET_DB } from "~/config/mongodb";
import { ObjectId } from "mongodb";

const CATALOG_COLLECTION_NAME = "catalogs";
const CATALOG_COLLECTION_SCHEMA = Joi.object({
    catalogName: Joi.string().required().min(1).max(255).trim().strict(),

    Timestamp: Joi.date().timestamp("javascript").default(Date.now),
    lastUpdate: Joi.date().timestamp("javascript").default(null),
    _destroy: Joi.boolean().default(false),
});

const createNew = async (data) => {
    try {
        return await GET_DB().collection(CATALOG_COLLECTION_NAME).insertOne(data);
    } catch (error) {
        throw new Error(error);
    }
};

const findById = async (catalogId) => {
    try {
        return await GET_DB()
            .collection(CATALOG_COLLECTION_NAME)
            .findOne({
                _id: new ObjectId(catalogId),
            });
    } catch (error) {
        throw new Error(error);
    }
};

const findByName = async (catalogName) => {
    try {
        return await GET_DB().collection(CATALOG_COLLECTION_NAME).findOne({ catalogName });
    } catch (error) {
        throw new Error(error);
    }
};

const getListCatalog = async () => {
    try {
        return await GET_DB().collection(CATALOG_COLLECTION_NAME).find({}).toArray();
    } catch (error) {
        throw new Error(error);
    }
};

const getCatalogStatistics = async () => {
    try {
        return await GET_DB()
            .collection(CATALOG_COLLECTION_NAME)
            .aggregate([
                {
                    $lookup: {
                        from: "transactions",
                        localField: "_id",
                        foreignField: "catalogId",
                        as: "catalogStatistics",
                    },
                },
                {
                    $unwind: {
                        path: "$catalogStatistics",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        total: {
                            $sum: {
                                $cond: {
                                    if: { $eq: ["$catalogStatistics.Type", 1] },
                                    then: "$catalogStatistics.amount",
                                    else: { $multiply: ["$catalogStatistics.amount", -1] },
                                },
                            },
                        },
                        income: {
                            $sum: {
                                $cond: {
                                    if: { $eq: ["$catalogStatistics.Type", 1] },
                                    then: "$catalogStatistics.amount",
                                    else: { $multiply: ["$catalogStatistics.amount", 0] },
                                },
                            },
                        },
                        expense: {
                            $sum: {
                                $cond: {
                                    if: { $eq: ["$catalogStatistics.Type", -1] },
                                    then: "$catalogStatistics.amount",
                                    else: { $multiply: ["$catalogStatistics.amount", 0] },
                                },
                            },
                        },
                        catalog_name: { $first: "$catalogName" },
                    },
                },
            ])
            .toArray();
    } catch (error) {
        throw new Error(error);
    }
};

export const catalogModel = {
    createNew,
    findById,
    findByName,
    getListCatalog,
    getCatalogStatistics,
    CATALOG_COLLECTION_NAME,
    CATALOG_COLLECTION_SCHEMA,
};
