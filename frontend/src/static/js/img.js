/* let base64String = "";

function imageUploaded() {
    var file = document.querySelector('input[type=file]')['files'][0];
    var reader = new FileReader();
    reader.onload = function () {
        base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        imageBase64Stringsep = base64String;
        previewImage(base64String);
    }
    reader.readAsDataURL(file);
}

function previewImage(string) {
    try {
        document.getElementById('newImage').remove();
    } catch {
        //pass
    }

    let image = new Image();
        image.src = "data:image/jpg;base64," + string;
        image.className = "img-fluid img-thumbnail";
        image.width = "460";
        image.height = "345";
        image.id = "newImage";
        document.getElementById('previewImage').append(image);
} */

window.addEventListener('load', function () {
    document.querySelector('input[type="file"]').addEventListener('change', function () {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }

            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            if (img.hidden) {
                img.hidden = !img.hidden;
            }
        }
    });
});