# Covid19 API Canada
A Covid19 data API for Canada.

Running at https://api.kevintheriault.tech/api.

Can GET data by location passing it as a param ie. https://api.kevintheriault.tech/api/Canada.

This project was initially created to maintain a central up-to-date API for Canadian national and provincial COVID19 data. It was updated manually using POST since most sources of the data was not able to be automatically fetched.  Right now however the data is automatically fetched from https://api.opencovid.ca and formatted to fit with our API formatting.  Only updating data I use for graphing COVID19 trends.

Project is using NodeJS, Express, MongoDB, Mongoose for the central API functionality.

Security is maintained with Auth0.

Running with cors to allow cross-site fetching.

CRON-NODE is running updates to the database once a day for national and provincial data from opencovid.ca.

I used lodash to sort the data for GET requests. -Data sorted in MongoDB was not maintaining their sorted-ness.

To delete/update/post data you can use the /admin route with a token.

Also available dockerized:

https://hub.docker.com/repository/docker/theriake/cov_node_api

Can quickly get an API server up and running using Docker-compose.

I used nginx mongodb in Docker-compose to create the server.

