//座標記錄
var PickupGPSlatLng,
    arrivinglat,
    arrivingLng,
    departinglat,
    departingLng;
const geocoder = new google.maps.Geocoder();//初始化geocoder
const options = {
    componentRestrictions: { country: 'tw' },
    fields: ["place_id"],
};//autocomplete設定
const departureInfo = document.getElementById("pick-up");
const departureInfoAP = new google.maps.places.Autocomplete(departureInfo, options);
const arrivalInfo = document.getElementById("drop-off");
const arrivalInfoAP = new google.maps.places.Autocomplete(arrivalInfo, options);

// 取得現在位置經緯度
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        let latLng = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
        );
        // 將經緯度轉換成地址
        geocoder
            .geocode({ latLng: latLng })
            .then(({ results }) => {
                departureInfo.value = results[0].formatted_address;
                departinglat = results[0].geometry.location.lat().toString();
                departingLng = results[0].geometry.location.lng().toString();
            })
            .catch((e) => window.alert("Geocoder failed due to: " + e));
    });
}

//自動填入上車地點
departureInfoAP.addListener('place_changed', function () {
    let place_id = departureInfoAP.getPlace().place_id;
    geocoder
        .geocode({ placeId: place_id })
        .then(({ results }) => {
            departureInfo.value = results[0].formatted_address;
            departinglat = results[0].geometry.location.lat().toString();
            departingLng = results[0].geometry.location.lng().toString();
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));
});
//自動填入下車地點
arrivalInfoAP.addListener('place_changed', function () {
    let place_id = arrivalInfoAP.getPlace().place_id;
    geocoder
        .geocode({ placeId: place_id })
        .then(({ results }) => {
            arrivalInfo.value = results[0].formatted_address;
            arrivinglat = results[0].geometry.location.lat().toString();
            arrivingLng = results[0].geometry.location.lng().toString();
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));
});
//驗證電話號碼規則
const phoneNumberInput = document.getElementById("ph");
phoneNumberInput.setCustomValidity("請輸入以 09 開頭的十位數字");
phoneNumberInput.addEventListener("input", function () {
    if (phoneNumberInput.validity.patternMismatch) {
        phoneNumberInput.setCustomValidity("請輸入以 09 開頭的十位數字");
    } else {
        phoneNumberInput.setCustomValidity("");
    }
});

