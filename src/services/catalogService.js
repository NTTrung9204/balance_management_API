import {catalogModel} from "~/models/catalogModel"

const createNewCatalog = async (reqBody) => {
    try {
    
        const createdCatalog = await catalogModel.createNew(reqBody);

        return await catalogModel.findById(createdCatalog.insertedId);
    } catch (error) {
        throw new Error(error);
    }
};

export const catalogService = {
    createNewCatalog,
};
