import Joi from "joi";
import { PATTERN_VALIDATOR, PATTERN_VALIDATOR_MESSAGE } from "~/utils/validator";

const TRANSACTION_COLLECTION_NAME = "transactions";
const TRANSACTION_COLLECTION_SCHEMA = Joi.object({
    transactionId: Joi.string().pattern(PATTERN_VALIDATOR.OBJECT_ID_PATTERN).message(PATTERN_VALIDATOR_MESSAGE.OBJECT_ID_PATTERN_MESSAGE),

    Type: Joi.number().required().min(-1).max(1),
    catalogId: Joi.string().pattern(PATTERN_VALIDATOR.OBJECT_ID_PATTERN).message(PATTERN_VALIDATOR_MESSAGE.OBJECT_ID_PATTERN_MESSAGE),
    timeCreate: Joi.string().pattern(PATTERN_VALIDATOR.TIME_PATTERN).message(PATTERN_VALIDATOR_MESSAGE.TIME_PATTERN_MESSAGE).required(),
    dateCreate: Joi.string().pattern(PATTERN_VALIDATOR.DATE_PATTERN).message(PATTERN_VALIDATOR_MESSAGE.DATE_PATTERN_MESSAGE).required(),
    amount: Joi.number().required().min(500),
    note: Joi.string().required().min(1).max(255).trim().strict(),

    slug: Joi.string().required().min(1).trim().strict(),
    Timestamp: Joi.date().timestamp("javascript").default(Date.now),
    lastUpdate: Joi.date().timestamp("javascript").default(null),
    _destroy: Joi.boolean().default(false),
});

export const transactionModel = {
    TRANSACTION_COLLECTION_NAME,
    TRANSACTION_COLLECTION_SCHEMA,
};
