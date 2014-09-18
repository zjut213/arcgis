/* @content:图层脚本
 * @date:2014/9/16
 * @nameSpace:attachment
 */
var attachment = {};
//命名空间公共变量
attachment.params = {};
attachment.init = function(){
	require([
		"esri/map",
		"esri/layers/FeatureLayer",
		"esri/dijit/editing/AttachmentEditor",
		"esri/config",		
		"dojo/parser", "dojo/dom",		
		"dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"
	], function(
		Map, FeatureLayer, AttachmentEditor, esriConfig,
        parser, dom
		) { 
		esriConfig.defaults.io.proxyUrl = "/proxy";
		global_map.on("load", mapLoaded);
		function mapLoaded() {
	          var featureLayer = new FeatureLayer("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/SanFrancisco/311Incidents/FeatureServer/0",{
	            mode: FeatureLayer.MODE_ONDEMAND
	          });	
	          global_map.infoWindow.setContent("<div id='content' style='width:100%'></div>");
	          global_map.infoWindow.resize(350,200);
	          var attachmentEditor = new AttachmentEditor({}, dom.byId("content"));
	          attachmentEditor.startup();
	
	          featureLayer.on("click", function(evt) {
		            var objectId = evt.graphic.attributes[featureLayer.objectIdField];
		            global_map.infoWindow.setTitle(objectId);
		            attachmentEditor.showAttachments(evt.graphic,featureLayer);
		            global_map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
	          });
	          global_map.addLayer(featureLayer);
        }
		
 	});
}


