/**
 *  HTTP is built on top of transport layer i.e. TCP
 *  http module in node extends from net module therefore some of the nomenclature is same
 *  HTTP isn't concern with any underlying layers similar to TCP
 *  it's a standardized format in which info is supposed to be exchanged
 *  so everyone is on the same page so to speak
 *  if everyone had their own protocol we'd need to manually set that up everytime we needed to exchange info via internet
 */

import http from 'node:http'

const server = http.createServer()

server.on('request', (req, _res) => {
  /**
  *  HTTP request constitutes
  *  1. URL - contains the route as well ex. domain/users/posts
  *  2. method - HTTP methods to indicate what a request intents to do
  *  3. headers - info regarding the req
  *  4. body - data that was sent from the client to server
  *  NOTE: body can't be accessed via req.body as it'd mean data is loaded in it's entirety in memory and is made accessible
  *  both req res are readable streams so any info that is to be received or sent is to sent in small chunks
  *  both req res are just extended stream objs. i.e. they are extended from node:streams with additional properties
  */

  /**
  * NOTE: how node:http implements req, res
  * 1.when a req hits the server the raw binary data is parsed into HTTP meta data using http parser
  * 2. new stream instances are created for both req. readable and res. writable.
  * 3. additional HTTP metadata and helpers are appended to these obj.
  * 4. these are made available to consume via callbacks params.
  */

	console.info('** URL **')
	console.info('URL:', req.url)

	console.info('** METHOD **')
	console.info('METHOD:', req.method)


	console.info('** HEADERS **')
	console.info('HEADERS:', req.headers)
})


const PORT = 1024
const HOSTNAME = '127.0.0.1'

server.listen(PORT, HOSTNAME, () => {
	console.info(`server listening @http://${HOSTNAME}:${PORT}`)
})
