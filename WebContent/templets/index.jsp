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
		var BASE_URL = 'localhost/arcgis';
	</script>
    <script type="text/javascript" src="http://localhost/arcgis/arcgis_js_api/library/3.9/3.9/init.js"></script>

	<script src="/arcgis/js/arcgis.base.js"></script>
	<script src="/arcgis/js/arcgis.layout.js"></script>
	<script src="/arcgis/js/arcgis.edit.js"></script>
	<script src="/arcgis/js/arcgis.search.js"></script>
	<script src="/arcgis/js/arcgis.attachment.js"></script>
	<script src="/arcgis/js/arcgis.features.js"></script>
	<script src="/arcgis/js/arcgis.track.js"></script>
	<script src="/arcgis/js/arcgis.measure.js"></script>
	<script>
		map.init();
	</script>
</head>
<body class="nihilo">
	<div id="search"></div>
	<div id="mainWindow" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="liveSplitters:false,design:'headline'" gutters="false">
		<div id="header" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'top'"  style="height:40px;">
	  			<div class="logo">交通GIS管理系统 <span>BETA</span></div> 
	  			<div class="top-menu">
	  				<ul>
	  					<li id="cmdNewStream">开启追踪</li>
	  					<li id="cmdDisconnect">关闭追踪</li>
	  					<li id="">数据测量</li>
	  				</ul>
	  			</div>
		</div>
		<div id="left" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'left', splitter:true, minSize:20" style="padding:0;width:200px;"> 
			
			<div id="left-bar" data-dojo-type="dijit/layout/AccordionContainer" data-dojo-props=" minSize:20"> 		 
		 			<div data-dojo-type="dijit/layout/ContentPane" data-dojo-props='title:"图例"'>
		 				<div id="templatePickerDiv"></div>
		 			</div>
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
			 			<div id="tool_move" data-dojo-type="dijit/form/ToggleButton" data-dojo-props="checked:'true', iconClass:'dijitCheckBoxIcon'">Move</div>
					      <div id="tool_vertices" data-dojo-type="dijit/form/ToggleButton" data-dojo-props="checked:'true', iconClass:'dijitCheckBoxIcon'">Edit Vertices</div>
					      <div id="tool_scale" data-dojo-type="dijit/form/ToggleButton" data-dojo-props="checked:'true', iconClass:'dijitCheckBoxIcon'">Scale</div>
					      <div id="tool_rotate" data-dojo-type="dijit/form/ToggleButton" data-dojo-props="checked:'true', iconClass:'dijitCheckBoxIcon'">Rotate</div>
					      <button data-dojo-type="dijit/form/DropDownButton" id="options"  data-dojo-props="value:'options'"> 
					        <span>Options</span> 
					        <div data-dojo-type="dijit/Menu" id="optionsMenu">
					          <div id="vtx_ca" data-dojo-type="dijit/CheckedMenuItem" data-dojo-props="checked:'true'">Allow Add Vertices</div>
					          <div id="vtx_cd" data-dojo-type="dijit/CheckedMenuItem" data-dojo-props="checked:'true'">Allow Delete Vertices</div>
					          <div id="uniform_scaling" data-dojo-type="dijit/CheckedMenuItem" data-dojo-props="checked:'true'">Uniform Scaling when Resizing</div>
					        </div>
					      </button> 
		 			</div>
		 			
		 			<div data-dojo-type="dijit/layout/ContentPane" data-dojo-props='title:"测试"'>test</div>
			 </div>
		</div>
		 <div id="main" data-dojo-type="dijit/layout/TabContainer" data-dojo-props="region: 'center', tabPosition: 'bottom'">
				<div data-dojo-type="dojox/layout/ContentPane"  data-dojo-props="title: '查看地图'" style="padding:0;">
					<div id="map" style="width:100%;height:100%;">
						 <div style="position:absolute; right:20px; top:70px; z-Index:999;">
          					<div id="titlePane" data-dojo-type="dijit/TitlePane" data-dojo-props="title:'Measurement', closable:'false', open:'false'">
            					<div id="measurementDiv"></div>
            					<span style="font-size:smaller;padding:5px 5px;">Press <b>CTRL</b> to enable snapping.</span>
          					</div>
        				</div>
					</div>
				</div>
				<div data-dojo-type="dojox/layout/ContentPane"  data-dojo-props="title: '管理界面', href: 'grid.html'">
				
				</div>
		 </div>
		
	</div>
</body> 
</html>