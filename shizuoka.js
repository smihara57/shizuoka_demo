const apiKey = "-KRBZGweDBnkQ0vaT5QzJQwEFpDxr8u4PQ6TMh-v358" ;
const platform = new H.service.Platform({
    apikey: apiKey,
});

const omvService = platform.getOMVService({
    path: 'v2/vectortiles/core/mc',
});
const baseUrl = 'https://js.api.here.com/v3/3.1/styles/omv/oslo/japan/';

// 日本専用の地図スタイルを導入
const style = new H.map.Style(`${baseUrl}normal.day.yaml`, baseUrl);

// 背景地図として日本の地図データでレイヤを作成
const omvProvider = new H.service.omv.Provider(omvService, style);
const omvlayer = new H.map.layer.TileLayer(omvProvider, {
    max: 22,
});

// 地図表示を実装
const map = new H.Map(document.getElementById('map'), omvlayer, {
    zoom: 15,
    center: { lat: 34.98244110885471, lng: 138.39069445763212,},
});
   //ポリゴン
	
	var rect = new H.map.Rect(new H.geo.Rect(34.97494135812615,138.38445874558198,34.97296093474247,138.38747319195508));
	var rect1 = new H.map.Rect(new H.geo.Rect(34.97287369719619,138.39070403488952,34.97085363670127,138.39374073582624));
	var rect2 = new H.map.Rect(new H.geo.Rect(34.98106425333275,138.39077463849736,34.979263851773666,138.39365202327423));
	var rect3 = new H.map.Rect(new H.geo.Rect(34.98538113790535,138.3907271615484,34.983468177276926,138.39374175171773));
	var rect4 = new H.map.Rect(new H.geo.Rect(34.98515007778879,138.38449783935408,34.98335001891877,138.38758086521216));
	var rect5 = new H.map.Rect(new H.geo.Rect(34.987293891491944,138.38757551186845,34.98538119872192,138.3907956190936));
	var rect6 = new H.map.Rect(new H.geo.Rect(34.9893755865282,138.38442346799087,34.98751925444427,138.3875752046554));
	var rect7 = new H.map.Rect(new H.geo.Rect(34.991460210557555,138.38765055408493,34.98960355205701,138.39052845390893));
	var rect8 = new H.map.Rect(new H.geo.Rect(34.98947319463782,138.39071944365048,34.98749269268568,138.39378904581068));

	
	map.addObject(rect);
	map.addObject(rect1);
	map.addObject(rect2);
	map.addObject(rect3);
	map.addObject(rect4);
	map.addObject(rect5);
	map.addObject(rect6);
	map.addObject(rect7);
	map.addObject(rect8);

// 地図のズームイン・ズームアウトを実装
const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// リアルタイム交通状況を表示
const defaultLayers = platform.createDefaultLayers();
map.addLayer(defaultLayers.vector.traffic.map);

// エラーが発生した場合の処理
function onError(error) {
    alert("Can't reach the remote server");
}
// APIの結果が返される際の関数
function addLocationsToMap(result) {
    const locations = result.items;

    // 地図から既存のマーカーを削除する
    if (map.getObjects().length > 0) {
        map.getObjects().forEach((i) => {
            if (i.getRemoteId().includes('discover')) {
                map.removeObject(i);
            }
        });
    }

    // APIの結果にマーカーを追加する
    for (let i = 0; i < locations.length; i += 1) {
        let location = locations[i];
        marker = new H.map.Marker(location.position);
        marker.setRemoteId('discover' + i.toString());
        map.addObject(marker);
    }
}

     
    
function getRouting() {
    let origin;
    let destination;
    const onError = (error) => {
        console.log(error.message);
	
    };

    // 経路検索APIを呼び出し
    const router = platform.getRoutingService(null, 8);

    // APIのリスポンスを処理するためのコールバック関数
    const onResult = function (result) {
        // 経路が検索されていることを確保
        if (result.routes.length) {
            // 既存の経路を削除する
            

            result.routes[0].sections.forEach((section) => {
                // 経路をLinestring方式に変換する
                const linestring = H.geo.LineString.fromFlexiblePolyline(
                    section.polyline
                );

                // 経路をPolyline形式に変換
                const routeLine = new H.map.Polyline(linestring, {
                    style: {
                        strokeColor: 'blue',
                        lineWidth: 3,
                    },
                });

                // 出発地のマーカー
                const startMarker = new H.map.Marker(
                    section.departure.place.location
                );

                // 目的地のマーカー
                const endMarker = new H.map.Marker(
                    section.arrival.place.location
                );

                routeLine.setRemoteId('route');
                startMarker.setRemoteId('start');
                endMarker.setRemoteId('dest');

                // マーカーとPolylineを地図上に追加する
                map.addObjects([routeLine, startMarker, endMarker]);
            });
        }
    };

    const routingParameters = {
        transportMode: 'pedestrian',
	
        // 経路がリスポンスから返されるようにする
        return: 'polyline',
    };
    // 経路を計算するコールバック関数
    const calculateRoute = () => {
        // 出発地と到着地点の両方が入力されていることを確保
      
 //if (!origin || !destination) return;

        // 出発地と目的地を検索パラメーターに追加

	let routingParameters1 ={
	'routingMode': 'fast',
	'transportMode': 'pedestrian',
	'origin' : '34.98853447754704,138.38846690729417',
	'destination': '34.979224087406116,138.38327440606042',
	   'avoid[areas]':['polygon:34.97494135812615,138.38445874558198;34.97494135812615,138.38747319195508;34.97296093474247,138.38747319195508;34.97296093474247,138.38445874558198',
			'polygon:34.97287369719619,138.39070403488952;34.97287369719619,138.39374073582624;34.97085363670127,138.39374073582624;34.97085363670127,138.39070403488952',
			'polygon:34.98106425333275,138.39077463849736;34.98106425333275,138.39365202327423;34.979263851773666,138.39365202327423;34.979263851773666,138.39077463849736',
			'polygon:34.98538113790535,138.3907271615484;34.98538113790535,138.39374175171773;34.983468177276926,138.39374175171773;34.983468177276926,138.3907271615484',
			'polygon:34.98515007778879,138.38449783935408;34.98515007778879,138.38758086521216;34.98335001891877,138.38758086521216;34.98335001891877,138.38449783935408',
			'polygon:34.987293891491944,138.38757551186845;34.987293891491944,138.3907956190936;34.98538119872192,138.3907956190936;34.98538119872192,138.38757551186845',
			'polygon:34.9893755865282,138.38442346799087;34.9893755865282,138.3875752046554;34.98751925444427,138.3875752046554;34.98751925444427,138.38442346799087',
			'polygon:34.991460210557555,138.38765055408493;34.991460210557555,138.39052845390893;34.98960355205701,138.39052845390893;34.98960355205701,138.38765055408493',
			'polygon:34.98947319463782,138.39071944365048;34.98947319463782,138.39378904581068;34.98749269268568,138.39378904581068;34.98749269268568,138.39071944365048'
].join('|'),

     
        'return': 'polyline,turnByTurnActions,actions,instructions,travelSummary'

	};
router.calculateRoute(routingParameters1, onResult, onError);


 };
calculateRoute();




}
//ここから二箇所目の避難場所
function getRouting1() {
  let origin;
  let destination;
    const onError = (error) => {
        console.log(error.message);
	
    };

    // 経路検索APIを呼び出し
    const router = platform.getRoutingService(null, 8);

    // APIのリスポンスを処理するためのコールバック関数
    const onResult = function (result) {
        // 経路が検索されていることを確保
        if (result.routes.length) {
            // 既存の経路を削除する
            

            result.routes[0].sections.forEach((section) => {
                // 経路をLinestring方式に変換する
                const linestring = H.geo.LineString.fromFlexiblePolyline(
                    section.polyline
                );

                // 経路をPolyline形式に変換
                const routeLine = new H.map.Polyline(linestring, {
                    style: {
                        strokeColor: 'blue',
                        lineWidth: 3,
                    },
                });

                // 出発地のマーカー
                const startMarker = new H.map.Marker(
                    section.departure.place.location
                );

                // 目的地のマーカー
                const endMarker = new H.map.Marker(
                    section.arrival.place.location
                );

                routeLine.setRemoteId('route');
                startMarker.setRemoteId('start');
                endMarker.setRemoteId('dest');

                // マーカーとPolylineを地図上に追加する
                map.addObjects([routeLine, startMarker, endMarker]);
            });
        }
    };

    const routingParameters = {
        transportMode: 'pedestrian',
	
        // 経路がリスポンスから返されるようにする
        return: 'polyline',
    };
    // 経路を計算するコールバック関数
    const calculateRoute = () => {
        // 出発地と到着地点の両方が入力されていることを確保
      
 //if (!origin || !destination) return;

        // 出発地と目的地を検索パラメーターに追加

	let routingParameters1 ={
	'routingMode': 'fast',
	'transportMode': 'pedestrian',
	'origin' : '34.98853447754704,138.38846690729417',
	'destination': '34.98915049475977,138.37813630452828',
        'avoid[areas]':['polygon:34.97494135812615,138.38445874558198;34.97494135812615,138.38747319195508;34.97296093474247,138.38747319195508;34.97296093474247,138.38445874558198',
			'polygon:34.97287369719619,138.39070403488952;34.97287369719619,138.39374073582624;34.97085363670127,138.39374073582624;34.97085363670127,138.39070403488952',
			'polygon:34.98106425333275,138.39077463849736;34.98106425333275,138.39365202327423;34.979263851773666,138.39365202327423;34.979263851773666,138.39077463849736',
			'polygon:34.98538113790535,138.3907271615484;34.98538113790535,138.39374175171773;34.983468177276926,138.39374175171773;34.983468177276926,138.3907271615484',
			'polygon:34.98515007778879,138.38449783935408;34.98515007778879,138.38758086521216;34.98335001891877,138.38758086521216;34.98335001891877,138.38449783935408',
			'polygon:34.987293891491944,138.38757551186845;34.987293891491944,138.3907956190936;34.98538119872192,138.3907956190936;34.98538119872192,138.38757551186845',
			'polygon:34.9893755865282,138.38442346799087;34.9893755865282,138.3875752046554;34.98751925444427,138.3875752046554;34.98751925444427,138.38442346799087',
			'polygon:34.991460210557555,138.38765055408493;34.991460210557555,138.39052845390893;34.98960355205701,138.39052845390893;34.98960355205701,138.38765055408493',
			'polygon:34.98947319463782,138.39071944365048;34.98947319463782,138.39378904581068;34.98749269268568,138.39378904581068;34.98749269268568,138.39071944365048'
].join('|'),
        'return': 'polyline,turnByTurnActions,actions,instructions,travelSummary'

	};
router.calculateRoute(routingParameters1, onResult, onError);

 };  
calculateRoute();


}
