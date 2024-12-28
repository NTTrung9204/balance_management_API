import express from "express";
import { StatusCodes } from "http-status-codes";
import { transactionValidation } from "~/validations/transactionValidation";

const Router = express.Router();

Router.route("/transaction")
    .get((req, res) => {
        res.status(StatusCodes.OK).json({ message: "GET" });
    })
    .post(transactionValidation.createNew);

export const transactionRoute = Router;
