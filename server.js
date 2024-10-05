const express = require('express');

const app = express();

// setup the middleware to serve the files in the public directory
app.use('/play', express.static('public'));

app.get('/', (req, res) => {
    //   res.send('Successful response.');
    res.redirect('/play')
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));