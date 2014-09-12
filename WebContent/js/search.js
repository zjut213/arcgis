//搜索相关
var  search = {};
search.init = function(Map, Geocoder,
    Graphic, SimpleMarkerSymbol, screenUtils,
    dom, domConstruct, query, Color){
	var geocoder =  new Geocoder({
    	arcgisGeocoder: {
        placeholder: "Find a place"
    }, 
    	autoComplete: true,
    	map: map
    }, dom.byId("search"));

    map.on("load", enableSpotlight);

    geocoder.on("select", showLocation);
    geocoder.on("clear", removeSpotlight);

    function showLocation(evt) {
    	map.graphics.clear();
    	var point = evt.result.feature.geometry;
    	var symbol = new SimpleMarkerSymbol().setStyle(
		    SimpleMarkerSymbol.STYLE_SQUARE).setColor(
		    new Color([255,0,0,0.5])
		    );
    	var graphic = new Graphic(point, symbol);
    	map.graphics.add(graphic);
	
    	map.infoWindow.setTitle("Search Result");
    	map.infoWindow.setContent(evt.result.name);
    	map.infoWindow.show(evt.result.feature.geometry);

    	var spotlight = map.on("extent-change", function(extentChange) {
        var geom = screenUtils.toScreenGeometry(map.extent, map.width, map.height, extentChange.extent);
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
		domConstruct.place(html, dom.byId("map_container"), "first");
    }

    function removeSpotlight() {
    	query(".spotlight").removeClass("spotlight-active");
    	map.infoWindow.hide();
    	map.graphics.clear();
    }
}