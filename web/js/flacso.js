var maximus=0; 

   $(document).ready(function () {
   	
   	
     
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
     
     
   /*  var limite_circuitos = new ol.layer.Tile({
        visible: false,
        source: new ol.source.TileWMS({
          url: 'http://flacso.seyanim.com:8080/geoserver/indurb/wms',
          params: {FORMAT: "image/png", 
                   VERSION: '1.1.1',
                   tiled: true,
                STYLES: '',
                LAYERS: 'indurb:circuitos6'
          }
        })
      }); */
      
    
    var limite_ciudad = new ol.layer.Tile({
        visible: true,
        source: new ol.source.TileWMS({
          url: 'http://flacso.seyanim.com:8080/geoserver/indurb/wms',
          params: {'FORMAT': "image/png", 
                   'VERSION': '1.1.1',
                   tiled: true,
                STYLES: '',
                LAYERS: 'indurb:limites_ciudades',
             tilesOrigin: 510397.21875 + "," + 9546134
          }
        })
      });
      
      
    var limite_circuitos = new ol.layer.Image({
        visible: true,
        source: new ol.source.ImageWMS({
          url: 'http://flacso.seyanim.com:8080/geoserver/indurb/wms',
          params: {'FORMAT': "image/png", 
                   'VERSION': '1.1.1',
                   tiled: true,
                STYLES: '',
                LAYERS: 'indurb:circuitos6',
             tilesOrigin: 606953.0625 + "," + 9746178
          }
        })
      });
      
    // http://openlayers.org/en/v3.2.1/examples/kml-earthquakes.html
      
		   
      
      var puntos = new ol.layer.Vector({
         source: new ol.source.Vector({
            //GYE
            //url: 'http://flacso.seyanim.com:8080/geoserver/indurb/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=indurb:circuitos4&srsName=EPSG:32717&bbox=608253.02,9745978.19,637388.08,9778028.48&outputFormat=KML',
            url: 'http://flacso.seyanim.com:8080/geoserver/indurb/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=indurb:v_circuitos7&srsName=EPSG:32717&outputFormat=KML', 
            format: new ol.format.KML ({
                 extractStyles: false
             })
         }),
         context:function (feature) {
            		console.log(feature);
            	 return "ok";
            	}
      });
      
      ///FINALIZA CARGA DE DATOS 
     var changed = false; 
     puntos.getSource().on('change', function(evt){
		  var source = evt.target;		  
		  if (source.getState() === 'ready' && !changed) {
		  		changed = true;
		  		
		  		//var gdata = source2gdata(source);
		  		//gdata2chart("dataTable",gdata,"table")
		  		
		  		
		  		/*obdata = source2object(source,['des_circ'],['pob_circ','elec'],null);
		  			  		
		  		gdata2chart("dataTable",obdata['gdata'],"table");
		  		gdata2chart("dataPie",obdata['gdata'],"piechart");
		  		gdata2chart("dataBar",obdata['gdata'],"barchart");*/
		  		
		  		//map.updateSize();//FORZA REFRESCAR MAPA;				
		   		
		      //SELECT CIUDADES
		      
		      selciudades = function (def) {
		      	var ret="";
		      	ciudades = source2columna(source,'dpa_descan');
		      	//console.log(ciudades);			
					c=0;
					for(var ciudad in ciudades){
						if(c==def){selected="selected";}else{selected="";}						
						ret += "<option value='"+ciudad+"' "+selected+">"+ciudad+"</option>";
						c++;
						}      	
		      	return ret;
		      	}
		      
		      $("#sel-ciudad1").html( selciudades(0) );
				$("#sel-ciudad2").html( selciudades(1) );
				$("#sel-ciudad3").html( selciudades(2) );	
				$("#sel-ciudad4").html( selciudades(0) );      
		      	
		      	
		      	/*Menu Campos  checkbox comparativo*/
			    	/*menuCampos = "<ul class='nav nav-pills nav-stacked'>";
			    	checkBoxes = "";
			    	c=0;				
					for( var key in dimensiones ){
						if(c==0){expanded="in"}else{expanded=""}			
						menuCampos += "<li><button class='btn-acordeon btn-colapse btn-lg' data-toggle='collapse' data-target='#colapsed"+c+"'>"+dimensiones[key][0]['dimension']+"</button>";
						menuCampos += "<div id='colapsed"+c+"' class='acordeon1 collapse "+expanded+"'>";
						checkBoxes += "<div class='row-fluid'><button class='btn-colapse btn-lg ' data-toggle='collapse' data-target='#chk-colapsed"+c+"'>"+dimensiones[key][0]['dimension']+"</button></div>";	
						checkBoxes += "<div class='row-fluid collapse "+expanded+"' id='chk-colapsed"+c+"' >";
						for( var j=0; j<dimensiones[key].length; j++ ){
							if(dimensiones[key][j]['columna']=="poblacion_total"){active="active"}else{active=""}											
							menuCampos += "<button class='btn-propiedad "+active+"' value='"+dimensiones[key][j]['columna']+"'>"+dimensiones[key][j]['indicador']+"</button>";
							checkBoxes += "<button class='btn-comparar'  value='"+dimensiones[key][j]['columna']+"'>"+dimensiones[key][j]['indicador']+"</button>";
							//checkBoxes += "<div style='float:left;'><label>"+dimensiones[key][j]['indicador']+"</label><input type='checkbox' value='"+dimensiones[key][j]['columna']+"'></div>";
							}
							menuCampos += "</div></li>";
							checkBoxes += "</div>";
							c++;
						}    	
			     	menuCampos += "</ul>	";*/
			     	
			     
			     /*Menu Campos  checkbox comparativo*/
					
					menuCampos = "";					
					checkBoxes = "";			     
			     
			     	var c1=0;
			     	var c2=0;
				   for (var eje in ejes){			     
			      dim=ejes[eje];
			      if(c1==0){expanded0="in"}else{expanded0=""}	
					 var txteje = dim[Object.keys(dim)[0]][0]['eje'] ;  	      
			       menuCampos += "<button class='btn-acordeon0 btn-lg' data-toggle='collapse' data-target='#colapsedeje"+c1+"'>"+txteje+"</button>";
					menuCampos += "<div id='colapsedeje"+c1+"' class='acordeon0 collapse "+expanded0+"'>";		
			    	checkBoxes += "<button class='btn-colapse-eje btn-lg ' data-toggle='collapse' data-target='#chk-colapsedeje"+c1+"'>"+txteje+"</button>";	
					checkBoxes += "<div class='row-fluid collapse "+expanded0+"' id='chk-colapsedeje"+c1+"' >";				    					
					for( var key in ejes[eje] ){						
						if(c2==0){expanded1="in"}else{expanded1=""}						
						menuCampos += "<button class='btn-acordeon1' data-toggle='collapse' data-target='#colapsed"+c2+"'>"+dim[key][0]['dimension']+"</button>";
						menuCampos += "<div id='colapsed"+c2+"' class='acordeon1 collapse "+expanded1+"'>";
						checkBoxes += "<div class='row-fluid'><button class='btn-colapse' data-toggle='collapse' data-target='#chk-colapsed"+c2+"'>"+dim[key][0]['dimension']+"</button></div>";	
						checkBoxes += "<div class='row-fluid collapse "+expanded1+"' id='chk-colapsed"+c2+"' >";
						for( var j=0; j<dim[key].length; j++ ){
							if(dim[key][j]['columna']=="poblacion_total"){var active="active"}else{var active=""}								
							if(dim[key][j]['columna'] === 'null' ){var disabled="disabled";  }else{var disabled=""}								
							menuCampos += "<button class='btn-propiedad "+active+" "+disabled+"' "+disabled+" value='"+dim[key][j]['columna']+"'>"+dim[key][j]['indicador']+"</button>";
							checkBoxes += "<button class='btn-comparar "+active+" "+disabled+"' "+disabled+" value='"+dim[key][j]['columna']+"'>"+dim[key][j]['indicador']+"</button>";
							//checkBoxes += "<div style='float:left;'><label>"+dim[key][j]['indicador']+"</label><input type='checkbox' value='"+dim[key][j]['columna']+"'></div>";
							}
							menuCampos += "</div>";
							checkBoxes += "</div>";
							c2++;
						}						    	
			     	menuCampos += "</div>";	
			     	checkBoxes += "</div>";
			     	c1++;		     	
			     	}
			     	
			     	
			     $("#menu-campos").html(menuCampos);			     
			     $("#chk-columnas").html(checkBoxes);
			      //$("#chk-columnas2").html(menuCampos);
			     
		       $(".btn-acordeon1").on("click", function(){
		      		$(".acordeon1").removeClass("in");							      		
		      		}
		       );
		        $(".btn-acordeon0").on("click", function(){
		      		$(".acordeon0").removeClass("in");							      		
		      		}
		       );
		       
		       
		       
		       menuCampos2 = "";					
					checkBoxes = "";			     
			     
			     	var c1=0;
			     	var c2=0;
				   for (var eje in ejes2){			     
			      dim=ejes2[eje];
			      if(c1==0){expanded0="in"}else{expanded0=""}	
					 var txteje = dim[Object.keys(dim)[0]][0]['eje'] ;  	      
			       //menuCampos2 += "<button class='btn-acordeon0 btn-lg' data-toggle='collapse' data-target='#colapsedeje"+c1+"'>"+txteje+"</button>";
					//menuCampos2 += "<div id='colapsedeje"+c1+"' class='acordeon0 collapse "+expanded0+"'>";		
			    	for( var key in ejes2[eje] ){						
						if(c2==2){expanded1="in"}else{expanded1=""}						
						menuCampos2 += "<button class='btn-acordeon2' data-toggle='collapse' data-target='#colapsedB"+c2+"'>"+dim[key][0]['dimension']+"</button>";
						menuCampos2 += "<div id='colapsedB"+c2+"' class='acordeon2 collapse "+expanded1+"'>";
						for( var j=0; j<dim[key].length; j++ ){
							//if(dim[key][j]['indicador']=="Cobertura de Agua"){var active="active"}else{var active=""}								
							if(dim[key][j]['grafico'] === 'null' ){var disabled="disabled";  }else{var disabled=""}								
							menuCampos2 += "<button class='btn-propiedad2 "+active+" "+disabled+"' "+disabled+" value='"+dim[key][j]['grafico']+"'>"+dim[key][j]['indicador']+"</button>";
							}
							menuCampos2 += "</div>";
							c2++;
						}						    	
			     	//menuCampos2 += "</div>";	
			     	c1++;		     	
			     	}
			     	
			     	
			     $("#menu2-campos").html(menuCampos2);				     
			     
			     
		       $(".btn-acordeon2").on("click", function(){
		      		//$(".acordeon2").removeClass("in");							      		
		      		}
		       );
		       /* $(".btn-acordeon0").on("click", function(){
		      		$(".acordeon0").removeClass("in");							      		
		      		}
		       ); */
						
						
				//BOTONES NAVBAR
		   	$(".btn-navbar").on("click",function (e) {
		   		$(".btn-navbar").removeClass("active");
		   		$(this).addClass("active");		   		
		   		$(".pagina").addClass("hidden");
		   		$("#"+$(this).attr("target")).removeClass('hidden');
		   		if( $(this).attr('subtarget')=='descarga'  ){
		   			$("#div-descarga").removeClass('hidden');
		   			$("#div-comparativa").addClass('hidden');
		   			}
		   		else{
		   			$("#div-descarga").addClass('hidden');
		   			$("#div-comparativa").removeClass('hidden');		   			
		   			}
		   		comparar();
		   		});
		   		
		     $(".btn-propiedad").on("click",function (e) {		     		
		     		$(".btn-propiedad").removeClass('active');
		     		$(this).addClass('active');
		     		console.log(source);		     	
		     		source.refresh();
		     		//clusters.refresh();
		     		select.getFeatures().clear();
      			popup.hide();
		     		map.updateSize();//FORZA REFRESCAR MAPA;					     		
		     		
		     	});
		     	
				
				  	
		     	
		     	$(".btn-propiedad2").on("click",function (e) {		     		
		     		$(".btn-propiedad2").removeClass('active');
		     		$(this).addClass('active');
		     		console.log( agregados[$(this).val()] );
		     		gdata = arr2gdata( agregados[$(this).val()] );
		     		gdata2chart("agregadosBar",gdata,"sortbarchart");
		     		gdata2chart("agregadosTable",gdata,"sorttable");     		
		     		
		     		if( $(this).val() == "graf1" ){
		     			$("#aguared").removeClass('hidden');
		     			}
		     		else{
		     			$("#aguared").addClass('hidden');
		     			}			     		
		     		
		     	});
		      //DEFAULT GRAF
		      
		     	/*gdata = arr2gdata( agregados['graf1'] );
		     	gdata2chart("agregadosBar",gdata,"sortbarchart");
		     	gdata2chart("agregadosTable",gdata,"sorttable");	*/
		     
		     	
		     	
		     	
		    /*COMPARAR*/	
		      	
		        var comparar = function () {
		        		ciudad1 = $("#sel-ciudad1").val();
		        		ciudad2 = $("#sel-ciudad2").val();	
		        		ciudad3 = $("#sel-ciudad3").val();	
		        			        		
		        		chkcolumas = [];
		        		$(".btn-comparar").each(function (index) {		        					        			
		        			if($(this).hasClass('active') ){		        				
		        				chkcolumas.push($(this).val());
		        				}
		        			});		        		
		        		
						var col1 = "";
						var col2 = "";
							for(c in chkcolumas)	{
								col1 += "<br><div> ";
								col1 += "<div id='col1-"+chkcolumas[c]+"-table' class='row'>"+chkcolumas[c]+"</div>";
								col1 += "<div id='col1-"+chkcolumas[c]+"-pie' class='row'>"+chkcolumas[c]+"</div>";
								//col1 += "<div id='col1-"+chkcolumas[c]+"-bar' class='row'>"+chkcolumas[c]+"</div>";
								col1 += "</div>";
								//col2 .= "<div id='col2-"+chkcolumas[c]+"' class='row'>"+chkcolumas[c]+"</div>";
								
								}
								
											
						$("#comparar-col").html(col1);			
						for(c in chkcolumas)	{								
								obdata = source2object(source,['dpa_descan'],[chkcolumas[c]],[ciudad1,ciudad2,ciudad3]);	
								  			  		
		  						gdata2chart("col1-"+chkcolumas[c]+"-table",obdata['gdatat'],"table");
		  						gdata2chart("col1-"+chkcolumas[c]+"-pie",obdata['gdatat'],"piechart");
		  						}
								
						/*GRAFICA BARRAS*/						
						obdata = source2object(source,['dpa_descan'],chkcolumas,[ciudad1,ciudad2,ciudad3]);
						gdata2chart("comparar-table",obdata['gdata'],"table");
						gdata2chart("comparar-bar",obdata['gdata'],"barchart");	
						
						//GENERA ARRDESCARGA
						ciudad4 = $("#sel-ciudad4").val();						
						obdata = source2object(source,['dpa_descan'],chkcolumas,[ciudad4]);
						gdata2chart("descarga-table",obdata['gdata'],"table");	
						console.log(obdata);							
						$("#fullarray").val( JSON.stringify( obdata['fullarray'] ) );	
						
						shpuri = "http://flacso.seyanim.com:8080/geoserver/indurb/wfs?typename=typename=indurb:circuitos6&layers=indurb:circuitos7&projection=EPSG:32717&service=wfs&version=1.1.0&request=GetFeature&srs=EPSG:32717&outputformat=shape-zip&PROPERTYNAME=dpa_descan&PROPERTYNAME=geometry&cql_filter=(dpa_descan='"+ciudad4+"')";
						$("#shp-download").attr("href",shpuri);		
						};		    
		     	
		    $("#comparativa .btn-comparar").on("click",function (e) {		     	
		     	if( $(this).hasClass('active') ){
		     		$(this).removeClass('active');
		     		}
		     	else{
		     		$(this).addClass('active');
		     		}
		     		
		     	comparar();
		     	});
		     	
		     $("#sel-ciudad1,#sel-ciudad2,#sel-ciudad3,#sel-ciudad4").on("change",function () {
		     		comparar();
		     		});
	  				  						
			source.refresh();				
		  }		  		    
		});
      
      	// Popup overlay
	var popup = new ol.Overlay.Popup (
		{	popupClass: "default", //"tooltips", "warning" "black" "default", "tips", "shadow",
			closeBox: true,
			onclose: function(){ console.log("You close the box"); },
			positioning: "auto",
			autoPan: true,
			autoPanAnimation: { duration: 100 }
		});
      
         
          
            
      var clusterSource = new ol.source.Cluster({
			  distance: 80,
			  source: puntos.getSource()
			});			
     
	  	   
     
	  featureStyle = function(feature, resolution) {
		    var size = feature.get('features').length;		   
		    var features =  feature.get('features');
		    //console.log(features);
		    var sumpoblacion = 0;
		    var max = 0;
		    //console.log( features[0].getProperties() );
		    	
			 for(i=0;i<size;i++){
			 	campo = $(".btn-propiedad.active").val();				 	
			 	if(!campo){campo = 'poblacion_total';}		 			 	
			 	var poblacion = parseInt( features[i].getProperties()[campo]);
			 	sumpoblacion += poblacion;		 	
			 	maximus = Math.max(  maximus , sumpoblacion );
			 	}		    
		    //var style = styleCache[sumpoblacion];
		   //if (!style) {
		        var styleob = {};

					//console.log(feature);
				  (feature.selected) ?	col="#f00" : col="#3399CC" ;
				  			        
		        
		        styleob['image'] = new ol.style.Circle({
		          radius: 35*(0.5+0.5*sumpoblacion/maximus),
		          stroke: new ol.style.Stroke({
		            color: '#fff'
		          }),
		          fill: new ol.style.Fill({
		            color: col
		          })
		        });
		        
		        
		        styleob['text'] = new ol.style.Text({
		          text: sumpoblacion.toString(),
		          fill: new ol.style.Fill({
		            color: '#fff'
		          })
		        });
		     
		     var style = [new ol.style.Style(styleob)];
		    return style;
		  } 
		  
	     
      
     /*var clusters = new ol.layer.Vector({
		  source: clusterSource,
		  style: featureStyle
		});*/
		
	var clusters = new ol.layer.AnimatedCluster(
		{	name: 'Cluster',
			source: clusterSource,
			animationDuration: 700,
			// Cluster style
			style: featureStyle
		}); 
      
  	clusters.on('change', function(evt){
  		  //console.log(evt);	
		  //var source = evt.target;	
		    
		  //if (source.getState() === 'ready' && !changed) {
		  		  				  						
							
		  //}		  		    
		});
		
	
	
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
	
		
		var zoomchange = new ol.interaction.DragZoom();
						
		var select = new ol.interaction.Select({});		
				
		select.on('select', function(evt){
			    var selected = evt.selected;
			    var deselected = evt.deselected;
			    
				 deselected.forEach(function(feature){
			        		popup.hide(); 
			            //console.info(feature);
							feature['selected']=false;			            
			            feature.setStyle(featureStyle(feature,1));
			        });			    
			    
			    if (selected.length) {
			        selected.forEach(function(feature){
			            feature['selected']=true;
			            feature.setStyle(featureStyle(feature,1));
							var content = "<div id='popup'></div>";
							//content += "<img src='"+feature.get("img")+"'/>";
							//content += feature.get("text");
							campo = $(".btn-propiedad.active").val();				 	
			 				if(!campo){campo = 'poblacion_total';}
							var obdata = source2object(feature,['des_circ'],['poblacion_total',campo]);
		  					//console.log(obdata);	
		  					popup.show(feature.getGeometry().getCoordinates(), content);	
		  					
		  					if( feature.get('features').length>3 ){	  		
		  						gdata2chart("popup",obdata['gdatat'],"piechart");
		  					}
		  					else{
		  						gdata2chart("popup",obdata['gdata'],"barchart");
		  						}							
							
							
									            
			            
			            
			        });
			    }
			     //else {
			        
			    //}
			});    
			
        
    var map = new ol.Map({
        target: 'map',
        layers: [raster,limite_ciudad,limite_circuitos,clusters],
        view: new ol.View({
          center: ol.proj.fromLonLat([-78.25, -1.8]),
          zoom: 7,
          maxZoom:16,
          minZoom:6
          
        }),
        overlays: [popup]
      });
      // map.addInteraction(draw);
      map.addInteraction(select);
      
      map.getView().on('propertychange',function (e) {  
      	//console.log(e.key);    	
      	if(e.key=="resolution"){
      		//refreshStyles();
      		maximus=0;	
      		select.getFeatures().clear();
      		popup.hide(); 
      		console.log("map propertychange");
      		}
      });
  

	
     });//END DOCUMENT READY 
  