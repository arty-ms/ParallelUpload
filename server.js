const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

const hostname = '127.0.0.1';
const port = 5000;

// increase memory for request to exclude 413 error
app.use(express.json({ limit: '50mb' }));
// for parsing body of request
app.use(bodyParser.json());
// for accessing js files from index.html
app.use(express.static('public', { setHeaders: function(res) {
        res.set('Cross-Origin-Embedder-Policy', 'require-corp')
}}));

app.use(function(req, res, next) {
    // this 2 headers are very important for usage of SharedArrayBuffer
    res.set('Cross-Origin-Opener-Policy', 'same-origin')
    res.set('Cross-Origin-Embedder-Policy', 'require-corp')
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/upload', (req, res) => {
    const { fileChunk, fileName, chunkId } = req.body;
    const directoryPath = path.join(__dirname, `./uploaded/${fileName}`);

    // create folder for fileChunks in the file system
    fs.mkdir(directoryPath, (e) => {
        // if folder already exists, do not throw error
        if (e && e.code !== 'EEXIST') {
            console.error(e);

            res.status(500).send({ status: 500, error: e.message });
        }

        // creation of file chunk
        fs.writeFile(path.join(directoryPath, `./${chunkId}`), fileChunk, (e, bytes) => {
            if (e)
                res.status(500).send( { status: 500, message: e.message });
            else
                res.status(200).send({ status: 200, message: 'Success' });
        });
    });
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
