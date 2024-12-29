import express from 'express'
import {transactionRoute} from './transactionRoutes'
import { catalogRoute } from './catalogRoutes'

const Router = express.Router()

Router.use('/transaction', transactionRoute)
Router.use('/catalog', catalogRoute)

export const APIs_V1 = Router