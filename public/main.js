document.addEventListener('DOMContentLoaded', () => {
    const worker = new Worker('/worker.js');

    const fileInput = document.getElementById('file_handler');

    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];

        worker.postMessage({ file });
    });
});