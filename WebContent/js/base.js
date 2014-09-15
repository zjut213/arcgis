//全局变量
var map, toolbar, symbol, geomTask;
require([
    /*搜索部分*/
	"esri/map",
	"esri/dijit/Geocoder",
	"esri/graphic",
	"esri/symbols/SimpleMarkerSymbol",
	"esri/geometry/screenUtils",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/query",
	"dojo/_base/Color",
	"dojo/domReady!",
	/*编辑部分*/
    "esri/toolbars/draw",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "dojo/parser", 
    "dijit/registry",
    "dijit/layout/BorderContainer", 
    "dijit/layout/ContentPane", 
    "dijit/form/Button", 
    "dijit/WidgetSet"
	], function(
	    Map, Geocoder,
	    Graphic, SimpleMarkerSymbol, screenUtils,
	    dom, domConstruct, query, Color, /*draw*/Draw, Graphic,
        SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
        parser, registry
	) { 
    // create a map and instance of the geocoder widget here
	parser.parse();
	map = new Map("map", {
    	basemap: "streets", 
    	center: [ -100, 40 ], 
    	zoom: 10
    });
    search.init(Map, Geocoder,
	    Graphic, SimpleMarkerSymbol, screenUtils,
	    dom, domConstruct, query, Color
    ); 
    edit.init(Map, Draw, Graphic,
            SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
            parser, registry);
});
