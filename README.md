# HAPI - CMS API

Serve cms blocks/pages banners/carrers/cities/regions/companies/sellers/stores from ES

## Installation steps

1. Install [nvm](https://github.com/nvm-sh/nvm). This will help you manage several installations of `node`, locally
2. `nvm install 17.4.0`
3. `git clone git@gitlab.altex.ro:ams/hapi-cms.git`
4. `cd hapi-cms`
5. `npm install`
6. Install [redis](https://redis.io/download) locally. Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker.
7. `cp src/config/manifest.json.dist src/config/manifest.json`
8. Edit manifest.json and set host: 127.0.0.1 in all cache providers or any other redis host you use
9. `npm i nodemon` [node monitor](https://www.npmjs.com/package/nodemon)
10. Set variables in environments. Get serviceKey from Identity Manager App [dev/stage](https://im-api-s1.altex.ro/admin/dashboard) / [live](https://im-api.altex.ro/admin/dashboard).
11. `npm start` to start server
12. install [postman](https://www.postman.com)
13. Get postman collection from docs

## Dev notes
Node v 17.4.0
Hapi v 20.2.1

##Server connection keepAlive

In order to increase the server connection keepAlive and headersTimeout you have to set the following ENV vars on your process:

- KEEP_ALIVE_TIMEOUT - default value for now is 70000
- HEADERS_TIMEOUT - default value for now is 75000

*the timing is expressed in milliseconds
