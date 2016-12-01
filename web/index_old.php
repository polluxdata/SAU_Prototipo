<html>


<head>

<script src="js/jquery-3.1.0.min.js"></script>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

 <link rel="stylesheet" href="http://openlayers.org/en/v3.18.2/css/ol.css" type="text/css">
    <style>
      .map {
        height: 400px;
        width: 100%;
      }
    </style>
    <script src="http://openlayers.org/en/v3.18.2/build/ol.js" type="text/javascript"></script>
    
    
<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="//d3js.org/topojson.v1.min.js"></script>

 
</head>
<body>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
    <a class="navbar-brand" href="#"><img alt="Brand" src="img/logo.png" style="width:20px;"></a>
      <ul class="nav navbar-nav">
      	
      	<li><p class="navbar-btn"> <a href="#" class="btn btn-default">Indicadores</a></p></li>
        	<li><p class="navbar-btn"> <a href="#" class="btn btn-default">Comparativa</a></p></li>         
        	<li><p class="navbar-btn">  <a href="#" class="btn btn-default">Open Data</a></p></li>
       </ul>       
     
    </div>
  </div>
</nav>
<div class="container">
	<div class="row">
		<div class="col-md-4" id="">
			<ul class="nav nav-pills nav-stacked">
			   <li>Poblacion</li>
			   <li>Muerte</li>
			   <li>tri</li>
			   <li>cetriri</li>
			   <li>pet</li>
			</ul>	
		</div>
		
       
        
		<div class="col-md-8" id="">
					 <div id="map" class="map"></div>
		</div>        
        
	</div>
</div>


    <script type="text/javascript">   
    
     var styleCache ={};
     
     //ESTILO DEL MAPA
     var styleFunction = function (feature, resolution) {
     			console.log(feature);
     			console.log(feature.getGeometry());
     			console.log(feature.getGeometry().getCoordinates());
            var geometries = feature.getGeometry().getGeometries();
            var start = geometries[0];
            var line = geometries[1];
            var end = geometries[2];

            var startStyle = new ol.style.Style({
                geometry: start,
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#32CD32'
                    })
                })
            });

            var endStyle = new ol.style.Style({
                geometry: end,
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#FF4500',
                        opacity: 0.8
                    })
                })
            });

            var lineStyle = new ol.style.Style({
                geometry: line,
                fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)',
                        weight: 4
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#808080',
                        width: 4
                    })
            });

            return [startStyle, lineStyle, endStyle];

        };
        
        
     var raster = new ol.layer.Tile({
         source: new ol.source.Stamen({
         layer: 'toner'
          })
        });
     
     
     var tiled = new ol.layer.Tile({
        visible: true,
        source: new ol.source.TileWMS({
          url: 'http://flacso.seyanim.com:8080/geoserver/indurb/wms',
          params: {FORMAT: "image/png", 
                   VERSION: '1.1.1',
                   tiled: true,
                STYLES: '',
                LAYERS: 'indurb:circuitos3'
          }
        })
      });
      
    // http://openlayers.org/en/v3.2.1/examples/kml-earthquakes.html
      
		var puntos = {};      
      
      puntos['gye'] = new ol.layer.Vector({
         source: new ol.source.Vector({
            //GYE
            url: 'http://flacso.seyanim.com:8080/geoserver/indurb/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=indurb:circuitos4&srsName=EPSG:32717&bbox=608253.02,9745978.19,637388.08,9778028.48&outputFormat=KML',
            //url: 'http://flacso.seyanim.com:8080/geoserver/indurb/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=indurb:circuitos2&srsName=EPSG:32717&outputFormat=KML', 
            format: new ol.format.KML ({
                 extractStyles: false
             })
         })
      });
      
		puntos['amb'] = new ol.layer.Vector({
         source: new ol.source.Vector({
            //GYE
            url: 'http://flacso.seyanim.com:8080/geoserver/indurb/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=indurb:circuitos4&srsName=EPSG:32717&bbox=760854.40,9852153.26,769928.44,9868715.77&outputFormat=KML',
            //url: 'http://flacso.seyanim.com:8080/geoserver/indurb/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=indurb:circuitos2&srsName=EPSG:32717&outputFormat=KML', 
            format: new ol.format.KML ({
                 extractStyles: false
             })
         })
      });      
            
      var clusterSource = new ol.source.Cluster({
			  distance: 80,
			  source: puntos['amb'].getSource()
			});			
     
	 var maximus=0; 	 	   
     
	  featureStyle = function(feature, resolution) {
		    var size = feature.get('features').length;		   
		    var features =  feature.get('features');
		    //console.log(features);
		    var sumpoblacion = 0;
		    var max = 0;
			 for(i=0;i<size;i++){			 	
			 	var poblacion = parseInt( features[i].getProperties()["pob_circ"] );
			 	sumpoblacion += poblacion;		 	
			 	maximus = Math.max(  maximus , sumpoblacion );
			 	}		    
		    var style = styleCache[poblacion];
		    if (!style) {
		      style = [new ol.style.Style({
		        image: new ol.style.Circle({
		          radius: 35*(0.5+0.5*sumpoblacion/maximus),
		          stroke: new ol.style.Stroke({
		            color: '#fff'
		          }),
		          fill: new ol.style.Fill({
		            color: '#3399CC'
		          })
		        }),
		        text: new ol.style.Text({
		          text: sumpoblacion.toString(),
		          fill: new ol.style.Fill({
		            color: '#fff'
		          })
		        })
		      })];
		      styleCache[size] = style;
		    }
		    return style;
		  } 
		  
	  selFeatureStyle = function(feature, resolution) {
		    var size = feature.get('features').length;		   
		    var features =  feature.get('features');
		    //console.log(features);
		    var sumpoblacion = 0;
		    var max = 0;
			 for(i=0;i<size;i++){			 	
			 	var poblacion = parseInt( features[i].getProperties()["pob_circ"] );
			 	sumpoblacion += poblacion;		 	
			 	//maximus = Math.max(  maximus , sumpoblacion );
			 	}		    
		    style = styleCache[poblacion];
		    console.log(style);
		    return style;
		  }    
      
     var clusters = new ol.layer.Vector({
		  source: clusterSource,
		  style: featureStyle
		}); 
      
     	
	clusters.getSource().on('change', function(evt){
		  var source = evt.target;		  
		  //if (source.getState() === 'ready' && !changed) {
		  		maximus=0;	  				  						
							
		  //}		  		    
		});	     	
     		
		
		/*var featureStyle = function(feature,prop) {
			  
			  var properties = feature.getProperties();
			  property = properties[prop];
			  var scale =  property / maximuns[prop];
			  var texto =  parseInt( property ).toString();
			  //console.log(properties);
			   var zoom = map.getView().getZoom();
			  
			  var  strokecolor = '#020815';
			  
			  var styleob = {};
			  
			  styleob['image']= new ol.style.Circle({
			
			      fill: new ol.style.Fill({
			        color: '#1b465a'
			      }),
			      stroke: new ol.style.Stroke({
			        color: strokecolor,
			        width: 3
			      }),
			      radius: 50 *scale
			    });
			  
			  if(zoom > 12){
				  styleob['text']=   new ol.style.Text({
			          text: texto,
			          scale: 1,
			          offsetX: 0,
			          fill: new ol.style.Fill({
			            color: '#000000'
			          }),
			          stroke: new ol.style.Stroke({
			            color: '#FFFF99',
			            width: 3.5
			          })
			        });
		        
		        }		   
			  	  
			  			
			  return [new ol.style.Style( styleob )];
			};*/
			
	  
	
	 var maximuns = {};
	 function updateMaximuns(){
	 	maximuns = {};
	 	source = puntos.getSource();
	 	features = source.getFeatures();     	
    	for (i = 0; i < features.length; i++) {
    		feature = features[i];				
			properties = feature.getProperties();
			keys = feature.getKeys();			
			for (j = 0; j < keys.length; j++) {
				val = properties[j];	
				if( maximuns[keys[j]] == null ){
					maximuns[keys[j]]=0;
					}			
				maximuns[keys[j]]=Math.max(  parseInt( properties[keys[j]] ),maximuns[keys[j]]  );
				}
		}
		console.log(maximuns);
	 	}	
	 /*function refreshStyles(){
	 	source = puntos.getSource();
	 	features = source.getFeatures();     	
    	for (i = 0; i < features.length; i++) {
    		feature = features[i];				
			feature.setStyle(
			  	//featureStyle(feature,"pob_circ")
			  );
		}
	 
	 	}*/		
		
	  //ASIGNA ESTILO PREDETERMIANDO		
     /*var changed = false; 
     puntos.getSource().on('change', function(evt){
		  var source = evt.target;		  
		  if (source.getState() === 'ready' && !changed) {
		  		changed = true;
		  		updateMaximuns();	
		  		refreshStyles();		  				  						
							
		  }		  		    
		});*/
		
		
		
		
		var zoomchange = new ol.interaction.DragZoom();
		
		/*draw.on('change', function(evt){			    
			            console.info(feature);
			            feature.setStyle(redStyle(feature));			       
			});	*/	
		
		var select = new ol.interaction.Select();
		
		
		
		
		select.on('select', function(evt){
			    var selected = evt.selected;
			    var deselected = evt.deselected;
			    
			    if (selected.length) {
			        selected.forEach(function(feature){
			            console.info(feature);
			            feature.setStyle(selFeatureStyle(feature));
			        });
			    } else {
			        deselected.forEach(function(feature){
			            console.info(feature);
			            feature.setStyle(featureStyle(feature));
			        });
			    }
			});
		
		

        
      var map = new ol.Map({
        target: 'map',
        layers: [raster,tiled,clusters],
        view: new ol.View({
          center: ol.proj.fromLonLat([-78.25, -1.8]),
          zoom: 6,
          maxZoom:16,
          minZoom:6
        })
      });
      // map.addInteraction(draw);
      map.addInteraction(select);
      
      map.getView().on('propertychange',function (e) {      	
      	if(e.key=="resolution"){
      		//refreshStyles();
      		}
      });
      
/*var info = $('dpa_parroq');
  info.tooltip({
  animation: false,
  trigger: 'manual'
});*/

var displayFeatureInfo = function(pixel) {
  /*info.css({
    left: pixel[0] + 'px',
    top: (pixel[1] - 15) + 'px'
  });*/
  var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
    return feature;
  });
  if (feature) {
    /*info.tooltip('hide')
        .attr('data-original-title', feature.get('name'))
        .tooltip('fixTitle')
        .tooltip('show');*/
  } else {
    //info.tooltip('hide');
  }
};

map.on('pointermove', function(evt) {
  if (evt.dragging) {
    //info.tooltip('hide');
    return;
  }
  displayFeatureInfo(map.getEventPixel(evt.originalEvent));
});

map.on('click', function(evt) {
  displayFeatureInfo(evt.pixel);
});


      
    </script>

</body>
</html>