import { slugify } from "~/utils/formatters";

const createNew = async (reqBody) => {
    try {

        const newTransaction = {
            ...reqBody,
            slug: slugify(reqBody.note),
        };

        return newTransaction;
    } catch (error) {
        throw new Error(error);
    }
};

export const transactionService = {
    createNew,
};
