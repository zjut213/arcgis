/**
 * @content 要素图例模板
 * @authors leedow (644743991@qq.com)
 * @website http://www.leedow.com
 * @date    2014-09-18 09:44:18
 * @version $Id$
 * @spaceName features
 */
 var features = {};
 features.init = function(){
require([
		"esri/layers/FeatureLayer",
		"esri/dijit/editing/TemplatePicker",
		"dojo/_base/array",
		"dojo/dom",
		"dojo/domReady!"
	], function(
		FeatureLayer, TemplatePicker,
		arrayUtils, dom
		) {
		var layerUrls = [
			"http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/SanFrancisco/311Incidents/FeatureServer/0"
			 
		];
		var layers = [], count = layerUrls.length;

		var loadFunc = function(evt) {
			count--;
			layers.push(evt.layer);
			if (!count) {
				console.info("Layers loaded");
				createTemplatePicker(layers);
			}
		};

		arrayUtils.forEach(layerUrls, function(url) {
			var layer = new FeatureLayer(url);
			layer.on("Load", loadFunc);
		});

		function createTemplatePicker(layers) {
			var widget = new TemplatePicker({
			featureLayers: layers,
			rows: "auto",
			columns: "2",
			showTooltip: false,
			style: "height: 100%; width:90%;"
		}, "templatePickerDiv");

		widget.startup();

		widget.on("selection-change", function() {
			var selected = widget.getSelected();
			console.log(selected);

			var infoDiv = dom.byId("info");
			if (selected) {
				infoDiv.innerHTML = selected.template.name;
			} else {
				infoDiv.innerHTML = "";
			}
			});
		}
	});
 }



