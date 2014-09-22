/* @content:服务区查询脚本
 * @date:2014/9/21
 * @nameSpace:service
 */
var service = {};

var serviceAreaTask, params, clickpoint;
//命名空间公共变量
service.params = {};
service.init = function(){
	 require([
      "esri/map", "esri/config", 
      "esri/tasks/ServiceAreaTask", "esri/tasks/ServiceAreaParameters", "esri/tasks/FeatureSet",
      "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
      "esri/geometry/Point", "esri/graphic",
      "dojo/parser", "dojo/dom", "dijit/registry", 
      "esri/Color", "dojo/_base/array",
      "dijit/layout/BorderContainer", "dijit/layout/ContentPane", 
      "dijit/form/HorizontalRule", "dijit/form/HorizontalRuleLabels", "dijit/form/HorizontalSlider",
      "dojo/domReady!"
    ], function(
      Map, esriConfig, 
      ServiceAreaTask, ServiceAreaParameters, FeatureSet, 
      SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
      Point, Graphic,
      parser, dom, registry,
      Color, arrayUtils
    ) {
     

      global_map.on("click", mapClickHandler);

      params = new ServiceAreaParameters();
      params.defaultBreaks= [1];
      params.outSpatialReference = global_map.spatialReference;
      params.returnFacilities = false;
      
      serviceAreaTask = new ServiceAreaTask("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Network/USA/NAServer/Service Area");
            
      registry.byId("hslider").on("change", updateHorizontalLabel);
      updateHorizontalLabel();

      // Create function that updates label when changed
      function updateHorizontalLabel() {
        // Get access to nodes/widgets we need to get/set values
        var hSlider = registry.byId("hslider");
        var label = dom.byId("decValue");
        // Update label
        label.innerHTML = hSlider.get("value");
        params.defaultBreaks = [ hSlider.value / 60 ];
        if ( typeof clickpoint !== undefined ) {
          mapClickHandler(clickpoint);
        };
      }
      
      function mapClickHandler(evt) {
        clickpoint = evt;
        global_map.graphics.clear(); //clear existing graphics    
        //define the symbology used to display the results and input point
        var pointSymbol = new SimpleMarkerSymbol(
          "diamond",
          20,
          new SimpleLineSymbol(
            "solid",
            new Color([88,116,152]), 2
          ),
          new Color([88,116,152,0.45])
        );
        var inPoint = new Point(evt.mapPoint.x, evt.mapPoint.y, global_map.spatialReference);
        var location = new Graphic(inPoint, pointSymbol);

        global_map.graphics.add(location);
        var features = [];
        features.push(location);
        var facilities = new FeatureSet();
        facilities.features = features;
        params.facilities = facilities;

        //solve 
        serviceAreaTask.solve(params,function(solveResult){
          var result = solveResult;
          var serviceAreaSymbol = new SimpleFillSymbol(
            "solid",
            new SimpleLineSymbol(
              "solid",
              new dojo.Color([232,104,80]), 2
            ),
            new dojo.Color([232,104,80,0.25])
          );
          var polygonSymbol = new SimpleFillSymbol(
            "solid",  
            new SimpleLineSymbol("solid", new Color([232,104,80]), 2),
            new Color([232,104,80,0.25])
          );
          arrayUtils.forEach(solveResult.serviceAreaPolygons, function(serviceArea){
            serviceArea.setSymbol(polygonSymbol);
            global_map.graphics.add(serviceArea);
          });
          
        }, function(err){
          console.log(err.message);
        });
      }
    });
}


