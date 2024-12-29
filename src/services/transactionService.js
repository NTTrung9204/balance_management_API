import { slugify } from "~/utils/formatters";

const createNew = async (reqBody) => {
    try {

        const newTransaction = {
            ...reqBody,
            slug: slugify(reqBody.note),
        };

        return newTransaction;
    } catch (error) {
        throw error;
    }
};

export const transactionService = {
    createNew,
};
