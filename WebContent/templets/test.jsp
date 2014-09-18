<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
    <title></title>  
    <link rel="stylesheet" href="http://js.arcgis.com/3.10/js/dojo/dijit/themes/claro/claro.css">
    <link rel="stylesheet" href="http://js.arcgis.com/3.10/js/esri/css/esri.css">
    <style>
      html, body, #mainWindow {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        font-size:12px;font-family:'Microsoft YaHei', SimHei !important;
      }
      #search {
        display: block;
       position:absolute;
       right:30px;
       top:60px;
        z-index: 3;
        
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
 <body class="claro">
<div id="search"></div>
  <div id="mainWindow" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="design:'headline'">
    <div id="header" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'top'" gutters="false">
  交通GIS管理 
 
 
    </div>
    
    <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'left'" style="width:200px;">
    	<span>绘制:<br /></span>
      <button data-dojo-type="dijit/form/Button" id="point">点</button>
      <button data-dojo-type="dijit/form/Button" id="Multi Point">多点</button>
      <button data-dojo-type="dijit/form/Button" id="Line">直线</button>
      <button data-dojo-type="dijit/form/Button" id="Polyline">直线</button>
      <button data-dojo-type="dijit/form/Button" id="Polygon">区域</button>
      <button data-dojo-type="dijit/form/Button" id="Freehand Polyline">自由线</button>
      <button data-dojo-type="dijit/form/Button" id="Freehand Polygon">自由区域</button>
      <!--The Arrow,Triangle,Circle and Ellipse types all draw with the polygon symbol-->
      <button data-dojo-type="dijit/form/Button" id="Arrow">箭头</button>
      <button data-dojo-type="dijit/form/Button" id="Triangle">三角形</button>
      <button data-dojo-type="dijit/form/Button" id="Circle">圆</button>
      <button data-dojo-type="dijit/form/Button" id="Ellipse">椭圆</button>
     
    </div>
    
    
      <div id="map" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'center'" style="padding:0 !important;"></div>
  </div>
         
  </body> 
</html>