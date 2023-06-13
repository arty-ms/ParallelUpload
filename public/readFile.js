function readFile(file) {
    return new Promise((resolve) => {
        const fileReader = new FileReader();

        fileReader.onload = function () {
            const data = fileReader.result;

            const fileUint8Array = new Uint8Array(data);

            resolve(fileUint8Array);
        };

        fileReader.readAsArrayBuffer(file);
    });
}
