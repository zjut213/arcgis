/* @content:测量脚本
 * @date:2014/9/19
 * @nameSpace:measure
 */
var measure = {};
//命名空间公共变量
measure.params = {};
measure.init = function(){
	require([
	    "dojo/dom",
        "esri/Color",
        "dojo/keys",
        "dojo/parser",

        "esri/config",
        "esri/sniff",
        "esri/map",
        "esri/SnappingManager",
        "esri/dijit/Measurement",
        "esri/layers/FeatureLayer",
        "esri/renderers/SimpleRenderer",
        "esri/tasks/GeometryService",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",

        "esri/dijit/Scalebar",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",
        "dijit/TitlePane",
        "dijit/form/CheckBox", 
        "dojo/domReady!"
      ], function(
        dom, Color, keys, parser, 
        esriConfig, has, Map, SnappingManager, Measurement, FeatureLayer, SimpleRenderer, GeometryService, SimpleLineSymbol, SimpleFillSymbol
      ) {
        parser.parse();
        //This sample may require a proxy page to handle communications with the ArcGIS Server services. You will need to  
        //replace the url below with the location of a proxy on your machine. See the 'Using the proxy page' help topic 
        //for details on setting up a proxy page.
        esriConfig.defaults.io.proxyUrl = "/proxy";
        esriConfig.defaults.io.alwaysUseProxy = false;

        //This service is for development and testing purposes only. We recommend that you create your own geometry service for use within your applications
        esriConfig.defaults.geometryService = new GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

        var sfs = new SimpleFillSymbol(
            "solid",
            new SimpleLineSymbol("solid", new Color([195, 176, 23]), 2), 
            null
          );

          var parcelsLayer = new FeatureLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Louisville/LOJIC_LandRecords_Louisville/MapServer/0", {
            mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ["*"]
          });
          parcelsLayer.setRenderer(new SimpleRenderer(sfs));
          //global_map.addLayers([parcelsLayer]);

          //dojo.keys.copyKey maps to CTRL on windows and Cmd on Mac., but has wrong code for Chrome on Mac
          var snapManager = global_map.enableSnapping({
            snapKey: has("mac") ? keys.META : keys.CTRL
          });
          var layerInfos = [{
            layer: parcelsLayer
          }];
          
          //snapManager.setLayerInfos(layerInfos);

          var measurement = new Measurement({
            map: global_map
          }, dom.byId("measurementDiv"));
          measurement.startup();
      });
}