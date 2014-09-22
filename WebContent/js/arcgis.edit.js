/* @content:编辑脚本
 * @date:2014/9/16
 * @nameSpace:edit
 */
var edit = {};
var toolbar, symbol, geomTask;
//命名空间公共变量
edit.params = {};
edit.init = function(){
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
		  
		global_map.on("load", createToolbar);
		
		registry.forEach(function(d) {
		
		  if ( d.declaredClass === "dijit.form.Button" ) {
		    d.on("click", activateTool);
		  }
		});
		
		function activateTool() {
			
		  var tool = this.get("id").toUpperCase().replace(/ /g, "_");
		  toolbar.activate(Draw[tool]);
		  global_map.hideZoomSlider();
		}
		
		function createToolbar(themap) {
		  toolbar = new Draw(global_map);
		  toolbar.on("draw-end", addToMap);
		}
		
		function addToMap(evt) {
		  var symbol;
		  toolbar.deactivate();
		  global_map.showZoomSlider();
		  switch (evt.geometry.type) {
		    case "point":
		    case "multipoint":
		      symbol = new SimpleMarkerSymbol();
		      break;
		    case "polyline":
		      symbol = new SimpleLineSymbol();
		      break;
		    default:
		      symbol = new SimpleFillSymbol();
		      break;
		  }
		  var graphic = new Graphic(evt.geometry, symbol);
		  global_map.graphics.add(graphic);
		}
		
 	});
}


