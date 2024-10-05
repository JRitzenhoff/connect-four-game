# Architecture

To add button feedback to the Frontend-only Javascript application, it made sense to:
* Add a Node.js Express server to the backend (https://www.digitalocean.com/community/tutorials/nodejs-express-basics)
* Add Server-Side Events to the express server (https://www.digitalocean.com/community/tutorials/nodejs-server-sent-events-build-realtime-app)
* (Optional Alternative) Add a Websocket client and server (https://dev.to/dipakahirav/real-time-communication-with-websockets-a-complete-guide-32g4)


## Research

Investigated a number of options for communicating from the Server to the Client. 

https://medium.com/ableneo/deciding-a-way-to-exchange-data-between-client-and-server-a1ed1b949441

Discovered that the best two options are:
* Server-Side Events (SSE's) for mono-directional communication from Server to Client
* Websockets for bidirectional communication between the Server and Client
