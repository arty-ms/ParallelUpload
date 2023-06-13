function encrypt(chunk, secretKey) {
    // creating nonce which should also be transferred to server, but not in this article
    const nonce = nacl.randomBytes(24);

    // chunk encrypted with nonce and secret key
    const encryptedChunk = nacl.secretbox(chunk, nonce, secretKey);

    // base64 encoded typed array to be sent to the server
    return nacl.util.encodeBase64(encryptedChunk);
}