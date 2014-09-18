<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
	<title>GIS管理系统</title>  
	<link rel="stylesheet" href="/arcgis/style/nihilo.css">
	<link rel="stylesheet" href="/arcgis/style/style.css">
	<link rel="stylesheet" type="text/css" href="http://localhost/arcgis/arcgis_js_api/library/3.9/3.9/js/dojo/dijit/themes/tundra/tundra.css"/>
    <link rel="stylesheet" type="text/css" href="http://localhost/arcgis/arcgis_js_api/library/3.9/3.9/js/esri/css/esri.css" />
    <script>
		//var BASE_URL = window.location.host + "/arcgis";
		var BASE_URL = "localhost/arcgis";
	</script>
    <script type="text/javascript" src="http://localhost/arcgis/arcgis_js_api/library/3.9/3.9/init.js"></script>

	<script src="/arcgis/js/arcgis.base.js"></script>
	<script src="/arcgis/js/arcgis.layout.js"></script>
	<script src="/arcgis/js/arcgis.edit.js"></script>
	<script src="/arcgis/js/arcgis.search.js"></script>
	<script src="/arcgis/js/arcgis.attachment.js"></script>
	<script>
		map.init();
	</script>
</head>
<body class="nihilo">
	<div id="search"></div>
	<div id="mainWindow" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="liveSplitters:false,design:'headline'" gutters="false">
		 <div id="header" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'top'" gutters="false">
  			<div class="logo">交通GIS管理系统</div> 
		</div>
		 <div id="left-bar" data-dojo-type="dijit/layout/AccordionContainer" data-dojo-props="region:'leading', splitter:true, minSize:20"
	 		style="width: 200px;"> 		 
	 			<div data-dojo-type="dijit/layout/ContentPane" data-dojo-props='title:"编辑面板"'>
		 			<h2>绘制要素</h2>
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
		 			<h2>编辑要素</h2>
		 			
	 			</div>
	 			
	 			<div data-dojo-type="dijit/layout/ContentPane" data-dojo-props='title:"测试"'>test</div>
		 </div>
		 <div id="main" data-dojo-type="dijit/layout/TabContainer" data-dojo-props="region: 'center', tabPosition: 'bottom'">
				<div data-dojo-type="dojox/layout/ContentPane"  data-dojo-props="title: '查看地图'" style="padding:0;">
					<div id="map" style="width:100%;height:100%;"></div>
				</div>
				<div data-dojo-type="dojox/layout/ContentPane"  data-dojo-props="title: '管理界面', href: 'grid.html'">
				
				</div>
		 </div>
	</div>
</body> 
</html>