selectedImages = [];
selectedImagesText = $("#selected-images");
selectedImagesInputs = $("#selected-inputs");
formGDLContainer = $("#form-gdl-container");
formGDL = $("#form-gdl");

let replaceInputs = () => {
    selectedImagesInputs.html("");
    selectedImages.forEach(el => {
        selectedImagesInputs.append('<input type="hidden" name="images[]" value="' + el + '"/>');
    });
}

$('[data-cardselectbutton]').click(function(e){
    e.preventDefault();
    let selectedCard = $(this).closest('[data-cardselect]');
    let hash = selectedCard.attr('hash');

    if(selectedCard.hasClass("is-selected")) {
        selectedCard.removeClass("is-selected");
        selectedImages = selectedImages.filter(el => el != hash);
        if(selectedImages.length == 0) {
            formGDLContainer.addClass("hidden")
        }
    } else {
        selectedCard.addClass("is-selected");
        selectedImages.push(hash);
        if(selectedImages.length > 0) {
            formGDLContainer.removeClass("hidden")
        }
    }
    
    replaceInputs();
    selectedImagesText.text(selectedImages.join(", "));
    $("body").css("padding-bottom", (formGDLContainer.height() + 30) + "px")
});
