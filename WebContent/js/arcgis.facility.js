/* @content:最近设施点查询脚本
 * @date:2014/9/21
 * @nameSpace:service
 */
var facility = {};

var params;
//命名空间公共变量
facility.params = {};
facility.init = function(){
	require([
     "dojo/dom",
     "dojo/_base/array",
     "esri/Color",
     "dojo/parser",
     "dijit/registry",
     
     "esri/urlUtils",
     "esri/map",
     "esri/lang",
     "esri/graphic",
     "esri/InfoTemplate",
     "esri/layers/GraphicsLayer",
     "esri/renderers/SimpleRenderer",

     "esri/geometry/Point",
     "esri/tasks/FeatureSet",

     "esri/tasks/ClosestFacilityTask",
     "esri/tasks/ClosestFacilityParameters",

     "esri/symbols/SimpleMarkerSymbol",
     "esri/symbols/SimpleLineSymbol",
     
     "dijit/form/ComboBox",
     "dijit/layout/BorderContainer",
     "dijit/layout/ContentPane"
   ], function(
     dom, array, Color, parser, registry,
     urlUtils, Map, esriLang, Graphic, InfoTemplate, GraphicsLayer, SimpleRenderer, 
     Point, FeatureSet, 
     ClosestFacilityTask, ClosestFacilityParameters, 
     SimpleMarkerSymbol, SimpleLineSymbol
   ) {
     var incidentsGraphicsLayer, routeGraphicLayer, closestFacilityTask;

     global_map.on("click", mapClickHandler);
     
     params = new ClosestFacilityParameters();
     params.impedenceAttribute= "Miles";      
     params.defaultCutoff= 7.0;      
     params.returnIncidents=false;
     params.returnRoutes=true;
     params.returnDirections=true;
     
     global_map.on("load", function(evtObj) {
       var map = evtObj.target;
       var facilityPointSymbol = new SimpleMarkerSymbol(
         SimpleMarkerSymbol.STYLE_SQUARE, 
         20,
         new SimpleLineSymbol(
           SimpleLineSymbol.STYLE_SOLID,
           new Color([89,95,35]), 2
         ),
         new Color([130,159,83,0.40])
       ); 

       var incidentPointSymbol = new SimpleMarkerSymbol(
         SimpleMarkerSymbol.STYLE_CIRCLE, 
         16,
         new SimpleLineSymbol(
           SimpleLineSymbol.STYLE_SOLID,
           new Color([89,95,35]), 2
         ),
         new Color([130,159,83,0.40])
       );  

       incidentsGraphicsLayer = new GraphicsLayer();
       
       var incidentsRenderer = new SimpleRenderer(incidentPointSymbol);
       incidentsGraphicsLayer.setRenderer(incidentsRenderer);
       map.addLayer(incidentsGraphicsLayer);

       routeGraphicLayer = new GraphicsLayer();
       
       var routePolylineSymbol = new SimpleLineSymbol(
         SimpleLineSymbol.STYLE_SOLID, 
         new Color([89,95,35]), 
         4.0
       );
       var routeRenderer = new SimpleRenderer(routePolylineSymbol);
       routeGraphicLayer.setRenderer(routeRenderer);

       map.addLayer(routeGraphicLayer);

       var facilitiesGraphicsLayer = new GraphicsLayer();
       var facilityRenderer = new SimpleRenderer(facilityPointSymbol);
       facilitiesGraphicsLayer.setRenderer(facilityRenderer);
      
       map.addLayer(facilitiesGraphicsLayer);
       
       facilitiesGraphicsLayer.add(new Graphic(new Point(-13625960,4549921,map.spatialReference)));
       facilitiesGraphicsLayer.add(new Graphic(new Point(-13626184,4549247,map.spatialReference)));
       facilitiesGraphicsLayer.add(new Graphic(new Point(-13626477,4549415,map.spatialReference)));
       facilitiesGraphicsLayer.add(new Graphic(new Point(-13625385,4549659,map.spatialReference))); 
       facilitiesGraphicsLayer.add(new Graphic(new Point(-13624374,4548254,map.spatialReference))); 
       facilitiesGraphicsLayer.add(new Graphic(new Point(-13624891,4548565,map.spatialReference))); 
  
       var facilities = new FeatureSet();
       facilities.features = facilitiesGraphicsLayer.graphics;
       
       params.facilities = facilities;
       params.outSpatialReference = map.spatialReference;
      
     });
     
     closestFacilityTask = new ClosestFacilityTask("http://route.arcgis.com/arcgis/rest/services/World/ClosestFacility/NAServer/ClosestFacility_World");

     registry.byId("numLocations").on("change", function() {
       params.defaultTargetFacilityCount = this.value;
       clearGraphics();
     });

     function clearGraphics() {
       //clear graphics
       dom.byId("directionsDiv").innerHTML= "";
       global_map.graphics.clear();
       routeGraphicLayer.clear();
       incidentsGraphicsLayer.clear();    
     } 

     function mapClickHandler(evt) {
       clearGraphics();
       dom.byId("directionsDiv").innerHTML= "";
       var inPoint = new Point(evt.mapPoint.x, evt.mapPoint.y, global_map.spatialReference);
       var location = new Graphic(inPoint);
       incidentsGraphicsLayer.add(location);
       
       var features = [];
       features.push(location);
       var incidents = new FeatureSet();
       incidents.features = features;
       params.incidents = incidents;
       
       global_map.graphics.enableMouseEvents();
      
       routeGraphicLayer.on("mouse-over", function(evt){
         //clear existing directions and highlight symbol
         global_map.graphics.clear();
         dom.byId("directionsDiv").innerHTML= "Hover over the route to view directions";
         
         var highlightSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0,255,255],0.25), 4.5);
         var highlightGraphic = new Graphic(evt.graphic.geometry,highlightSymbol);
         
         global_map.graphics.add(highlightGraphic);
         dom.byId("directionsDiv").innerHTML = esriLang.substitute(evt.graphic.attributes,"${*}");
       });

       //solve 
       closestFacilityTask.solve(params, function(solveResult){
         var directions = solveResult.directions;
         array.forEach(solveResult.routes, function(route, index){
           //build an array of route info
           var attr = array.map(solveResult.directions[index].features, function(feature){
             return feature.attributes.text;
           });
           var infoTemplate = new InfoTemplate("Attributes", "${*}");
           
           route.setInfoTemplate(infoTemplate);
           route.setAttributes(attr);
           
           routeGraphicLayer.add(route);
           dom.byId("directionsDiv").innerHTML = "Hover over the route to view directions";
         });
         
         //display any messages
         if(solveResult.messages.length > 0){
           dom.byId("directionsDiv").innerHTML = "<b>Error:</b> " + solveResult.messages[0];
         }      
       });
     }
   });
}


