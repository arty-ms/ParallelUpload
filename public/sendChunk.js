importScripts('upload.js');

const secretKey = nacl.randomBytes(32);

async function sendChunk(file, fileName, chunksQueue) {
    const CHUNK_SIZE = 1000000;

    if (!chunksQueue.length)
        return;

    const chunkId = chunksQueue.shift();
    const begin = chunkId * CHUNK_SIZE;
    const chunk = file.slice(begin, begin + CHUNK_SIZE);
    const encryptedChunk = encrypt(chunk, secretKey);

    upload({ fileChunk: encryptedChunk, fileName, chunkId })
        .then(() => {
            sendChunk(file, fileName, chunksQueue);
        })
        .catch(() => {
            chunksQueue.unshift(chunkId);
        });
}
