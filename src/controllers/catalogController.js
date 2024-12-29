import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { catalogService } from "~/services/catalogService";

const createNew = async (req, res, next) =>{
    try {
        const newCatalog = await catalogService.createNewCatalog(req.body)
    
        res.status(StatusCodes.CREATED).json(newCatalog);
        
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error))
    }
}

export const catalogController = {
    createNew
}