import express from 'express'
import { sortHelper } from '~/utils/sorts.js'

const app = express()

const hostname = 'localhost'
const port = 8017

app.get('/', (req, res) => {
  console.log(sortHelper())
  res.end('<h1>Hello World!</h1><hr>')
})

app.listen(port, hostname, () => {
  console.log(`Hello Chun, I am running at http://${ hostname }:${ port }/`)
})
