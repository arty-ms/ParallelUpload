async function upload({ fileChunk, fileName, chunkId }) {
    const BACKEND_URL = 'http://localhost:5000';

    return fetch(`${BACKEND_URL}/upload`, {
        method: 'POST',
        body: JSON.stringify({ fileChunk, fileName, chunkId }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(res => {
            if (res.status === 200)
                return 'ok'

            throw new Error('Server Error');
        });
}
