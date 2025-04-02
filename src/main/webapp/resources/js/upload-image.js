function uploadImage(file, temporary, onSuccess, onError) {
    if (file) {
        createRequestBody(file, function(requestBody) {
            requestBody.temporary = temporary;
            $.ajax({
                url : "image",
                type : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : JSON.stringify(requestBody),
                processData : false,
                contentType : false,
                success : function(hash) {
                    onSuccess("image/" + hash, hash);
                },
                error : function(request) {
                    onError(request.responseText);
                }
            });
        });
    }
}

function createRequestBody(file, onSuccess, onError) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function() {
        var arrayBuffer = reader.result
        var bytes = new Uint8Array(arrayBuffer);
        var requestBody = {
            fileName : file.name,
            size : file.size,
            contents : Array.from(bytes),
            contentType : file.type
        };
        onSuccess(requestBody);
    }
    reader.onerror = function() {
        onError("Can not read file " + file.name)
    }
}