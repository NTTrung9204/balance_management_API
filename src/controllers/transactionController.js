import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

const createNew = (req, res, next) =>{
    console.log(123)
    try {
        res.status(StatusCodes.CREATED).json({ message: "POST SUCCESS" });
        
        // throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "test")
    } catch (error) {
        next(error)
        // return new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error)
    }
}

export const transactionController = {
    createNew
}