import express from "express";
import { StatusCodes } from "http-status-codes";
import { transactionValidation } from "~/validations/transactionValidation";
import { transactionController } from "~/controllers/transactionController";

const Router = express.Router();

Router.route("/transaction")
    .get((req, res) => {
        res.status(StatusCodes.OK).json({ message: "GET" });
    })
    .post(transactionValidation.createNew, transactionController.createNew);

export const transactionRoute = Router;
