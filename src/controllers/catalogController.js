import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { catalogService } from "~/services/catalogService";

const createNew = async (req, res, next) =>{
    try {
        const newCatalogData = req.body;
        if(await catalogService.checkExistCatalog(newCatalogData.catalogName)){
            return next(new ApiError(StatusCodes.CONFLICT, "Catalog name has already existed!"))
        }

        const newCatalog = await catalogService.createNewCatalog(newCatalogData)
    
        res.status(StatusCodes.CREATED).json(newCatalog);
        
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error))
    }
}

const getCatalog = async (req, res, next) =>{
    try {
        const listCatalog = await catalogService.getListCatalog()
        res.status(StatusCodes.OK).json(listCatalog);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error))
    }
}

const getCatalogStatistics = async (req, res, next) =>{
    try {
        const catalogStatistics = await catalogService.getCatalogStatistics()
        res.status(StatusCodes.OK).json(catalogStatistics);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error))
    }
}

export const catalogController = {
    createNew,
    getCatalog,
    getCatalogStatistics
}