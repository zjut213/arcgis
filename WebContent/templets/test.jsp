<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
    <title></title>
    <link rel="stylesheet" href="http://js.arcgis.com/3.10/js/esri/css/esri.css">
    <style>
      html, body, #map {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
      }
      #search {
        display: block;
        position: absolute;
        z-index: 3;
        top: 20px;
        left: 75px;
      }
      .spotlight {
        z-index:-1;
        position:absolute;
        left:50%;
        top:50%;
        border-radius:50%;
        opacity:0;
        box-shadow:
        inset rgba(0,0,0,0.25) 0px 0px 20px 20px,
        rgba(0,0,0,0.25) 0px 0px 0px 1000px;
        transition:all 1000ms;
        -moz-transition:all 1000ms;
        -webkit-transition:all 1000ms;
      }
      .spotlight-active {
        z-index:2;
        opacity:1;
      }
    </style>
    
    <script src="http://js.arcgis.com/3.10/"></script>
    <script src="/arcgis/js/base.js"></script>
    <script src="/arcgis/js/search.js"></script>
    <script src="/arcgis/js/edit.js"></script>
    <script>
      
    </script>
  </head>
  <body class="soria">
   <div id="header" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'top'">
      <span>Draw:<br /></span>
      <button data-dojo-type="dijit/form/Button">Point</button>
      <button data-dojo-type="dijit/form/Button">Multi Point</button>
      <button data-dojo-type="dijit/form/Button">Line</button>
      <button data-dojo-type="dijit/form/Button">Polyline</button>
      <button data-dojo-type="dijit/form/Button">Polygon</button>
      <button data-dojo-type="dijit/form/Button">Freehand Polyline</button>
      <button data-dojo-type="dijit/form/Button">Freehand Polygon</button>
      <!--The Arrow,Triangle,Circle and Ellipse types all draw with the polygon symbol-->
      <button data-dojo-type="dijit/form/Button">Arrow</button>
      <button data-dojo-type="dijit/form/Button">Triangle</button>
      <button data-dojo-type="dijit/form/Button">Circle</button>
      <button data-dojo-type="dijit/form/Button">Ellipse</button>
    </div>
    <div id="search"></div>
    <div id="map"></div>            
  </body> 
</html>