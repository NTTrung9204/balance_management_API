import Joi from "joi";

import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
    const validCatalog = Joi.object({
        catalogName: Joi.string().required().min(1).max(255).trim().strict(),
    });

    try {
        const newCatalogData = req.body;

        await validCatalog.validateAsync(newCatalogData, { abortEarly: false });

        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error))
    }
};

export const catalogValidation = {
    createNew,
};
