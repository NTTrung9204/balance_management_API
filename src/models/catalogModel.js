import Joi from "joi";
import { PATTERN_VALIDATOR, PATTERN_VALIDATOR_MESSAGE } from "~/utils/validator";
import { GET_DB } from "~/config/mongodb";

const CATALOG_COLLECTION_NAME = "catalogs";
const CATALOG_COLLECTION_SCHEMA = Joi.object({
    catalogId: Joi.string().pattern(PATTERN_VALIDATOR.OBJECT_ID_PATTERN).message(PATTERN_VALIDATOR_MESSAGE.OBJECT_ID_PATTERN_MESSAGE),

    catalogName: Joi.string().required().min(1).max(255).trim().strict(),

    Timestamp: Joi.date().timestamp("javascript").default(Date.now),
    lastUpdate: Joi.date().timestamp("javascript").default(null),
    _destroy: Joi.boolean().default(false),
});

const createNew = async (data) =>{
    try {
        return await GET_DB().collection(CATALOG_COLLECTION_NAME).insertOne(data)
    } catch (error) {
        throw new Error(error)
    }
}

const findById = async (catalogId) =>{
    try {
        return await GET_DB().collection(CATALOG_COLLECTION_NAME).findOne({
            _id: catalogId
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const catalogModel = {
    createNew,
    findById,
    CATALOG_COLLECTION_NAME,
    CATALOG_COLLECTION_SCHEMA,
};
