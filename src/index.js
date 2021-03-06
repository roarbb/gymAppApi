import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import initializeDb from './db'
import middleware from './middleware'
import config from './config.json'

import aboutApi from './about'
import maxApi from './max'
import userApi from './user'

let app = express()
app.server = http.createServer(app)

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}))

app.use(bodyParser.json({
	limit : config.bodyLimit
}))

// connect to db
initializeDb( db => {

	// internal middleware
	app.use(middleware({ config, db }))

	app.use('/', aboutApi())
	app.use('/max', maxApi({config, db}))
	app.use('/user', userApi({config, db}))

	app.server.listen(process.env.PORT || config.port)

	console.log(`Started on port ${app.server.address().port}`)
})

export default app
