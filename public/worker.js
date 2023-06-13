console.log('Running worker...');

if( 'function' === typeof importScripts) {
    importScripts('nacl.min.js');
    importScripts('nacl-util.min.js');
    importScripts('encrypt.js');
    importScripts('upload.js');
    importScripts('sendChunk.js');
    importScripts('readFile.js');

    let chunksQueue = [];
    const CHUNK_SIZE = 1000000;

    function getChunksAmount(fileSize) { return Math.ceil(fileSize / CHUNK_SIZE) }

    const getChunksQueue = (chunksQuantity) => {
        return new Array(chunksQuantity).fill().map((_, index) => index);
    };

    self.onmessage = (msg) => {
        if (msg.data.file) {
            const { file } = msg.data;

            readFile(file).then((res) => {
                const chunksAmount = getChunksAmount(res.length);
                chunksQueue = getChunksQueue(chunksAmount);
                sendChunk(res, file.name, chunksQueue).catch((e) => console.log(e));
            });
        }
    }
}
