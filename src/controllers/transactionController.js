import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { transactionService } from "~/services/transactionService";

const createNew = async (req, res, next) =>{
    try {
        const newTransaction = await transactionService.createNew(req.body)
    
        res.status(StatusCodes.CREATED).json(newTransaction);
        
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error))
    }
}

export const transactionController = {
    createNew
}