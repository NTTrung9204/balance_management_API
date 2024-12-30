import Joi from "joi";
import { PATTERN_VALIDATOR, PATTERN_VALIDATOR_MESSAGE } from "~/utils/validator";

import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
    const validTransaction = Joi.object({
        Type: Joi.number().required().min(-1).max(1),
        catalogId: Joi.string()
            .pattern(PATTERN_VALIDATOR.OBJECT_ID_PATTERN)
            .message(PATTERN_VALIDATOR_MESSAGE.OBJECT_ID_PATTERN_MESSAGE)
            .required(),
        timeCreate: Joi.string().pattern(PATTERN_VALIDATOR.TIME_PATTERN).message(PATTERN_VALIDATOR_MESSAGE.TIME_PATTERN_MESSAGE).required(),
        dateCreate: Joi.string().pattern(PATTERN_VALIDATOR.DATE_PATTERN).message(PATTERN_VALIDATOR_MESSAGE.DATE_PATTERN_MESSAGE).required(),
        amount: Joi.number().required().min(500),
        note: Joi.string().required().min(1).max(255).trim().strict(),
    });

    try {
        const newTransactionData = req.body;

        await validTransaction.validateAsync(newTransactionData, { abortEarly: false });

        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error));
    }
};

const checkCatalogNameExist = (catalogName) => {};

export const transactionValidation = {
    createNew,
};
