import Joi from "joi";

import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
    const validTransaction = Joi.object({
        Type: Joi.number().required().min(-1).max(1),
        catalogId: Joi.string().required().min(3).max(30).trim().strict(),
        timeCreate: Joi.string().pattern(/^\d{2}:\d{2}\s[AP]M$/).required(),
        dateCreate: Joi.string().pattern(/^\d{2}\/\d{2}\/\d{4}$/).required(),
        amount: Joi.number().required().min(500),
        note: Joi.string().required().min(1).max(255).trim().strict(),
    });

    try {
        const newTransactionData = req.body;

        await validTransaction.validateAsync(newTransactionData, { abortEarly: false });

        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error))
    }
};

export const transactionValidation = {
    createNew,
};
