function setMetadata(hash) {
    let metadataObj = document.querySelector("#metadata");
    let metadataContainer = document.createElement("ul");
    metadataContainer.classList.add("list-group", "hidden", "mt-4");
    let toggleMetadataButton = document.createElement("button");
    toggleMetadataButton.classList.add("col-sm-12", "btn", "btn-primary", "btn-lg");
    toggleMetadataButton.innerHTML = "Mostra/Nascondi Metadati";

    $(this).getExifFromUrl(`https://ipfs.io/ipfs/${hash}`, function(exif) {
        if(Object.keys(exif).length !== 0) {
            for (const property in exif) {
                let exifEntry = document.createElement("li");
                exifEntry.classList.add("list-group-item", "text-break");
                exifEntry.innerHTML = `<strong>${property}</strong>: ${exif[property]}`;
                metadataContainer.appendChild(exifEntry);
            }
            metadataObj.innerHTML = '';
            metadataObj.appendChild(toggleMetadataButton);
            metadataObj.appendChild(metadataContainer);
        }
    });

    toggleMetadataButton.addEventListener("click", (e) => {
        metadataContainer.classList.toggle("hidden");
    });
}