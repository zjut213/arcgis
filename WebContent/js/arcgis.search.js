/* @content:搜索脚本
 * @date:2014/9/16
 * @nameSpace:search
 */
var search = {};
//命名空间公共变量
search.params = {};
search.init = function(){
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
		  
		var geocoder =  new Geocoder({
	    	arcgisGeocoder: {
	        placeholder: "Find a place"
	    }, 
	    	autoComplete: true,
	    	map: global_map
	    }, dom.byId("search"));
		
	    global_map.on("load", enableSpotlight);

	    geocoder.on("select", showLocation);
	    geocoder.on("clear", removeSpotlight);

	    function showLocation(evt) {
	    	global_map.graphics.clear();
	    	var point = evt.result.feature.geometry;
	    	var symbol = new SimpleMarkerSymbol().setStyle(
			    SimpleMarkerSymbol.STYLE_SQUARE).setColor(
			    new Color([255,0,0,0.5])
			    );
	    	var graphic = new Graphic(point, symbol);
	    	global_map.graphics.add(graphic);
		
	    	global_map.infoWindow.setTitle("Search Result");
	    	global_map.infoWindow.setContent(evt.result.name);
	    	global_map.infoWindow.show(evt.result.feature.geometry);

	    	var spotlight = global_map.on("extent-change", function(extentChange) {
	        var geom = screenUtils.toScreenGeometry(global_map.extent, global_map.width, global_map.height, extentChange.extent);
	        var width = geom.xmax - geom.xmin;
	        var height = geom.ymin - geom.ymax;

	        var max = height;
	        if ( width > height ) {
	            max = width;
	        }

	        var margin = '-' + Math.floor(max/2) + 'px 0 0 -' + Math.floor(max/2) + 'px';

	        query(".spotlight").addClass("spotlight-active").style({
	        	width: max + "px",
	        	height: max + "px",
	        	margin: margin
	        });
	        spotlight.remove();
	      });
	    }

	    function enableSpotlight() {
	    	var html = "<div id='spotlight' class='spotlight'></div>"
			domConstruct.place(html, dom.byId("global_map_container"), "first");
	    }

	    function removeSpotlight() {
	    	query(".spotlight").removeClass("spotlight-active");
	    	global_map.infoWindow.hide();
	    	//global_map.graphics.clear();
	    }
	    
		
 	});
}


