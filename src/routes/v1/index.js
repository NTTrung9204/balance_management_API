import express from 'express'
import {transactionRoute} from '~/routes/v1/transactionRoutes'

const Router = express.Router()

Router.use('/', transactionRoute)

export const APIs_V1 = Router