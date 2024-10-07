# Architecture

To add button feedback to the Frontend-only Javascript application, it made sense to:
* Add a Node.js Express server to the backend (https://www.digitalocean.com/community/tutorials/nodejs-express-basics)
* Add Server-Side Events to the express server (https://www.digitalocean.com/community/tutorials/nodejs-server-sent-events-build-realtime-app)
* (Alternative) Add a Websocket client and server (https://dev.to/dipakahirav/real-time-communication-with-websockets-a-complete-guide-32g4)
* (Another ALternative) Add a WebRTC client and server (https://webrtc.org)


## Research

Investigated a number of options for communicating from the Server to the Client. 

https://medium.com/ableneo/deciding-a-way-to-exchange-data-between-client-and-server-a1ed1b949441

Discovered that the best two options are:
* Server-Side Events (SSE's) for mono-directional communication from Server to Client
* Websockets for bidirectional communication between the Server and Client


## Understanding JS Events

The core of the logic revolves around the "Drag & Drop" API: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
* 

https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer

* For touch objects passed between contexts


https://developer.mozilla.org/en-US/docs/Web/API/Touch_events

* `addEventListener()`



## Understanding Prototype binding (passing in methods)

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

## Game Logic

There appear to be a maximum of 20 tiles per team. These are created with the `createCounters()` logic.

* Player 1's first move is `<board-type>#<counter-number>` (i.e. `desktop#20-red`).
* Player 2'2 first move is `desktop#20-yellow`
* Player 1's second move is `desktop#19-red`
* etc.
