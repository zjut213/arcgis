/**
 * @content track 分析
 * @authors leedow (644743991@qq.com)
 * @website http://www.leedow.com
 * @date    2014-09-18 12:41:26
 * @version $Id$
 * @spaceName track
 */
var curTime = new Date();
var curTimeStamp = Date.parse(curTime.toUTCString());
var layerDefinition = {
	"geometryType": "esriGeometryPoint",
	"timeInfo": {
	"startTimeField": "DateTimeStamp",
	"endTimeField": null,
	"trackIdField": "RouteID",
	"timeReference": null,
	"timeInterval": 1,
	"timeIntervalUnits": "esriTimeUnitsMinutes",
	"exportOptions": {
	"useTime": true,
	"timeDataCumulative": false,
	"timeOffset": null,
	"timeOffsetUnits": null
	},
	"hasLiveData": true
	},
	"fields": [
	{
	name: "ObjectId",
	type: "esriFieldTypeOID",
	alias: "ObjectId"
	},
	{
	name: "BusNo",
	type: "esriFieldTypeInteger",
	alias: "Bus Number"
	},
	{
	name: "Longitude",
	type: "esriFieldTypeDouble",
	alias: "Longitude"
	},
	{
	name: "Latitude",
	type: "esriFieldTypeDouble",
	alias: "Latitude"
	},
	{
	name: "Altitude",
	type: "esriFieldTypeDouble",
	alias: "Altitude"
	},
	{
	name: "DateTimeStamp",
	type: "esriFieldTypeDate",
	alias: "DateTimeStamp"
	},
	{
	name: "Heading",
	type: "esriFieldTypeInteger",
	alias: "Heading"
	},
	{
	name: "RouteID",
	type: "esriFieldTypeInteger",
	alias: "RouteID"
	}
]
};

var featureCollection, streamLayer;
var track = {}
track.init = function(){
require(["esri/map",
	"esri/TimeExtent",
	"esri/layers/StreamLayer",
	"esri/InfoTemplate",
	"esri/symbols/SimpleMarkerSymbol",
	"esri/symbols/SimpleLineSymbol",
	"esri/renderers/SimpleRenderer",
	"esri/renderers/TimeClassBreaksAger",
	"esri/renderers/TemporalRenderer",
	"esri/Color",
	"dojo/dom",
	"dojo/on",
	"dojo/domReady!"
	], function(Map, TimeExtent, StreamLayer, InfoTemplate, SimpleMarkerSymbol, SimpleLineSymbol, SimpleRenderer, TimeClassBreaksAger, TemporalRenderer, Color, dom, on){
	var trackedBusses = {}, cnt = 0;


	// event listeners for button clicks
	on(dom.byId("cmdNewStream"), "click", makeNewStreamLayer);
	on(dom.byId("cmdDisconnect"), "click", disconnectStreamLayer);

	function makeStreamLayer(){
	//Make FeatureCollection to define layer without using url
		featureCollection = {
			"layerDefinition": null,
			"featureSet": {
			"features": [],
			"geometryType": "esriGeometryPoint"}
		};
		featureCollection.layerDefinition = layerDefinition;

		// Instantiate StreamLayer
		// 1. socketUrl is the url to the GeoEvent Processor web socket.
		// 2. purgeOptions.displayCount is the maximum number of features the
		//    layer will display at one time
		// 3. trackIdField is the name of the field that groups features
		var layer = new StreamLayer(featureCollection, {
			socketUrl: "ws://geoeventsample3.esri.com:8080/seattlebusservice",
			purgeOptions: { displayCount: 500 },
			trackIdField: featureCollection.layerDefinition.timeInfo.trackIdField,
			infoTemplate: new InfoTemplate("Route Id: ${RouteID}", "Timestamp: ${DateTimeStamp}" )
		});
		console.log("TrackID: ", featureCollection.layerDefinition.timeInfo.trackIdField);
		console.log("TrackID: ", layer.timeInfo.trackIdField);

		//Make renderer and apply it to StreamLayer
		var renderer = makeRenderer();
		layer.setRenderer( renderer );

		//Subscribe to onMessage event of StreamLayer so can adjust map time
		//layer.on("message", processMessage);
		return layer;
	}

	// Process message that StreamLayer received.
	function processMessage(message){
		if (featureCollection.layerDefinition.timeInfo && 
		featureCollection.layerDefinition.timeInfo.startTimeField) {
			var timestamp = message[0].attributes[featureCollection.layerDefinition.timeInfo.startTimeField];
			if (! global_map.timeExtent){
				global_map.setTimeExtent(new esri.TimeExtent(new Date(timestamp), new Date(timestamp)));
				console.log("TIME EXTENT: ", global_map.timeExtent);
			} else {
				var tsEnd = Date.parse(global_map.timeExtent.endTime.toString());
				if (timestamp > tsEnd){
					global_map.setTimeExtent(new esri.TimeExtent(global_map.timeExtent.startTime, new Date(timestamp)));
					console.log("TIME EXTENT: ", global_map.timeExtent);
				}
			}
		}
	}

	// Make new StreamLayer and add it to map.
	function makeNewStreamLayer(){
		disconnectStreamLayer();
		streamLayer = makeStreamLayer();
		global_map.addLayer( streamLayer );
	}

	// Disconnect StreamLayer from websocket and remove it from the map
	function disconnectStreamLayer(){
		if (streamLayer){
			streamLayer.suspend();
			streamLayer.disconnect();
			streamLayer.clear();
			global_map.removeLayer(streamLayer);
			streamLayer = null;
			//map.timeExtent = null;
		}
	}

	// Make temporal renderer with latest observation renderer
	function makeRenderer(){
		var obsRenderer = new SimpleRenderer(
		new SimpleMarkerSymbol("circle", 8,
		new SimpleLineSymbol("solid",
		new Color( [5, 112, 176, 0] ), 1),
		new Color( [5, 112, 176, 0.4] )
		));

		var latestObsRenderer = new SimpleRenderer(
		new SimpleMarkerSymbol("circle", 12,
		new SimpleLineSymbol("solid",
		new Color( [5, 112, 176, 0] ), 1),
		new Color( [5, 112, 176] )
		));

		var temporalRenderer = new TemporalRenderer(obsRenderer, latestObsRenderer, null, null);
		return temporalRenderer;
	}
	});
}

