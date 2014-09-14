//全局变量
var map, toolbar, symbol, geomTask;
require([
    /*搜索部分*/
<<<<<<< HEAD
    "esri/map", 
=======
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
>>>>>>> origin/master
    "esri/toolbars/draw",
    "esri/graphic",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "dojo/parser", 
    "dijit/registry",
    
    
    "dijit/layout/BorderContainer", 
    "dijit/layout/ContentPane", 
    "dijit/form/Button", 
<<<<<<< HEAD
    "dijit/WidgetSet", 
    "dojo/domReady!",
    
	
	"esri/dijit/Geocoder",
	"esri/geometry/screenUtils",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/query",
	"dojo/_base/Color"
    
    ], function(
		Map, Draw, Graphic,
        SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
        parser, registry, BorderContainer, ContentPane, Button, WidgetSet, domReady, 
        
	    Geocoder,
	    screenUtils,
	    dom, domConstruct, query, Color
        
         
=======
    "dijit/WidgetSet",
    "dojo/domReady!"
	], function(
	    Geocoder,Map, 
	    Graphic, SimpleMarkerSymbol, screenUtils,
	    dom, domConstruct, query, Color, /*draw*/Draw, SimpleLineSymbol, SimpleFillSymbol,
        parser, registry
>>>>>>> origin/master
	) { 
    // create a map and instance of the geocoder widget here
	parser.parse();
	map = new Map("map", {
    	basemap: "streets", 
    	center: [ -100, 40 ], 
    	zoom: 10
    });
	
	edit.init(Map, Draw, Graphic,
	        SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
	        parser, registry);
	
    search.init(Map, Geocoder,
    	    Graphic, SimpleMarkerSymbol, screenUtils,
    	    dom, domConstruct, query, Color
    ); 
    
});
