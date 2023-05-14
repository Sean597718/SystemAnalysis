const initLatLng = { lat: 25.0475613, lng: 121.5173399 };

const mapOptions = {
    zoom: 15, //放大的倍率
    // center: initLatLng, //初始化的地圖中心位置
    // mapTypeControl: false,//地圖樣式控制項
    // fullscreenControl: false,//全螢幕控制項
    // rotateControl: false,//旋轉控制項
    // scaleControl: true,//比例尺控制項
    // streetViewControl: false,//街景控制項
    // zoomControl: true,//縮放控制項
    // tilt: 0,//地圖傾斜角度
    disableDefaultUI: true,
    mapId: '930dcea21763fbb0', //地圖樣式
    gestureHandling: "none", //禁止手勢操作
    //mapTypeId:'hybrid'
};

//初始化direction API
const directionsService = new google.maps.DirectionsService();

//初始化地圖
const map = new google.maps.Map(document.getElementById('map'), mapOptions);

//路徑顯示設定
const directionsDisplay = new google.maps.DirectionsRenderer({
    preserveViewport: false,
    draggable: false,
    suppressMarkers: true,
    polylineOptions: {
        strokeColor: "#004B97", // set the color of the route
        strokeWeight: 6, // set the width of the line of the route
    },
});

//載入網頁時執行
// window.onload = function() {
    //create request
    const request = {
        origin: document.getElementById("pick-up").value,
        destination: document.getElementById("drop-off").value,
        travelMode: google.maps.TravelMode.DRIVING, //路徑類型
        unitSystem: google.maps.UnitSystem.MERTRIC //距離單位
    }
    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            console.log("計算完成");
            console.dir(result);
            //讀取路徑資訊並顯示
            // 繪製路線
            // directionsDisplay.setDirections(result);
            // directionsDisplay.setMap(map);
            map.setZoom(15);
            let estimatedDistance = document.getElementById("estimated-distance");
            // 路線結果距離單位預設為公尺，轉換為公里
            let distanceValue = (result.routes[0].legs[0].distance.value/1000).toFixed(1);
            // 路線結果時間單位預設為秒，轉換為分鐘
            let durationValue = Math.ceil(result.routes[0].legs[0].duration.value/60);
            //顯示預估距離
            estimatedDistance.value = distanceValue+" 公里";
            let estimatedFare = document.getElementById("estimated-fare");
            // 50元起跳，假設每10分鐘停等1分鐘，停等每分鐘2元，每公里20元
            estimatedFare.value = 50 + Math.ceil(durationValue/10)*2 +Math.ceil(distanceValue)*20;
        } else {
            //清空路徑
            directionsDisplay.setDirections({ routes: [] });
            //預設地圖中心位置為台北車站
            map.setTilt(10);
            map.setCenter(initLatLng);

            //show error message
            alert("錯誤資訊：" + status);
        }
    });
// }

