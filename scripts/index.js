$(document).ready(() => {
    let name = findGetParameter('name');
    let category = findGetParameter('category');
    
    jQuery.ajax({
        url: 'https://api.flickr.com/services/feeds/photos_public.gne?tags='
            + (category ? category : 'camping') + '&format=json',
        dataType: 'jsonp',
        jsonpCallback: 'jsonFlickrFeed',
        success: function(resultData) {
            let images = getImagesArray(resultData);
            $('#name').html("Hola" + " " + name + "!");
            createImageElements(images);

        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log("Error!");
            console.log("jqXHR: " + JSON.stringify(jqXHR));
            console.log("textStatus: " + JSON.stringify(textStatus));
            console.log("errorThrown: " + JSON.stringify(errorThrown));
        },
    })
});

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function getImagesArray(apiResult) {
    const size = 9;
    let images = [];

    for (let i = 0; i < size; ++i){
        images.push(apiResult.items[i].media.m);
    }

    return images;
}

function createImageElements(images) {
    let rowStr = '<div class="img-row">';
    let rowEnd = '</div>';
    let itemStr = '<img src="';
    let itemEnd = '" class="square">';

    let ret = "";

    for (let i = 0; i < images.length; ++i) {
        if (i == 0 || i == 3 || i == 6) {
            ret += rowStr;
        }

        ret += itemStr + images[i] + itemEnd;

        if (i == 2 || i == 5 || i == 8) {
            ret += rowEnd;
        }
    }

    $('#content').html(ret);
}