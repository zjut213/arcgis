/*
 * @content:地图初始化总脚本
 * @date:2014/9/16
 * @nameSpace:map
 */

/*
 * @content:全局变量定义
 */
var global_map;

/*
 * @content:地图初始化
 * @spaceName:map
 */
var map ={};
map.init = function(){
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
 		  
 		parser.parse().then(function(){
 			layout.init();//初始化图层
 			edit.init();
 			attachment.init();
 			search.init();
 		});	
 		
  	});
	
}


