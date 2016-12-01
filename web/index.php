<html>
<head>

<title>Flacso Opendata</title>

<!-- <script src="js/jquery-3.1.0.min.js"></script> -->
<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>


	

 <link rel="stylesheet" href="http://openlayers.org/en/v3.18.2/css/ol.css" type="text/css">
    
    
    <!-- <link rel="stylesheet" href="http://openlayers.org/en/master/css/ol.css" />
    <script src="http://openlayers.org/en/v3.18.2/build/ol.js" type="text/javascript"></script> -->
    
    <link rel="stylesheet" href="http://openlayers.org/en/master/css/ol.css" />
	 <script type="text/javascript" src="http://openlayers.org/en/master/build/ol.js"></script> 
    
    <script type="text/javascript" src="interaction/selectclusterinteraction.js"></script>
	 <script type="text/javascript" src="layer/animatedclusterlayer.js"></script> 
	 <link rel="stylesheet" href="control/layerswitchercontrol.css" />
	 <script type="text/javascript" src="control/layerswitchercontrol.js"></script>

    <link rel="stylesheet" href="overlay/popupoverlay.css" />
	 <link rel="stylesheet" href="overlay/popupoverlay.anim.css" />
	 <script type="text/javascript" src="overlay/popupoverlay.js"></script>
   

   <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script type="text/javascript" src="https://www.google.com/jsapi"></script>
	
	<script>
			google.load('visualization', '1', {packages:['corechart']});
			google.load('visualization', '1', {packages:['table']});
			google.load('visualization', '1', {packages: ['controls']}); 
			google.charts.load('current', {'packages':['treemap']});
		</script> 
	

	<script src="js/functions.js"></script>
	<script src="js/globales.js"></script>
	
	<link rel="stylesheet" href="css/flacso.css" type="text/css">
	<script src="js/flacso.js"></script>


</head>
<body>
<nav class="navbar navbar-default">
  <div id="indicadores" class="container-fluid">
    <div class="navbar-header">
    <!-- <a class="navbar-brand" href="#"><img alt="Brand" src="img/logos.png" style="height:30px;"></a> -->
    <!-- <a class="navbar-brand" href="#"><img alt="Brand" src="img/logo.png" style="width:30px;"></a>
    <a class="navbar-brand" href="#"><img alt="Brand" src="img/logo-cite.png" style="width:40px;"></a>
    <a class="navbar-brand" href="#"><img alt="Brand" src="img/logo-bid.png" style="width:60px;"></a>
     <a class="navbar-brand" href="#"><img alt="Brand" src="img/logo-miduvi.png" style="width:40px;"></a> -->
     <a class="navbar-brand" href="#"><img alt="Brand" src="img/logo1.png" style="height:30px;"></a>
    <a class="navbar-brand" href="#"><img alt="Brand" src="img/logo2.png" style="height:30px;"></a>
    <a class="navbar-brand" href="#"><img alt="Brand" src="img/logo3.png" style="height:30px;"></a>
     
      <ul class="nav navbar-nav">
      	<!-- Indicadores, Comparativa, Descarga, Agregados, OpenData, Estudios -->
      	<li><p class="navbar-btn"> <button  class="btn btn-default btn-navbar active" target="mapa" subtarget="mapa">Indicadores</button></p></li>
        	<li><p class="navbar-btn"> <button class="btn btn-default  btn-navbar" target="comparativa">Comparativa</button></p></li>         
        	<li><p class="navbar-btn"> <button class="btn btn-default  btn-navbar" target="comparativa" subtarget='descarga'>Descarga</button></p></li> 
        	<li><p class="navbar-btn"> <button id="btnAgregados" class="btn btn-default  btn-navbar" target="agregados">Agregados</button></p></li>       
        	<li><p class="navbar-btn">  <button  class="btn btn-default  btn-navbar" target="opendata">Open Data</button></p></li>
        		<li><p class="navbar-btn"> <button class="btn btn-default  btn-navbar" target="estudios">Estudios</button></p></li>
        	
       </ul>       
     
    </div>
  </div>
</nav>
<div id="mapa" class="pagina container-fluid">

	


	<div class="row-fluid">
		<div class="col-md-4" id="menu-campos">
			<ul class="nav nav-pills nav-stacked">			  
			</ul>	
		</div>
       
        
		<div id="div-mapa" class="col-md-8" id="">
					 <div id="map" class="map"></div>
		
					<div class="row-fluid">
						<div class="col-md-4" id="">
							<div class="" id="dataTable"></div>
						</div>
						<div class="col-md-4" id="">
							<div class="" id="dataPie"></div>
						</div>
						<div class="col-md-4" id="">		
							<div class="" id="dataBar"></div>
						</div>
					</div>					 
					 
		</div>        
        
	</div>
	
</div>

<div id="comparativa" class="pagina container-fluid hidden">

      
      
      <div class="row">
      	<div class="col-sm-3">
		      
		     
		      <!-- <div class="row">
		      	<button id="btn-comparar" class="btn btn-lg btn-block" type="submit">Comparar</button>
		      </div>
		      <br><br> -->
		      <div id="chk-columnas" class="row">
		      	<div><label>Checkbox</label><input type="checkbox"></div>
		      	
		      </div>
		      
		  </div>
		  
		<div id="div-descarga" class="col-md-9 hidden">
		  
				<div class="row">			      	
		      	<div class="col-xs-4">			
						<div><h4>Ciudad</h4></div>
						<select id="sel-ciudad4" class="">
							<option>hola</option>						
						</select>
					</div>					 
		      </div>		  
		  
		  		<div class="row">
					<div id="descarga-table" class="col-sm-12">		</div>
				</div>
		  		 
				<div class="row">
					<div id="descarga-table" class="col-sm-12">		
						<h4>Descargar Detalle</h4>
						<!-- <div id="descarga-table" class="col-sm-4">	 -->	
						<form action="io.php" method="post" target="_blank" style="float:left;margin-right:10px;">
								<input id="fullarray" name="fullarray" type="hidden">
						 		<!-- <input type="submit" value="XLS"> -->
						 		<button><img src="img/xls.png" style="width:130px;" alt=""></button>
								
						 </form> 
						<!--  </div> -->
						<!-- <div id="descarga-table" class="col-sm-4"> --> 
							<a id="shp-download"><button><img src="img/shp.png" style="width:130px;" alt=""></button>	</a>	
						<!-- </div>		 -->		 
						 
					</div>
				</div>
		  		   
		      
       </div>		  
		     
		  <div id='div-comparativa' class="col-sm-9">
		  
				<div class="row">	
		      	
		      	<div class="col-xs-4">			
						<div><h4>Ciudad1</h4></div>
						<select id="sel-ciudad1" class="">
							<option>hola</option>
						
						</select>
					</div>	
					<div class="col-xs-4">				
						<div><h4>Ciudad2</h4></div>
						<select id="sel-ciudad2"  class="">
							<option>hola</option> 
						</select>
					</div>
					<div class="col-xs-4">
						<div><h4>Ciudad3</h4></div>
						<select id="sel-ciudad3"  class="">
							<option>hola</option> 
						</select>				
					</div> 
		      </div>		  
		  
		  		 <div class="row">
					<div id="comparar-bar" class="col-sm-12" style="height:500px;"></div>
				</div>
				<div class="row">
					<div id="comparar-table" class="col-sm-12">		</div>
				</div>				
				   
		      <div class="row">
		      	<div id="comparar-col" class="col-sm-12">	</div>
		      </div>
		       
					    
		      
       </div>
    </div>

</div>

<div id="agregados" class="pagina container-fluid hidden">
	<div class="row-fluid">
		<div class="col-md-4" id="menu2-campos">
			<ul class="nav nav-pills nav-stacked">
			</ul>	
		</div>       
        
		<div id="div-graficos" class="col-md-8" id="">
							
					<div class="row-fluid">						
						<img id="aguared" style="width:100%" class="hidden" src="img/mapa_agua_red2.png" >
					</div>
					<div class="row-fluid">	
						<br>
						<div class="" id="agregadosBar" style="height:500px;" ></div>
					</div>						
					<div class="row-fluid">
						<br>
						<div class="" id="agregadosTable"></div>
					</div>					 
					 
		</div>        
	</div>	
</div>


<div id="opendata" class="pagina container-fluid hidden">

	<div class="col-xs-3"></div>
	<div class="col-xs-6">
		<div class="row">
			<div>Registrate para objetener información mas completa</div>
		</div>
		<div class="row">
	      <form class="form-signin">
	        <h2 class="form-signin-heading">Por favor ingresa</h2>
	        <label for="inputEmail" class="sr-only">Email</label>
	        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
	        <label for="inputPassword" class="sr-only">Contraseña</label>
	        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
	        <div class="checkbox">
	          <label>
	            <input type="checkbox" value="remember-me">
	          </label>
	        </div>
	        <button class="btn btn-lg btn-primary btn-block" type="submit">Ingresar</button>
	      </form>
	    </div>
   </div>
   <div class="col-xs-3"></div>
  
</div> <!-- /container -->

<div id="estudios" class="pagina container-fluid hidden">
	<div class="row-fluid">
		<div class="col-md-1" id="menu3-campos">
			
		</div>       
        
		<div id="div-graficos" class="col-md-8" id="">
							
					<div class="row-fluid">						
						<img id="" style="" class="" src="img/estudios.png" >
					</div>
										 
					 
		</div>        
	</div>	
</div>
 

</body>
</html>