/* @content:图层脚本
 * @date:2014/9/16
 * @nameSpace:layout
 */
var layout = {};
//命名空间公共变量
layout.params = {};
layout.init = function(){
	require([
	/*搜索部分*/
	"esri/dijit/Geocoder",
	"esri/map",
	"esri/graphic",
	"esri/symbols/SimpleMarkerSymbol",
	"esri/geometry/screenUtils",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/query",
	"dojo/_base/Color",
	/*编辑部分*/
	 "esri/toolbars/draw",
	 "esri/symbols/SimpleLineSymbol",
	 "esri/symbols/SimpleFillSymbol",
	 "dojo/parser", 
	 "dijit/registry",
	 "dijit/layout/BorderContainer", 
	 "dijit/layout/ContentPane", 
	 "dijit/form/Button", 
	 "dijit/WidgetSet",
	 "dojo/domReady!"
	], function(
	    Geocoder,Map, 
	    Graphic, SimpleMarkerSymbol, screenUtils,
	    dom, domConstruct, query, Color, /*draw*/Draw, SimpleLineSymbol, SimpleFillSymbol,
	    parser, registry
		) { 
		  
		 
		global_map = new Map("map", {
			basemap: "streets", 
	        center: [-122.4, 37.785],
	        zoom: 14, 
	        showInfoWindowOnClick: false 
		});
	 
		
 	});
}


