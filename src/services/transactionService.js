import { slugify } from "~/utils/formatters";
import { catalogModel } from "~/models/catalogModel";
import { transactionModel } from "~/models/transactionModel";

const createNew = async (reqBody) => {
    try {
        if (!(await catalogModel.findById(reqBody.catalogId))){
            throw new Error("Catalog Id not found!")
        }

        const newTransaction = {
            ...reqBody,
            slug: slugify(reqBody.note),
        };

        const validNewTransaction = await transactionModel.TRANSACTION_COLLECTION_SCHEMA.validateAsync(newTransaction, { abortEarly: false });

        const createdTransaction = await transactionModel.createNew(validNewTransaction);

        return await transactionModel.findById(createdTransaction.insertedId);
    } catch (error) {
        throw new Error(error);
    }
};

export const transactionService = {
    createNew,
};
