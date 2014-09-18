var edit = {};
edit.init = function(Map, Draw, Graphic,
        SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
        parser, registry
        ){
	map.on("load", createToolbar);
	
	// loop through all dijits, connect onClick event
	// listeners for buttons to activate drawing tools
	registry.forEach(function(d) {
	  // d is a reference to a dijit
	  // could be a layout container or a button
	  if ( d.declaredClass === "dijit.form.Button" ) {
	    d.on("click", activateTool);
	  }
	});
	
	function activateTool() {
		alert("fsdf");
	  var tool = this.get("id").toUpperCase().replace(/ /g, "_");
	  toolbar.activate(Draw[tool]);
	  map.hideZoomSlider();
	}
	
	function createToolbar(themap) {
	  toolbar = new Draw(map);
	  toolbar.on("draw-end", addToMap);
	}
	
	function addToMap(evt) {
	  var symbol;
	  toolbar.deactivate();
	  map.showZoomSlider();
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
	  map.graphics.add(graphic);
	}
}