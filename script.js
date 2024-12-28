document.addEventListener('DOMContentLoaded', () => {
    const urlBatchesContainer = document.getElementById('url-batches');
    const generateButton = document.getElementById('generate-urls');

    generateButton.addEventListener('click', () => {
        const baseUrl = document.getElementById('base-url').value;
        const rangeSize = parseInt(document.getElementById('range-size').value, 10);
        const linksPerBatch = parseInt(document.getElementById('links-per-batch').value, 10);
        urlBatchesContainer.innerHTML = ''; // Clear previous batches

        // Disable inputs after generating URLs
        document.getElementById('base-url').disabled = true;
        document.getElementById('range-size').disabled = true;
        document.getElementById('links-per-batch').disabled = true;
        generateButton.disabled = true;

        for (let i = 0; i < 10000; i += rangeSize * linksPerBatch) {
            const batchDiv = document.createElement('div');
            batchDiv.className = 'batch';

            const linksDiv = document.createElement('div');
            linksDiv.className = 'links';

            const urls = [];
            for (let j = i + 1; j <= i + rangeSize * linksPerBatch; j += rangeSize) {
                const separator = baseUrl.includes('?') ? '&' : '?';
                const url = `${baseUrl}${separator}range=${j},${j + rangeSize - 1}`;
                urls.push(url);

                const link = document.createElement('a');
                link.href = url;
                link.textContent = url;
                link.target = '_blank'; // Open link in new tab
                linksDiv.appendChild(link);
            }

            const button = document.createElement('button');
            button.textContent = `Open URLs ${i + 1} to ${i + rangeSize * linksPerBatch}`;
            button.addEventListener('click', () => openUrlsInBatch(urls, linksDiv));

            batchDiv.appendChild(linksDiv);
            batchDiv.appendChild(button);
            urlBatchesContainer.appendChild(batchDiv);
        }
    });
});

function openUrlsInBatch(urls, linksDiv) {
    urls.forEach((url, index) => {
        setTimeout(() => {
            const newTab = window.open(url, '_blank');
            if (newTab) {
                newTab.addEventListener('focus', () => {
                    console.log(`Tab for URL ${url} has loaded.`);
                    const link = linksDiv.querySelector(`a[href="${url}"]`);
                    if (link) {
                        link.classList.add('loaded');
                    }
                });
            } else {
                console.error(`Failed to open URL ${url}`);
            }
        }, index * 500); // Delay of 500ms between each URL
    });
}
