import {catalogModel} from "~/models/catalogModel"

const createNewCatalog = async (reqBody) => {
    try {
        const validNewCatalog = await catalogModel.CATALOG_COLLECTION_SCHEMA.validateAsync(reqBody, { abortEarly: false });

        const createdCatalog = await catalogModel.createNew(validNewCatalog);

        return await catalogModel.findById(createdCatalog.insertedId);
    } catch (error) {
        throw new Error(error);
    }
};

const checkExistCatalog = async (catalogName) =>{
    try {
        return await catalogModel.findByName(catalogName);
    } catch (error) {
        throw new Error(error);
    }
}

export const catalogService = {
    createNewCatalog,
    checkExistCatalog
};
