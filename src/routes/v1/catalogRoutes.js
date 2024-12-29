import express from "express";
import { StatusCodes } from "http-status-codes";
import { catalogValidation } from "~/validations/catalogValidation";
import { catalogController } from "~/controllers/catalogController";

const Router = express.Router();

Router.route("/")
    .get((req, res) => {
        res.status(StatusCodes.OK).json({ message: "GET" });
    })
    .post(catalogValidation.createNew, catalogController.createNew);

export const catalogRoute = Router;
