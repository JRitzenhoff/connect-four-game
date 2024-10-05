const express = require('express');

const app = express();


const PORT = 3000;

let eventClients = [];


// ----------------------------------------
// Initialize and run the the server
// ---------------------
app.use('/play', express.static('public'));

app.get('/', (req, res) => {
    //   res.send('Successful response.');
    res.redirect('/play')
});

app.listen(PORT, () => {
    console.log(`Events service listening at http://localhost:${PORT}`)

    // start asking for commandline prompts
    askCommandlineForColumn();
})


// ----------------------------------------
// Logic related to event handling/sending
// ---------------------
function formatColumnNumberEventMessage(number) {
    // https://web.dev/articles/eventsource-basics
    return `data: ${number}\n\n`;
}

// save the client and send an initial data message
function registerEventClient(request, response, next) {
    // keep the connection alive indefinitely (to send events)
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);

    // send an initial message with the data value (need specific format)
    // const columnNumberEventMessage = formatColumnNumberEventMessage(0);
    // response.write(columnNumberEventMessage);

    // save the client (connection stays open because of the 'keep-alive')
    const clientId = Date.now();
    const newClient = {
        id: clientId,
        response
    };
    eventClients.push(newClient);

    // callback to remove the client once the client's connection has closed
    request.on('close',
        () => {
            console.log(`${clientId} Connection closed`);
            eventClients = eventClients.filter(client => client.id !== clientId);
        });
}

app.get('/receive_events', registerEventClient);

// Function that writes to the active eventClients
function sendPlacedColumnEvent(columnNumber) {
    const updatedColumnEventMessage = formatColumnNumberEventMessage(columnNumber);

    eventClients.forEach(client =>
        client.response.write(updatedColumnEventMessage)
    );
}

// ----------------------------------------
// Read column value from commandline
// ---------------------
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// rl.on('close', () => { console.log('Shutting down prompts') })

const askCommandlineForColumn = () => {
    rl.question(`Which column was a chip placed?: `,
        selectedColumnString => {
            let selectedColumn = parseInt(selectedColumnString, radix = 10)
            console.log(`Column selected ${selectedColumn}!\n`);

            sendPlacedColumnEvent(selectedColumn)

            // call the same function recursively (until a break happens)
            askCommandlineForColumn();
        })
}

