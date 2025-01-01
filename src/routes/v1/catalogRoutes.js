import express from "express";
import { catalogValidation } from "~/validations/catalogValidation";
import { catalogController } from "~/controllers/catalogController";

const Router = express.Router();

Router.route("/")
    .get(catalogController.getCatalog)
    .post(catalogValidation.createNew, catalogController.createNew);

Router.route("/statistics")
    .get(catalogController.getCatalogStatistics)

export const catalogRoute = Router;
