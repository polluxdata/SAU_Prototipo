function ws(data){
		var ret
		$.ajax({	url: "io.php?nonce="+Math.random() ,type: 'POST',async: false,cache: false,data: data, 
        			success: function(evento){	
        				ret = evento		
        				}});
      //console.log(ret);
      return JSON.parse(ret);
      //return ret;
		}

function source2object(source,arrx,arry,filter){		
		
			/*{
    cols: [{id: 'task', label: 'Task', type: 'string'},
           {id: 'hours', label: 'Hours per Day', type: 'number'}],
    rows: [{c:[{v: 'Work'}, {v: 11}]},
           {c:[{v: 'Eat'}, {v: 2}]},
           {c:[{v: 'Commute'}, {v: 2}]},
           {c:[{v: 'Watch TV'}, {v:2}]},
           {c:[{v: 'Sleep'}, {v:7, f:'7.000'}]}]
    }*/	

		if(!filter || filter==null ){filter=[];} 	
    	
			try {
				    var features = source.getFeatures();
				}
				catch(err) {
					 //console.log(source);
				    var features =  source.get('features');	
				    /*if(features.length>3){
				    	features=[source];
				    	}*/
				}  
						
			var keys = features[0].getKeys();
			
			
			arr={};	//arreglo de propiedades agrupadas segun arrx, con valores de arry				
			for(i=0;i<features.length;i++){
				var properties = features[i].getProperties();						 	
			 	for(j=0;j<arrx.length;j++){			 		
			 		var llave = properties[ arrx[j] ];			 		
			 		if( filter.indexOf(llave) < 0 && filter.length!=0 ){continue;}			 		
			 		if( arr[ llave ]==null ){  arr[ llave ]={};  }			 		
			 		for(k=0;k<arry.length;k++){						 
			 			if( arr[ llave ][ arry[k] ]==null ){  arr[ llave ][ arry[k] ]=0;  }
			 			arr[ llave ][ arry[k] ] += parseFloat(properties[ arry[k] ]);
			 			}
			 		}			 	
			 	}
			 	
			fullarr={};	//ARRAY PARA LA DESCARGA DE XLS	
			for(i=0;i<features.length;i++){
				var properties = features[i].getProperties();						 	
			 	for(j=0;j<arrx.length;j++){			 		
			 		var llave = properties[ arrx[j] ];			 		
			 		if( filter.indexOf(llave) < 0 && filter.length!=0 ){continue;}			 		
			 		if( fullarr[ llave ]==null ){  fullarr[ llave ]={};  }

					if( fullarr[ llave ][ 'Circuito' ]==null ){  fullarr[ llave ][ 'Circuito' ]=[];  }			 		
			 		fullarr[ llave ][ 'Circuito' ].push(  properties['des_circ']  );			 		
			 		for(k=0;k<arry.length;k++){
			 			//columnas[arry[k]].indicador						 
			 			if( fullarr[ llave ][ columnas[arry[k]].indicador ]==null ){  fullarr[ llave ][ columnas[arry[k]].indicador ]=[];  }
			 			//var ob = {};			 			
			 			//ob[arry[k]]=properties[arry[k]];			 			
			 			fullarr[ llave ][ columnas[arry[k]].indicador ].push( properties[arry[k]] );
			 			}
			 		}			 	
			 	}
			
			
			cols=[];	
			cols.push( {'id':'','label' :  columnas[arrx[0]].indicador  ,'pattern':'', 'type' : 'string'} );
			
			for(i=0;i<arry.length;i++){				
				cols.push( {'id':'','label' :  columnas[arry[i]].indicador  ,'pattern':'', 'type' : 'number'} );	
				}
			rows=[];
			for(a in arr){
				var temprow = {c:[]};
				if(columnas[a]){indicador=columnas[a].indicador;}else{indicador=a;}
				temprow['c'].push({'v' : indicador , 'f':null })
				for(propiedad in arry ){
			 			var valor = arr[a][arry[propiedad]];			 					 					 			
			 			temprow['c'].push({'v' : valor , 'f':null })
			 		}
			 	rows.push(temprow);
				}		
			gdatat = {cols:cols,rows:rows};
					 	
			cols=[];
			cols.push( {'id':'','label' :  'propiedad'  ,'pattern':'', 'type' : 'string'} );	
			var keys = [];
			for(var k in arr) keys.push(k);			
			 		
			for(i=0;i<keys.length;i++){				
				if( isNumber( arr[keys[i]][0] ) ) { type = 'number' } else { type = 'string' };							 	
			 	cols.push( {'id':'','label' :  keys[i]  ,'pattern':'', 'type' : 'number'} );			 	
			 	}				
			rows=[];	
					
				var keysValores = [];				
				for(var k in arr[keys[0]]) keysValores.push(k);				
				for(i=0;i<keysValores.length;i++){
					//console.log(keysValores[i]);	
					var temprow = {c:[]};
					temprow['c'].push( {'v' : columnas[keysValores[i]].indicador , 'f':null } );					 	
			 		for(j=0;j<keys.length;j++){
			 			var valor = arr[ keys[j] ][ keysValores[i] ];		 			
			 			temprow['c'].push({'v' : valor , 'f':null })
			 		}
			 	//console.log(temprow);
			 	rows.push(temprow);
			 	}			 	
			gdata = {cols:cols,rows:rows};			
				 	
			obdata = {array:arr,fullarray:fullarr,gdata:gdata,gdatat:gdatat};		  
			return obdata;
		  }

function source2columna(source,col){	    		
			try {
				    var features = source.getFeatures();
				}
				catch(err) {
				    var features =  feature.get('features');	
				}
			var arr={};	
			for(i=0;i<features.length;i++){
				//var temprow = {c:[]};			 	
			 			var properties = features[i].getProperties();
			 			arr[properties[col]] = columnas[col];	 		
			 	
			 	}
				
			var keys = [];
			for(var k in arr) keys.push(k);
			
			var ret = [];
			keys.sort();
						
			for( var k in keys ){				
				ret[keys[k]]=arr[keys[k]];
				}			 	
			 	
			return ret; 	
			 		
		}
		
function arr2gdata(arr){	
		
			/*{
    cols: [{id: 'task', label: 'Task', type: 'string'},
           {id: 'hours', label: 'Hours per Day', type: 'number'}],
    rows: [{c:[{v: 'Work'}, {v: 11}]},
           {c:[{v: 'Eat'}, {v: 2}]},
           {c:[{v: 'Commute'}, {v: 2}]},
           {c:[{v: 'Watch TV'}, {v:2}]},
           {c:[{v: 'Sleep'}, {v:7, f:'7.000'}]}]
    }*/	
    		
			var keys = [];
			for(var k in arr[0]) keys.push(k);
			//console.log(keys);			
									
			cols=[];			
			for(i=0;i<keys.length;i++){
				//var properties = arr[0].getProperties(); 
				//console.log( properties[keys[i]] );
				if( isNumber( arr[0][keys[i]] ) ) { type = 'number' } else { type = 'string' };							 	
			 	cols.push( {'id':'','label' :  keys[i]  ,'pattern':'', 'type' : type} );
			 	
			 	}				
			rows=[];
			for(i=0;i<arr.length;i++){
				var temprow = {c:[]};		 	
			 	for(j=0;j<keys.length;j++){			 			
			 			temprow['c'].push({'v' : arr[i][keys[j]] , 'f':null })
			 		}
			 	//console.log(temprow);
			 	rows.push(temprow);
			 	}	
			 	
			gdata = {cols:cols,rows:rows};
			
			console.log(gdata);		  
			  
			return gdata;
		  }

function source2gdata(source){	
		
			/*{
    cols: [{id: 'task', label: 'Task', type: 'string'},
           {id: 'hours', label: 'Hours per Day', type: 'number'}],
    rows: [{c:[{v: 'Work'}, {v: 11}]},
           {c:[{v: 'Eat'}, {v: 2}]},
           {c:[{v: 'Commute'}, {v: 2}]},
           {c:[{v: 'Watch TV'}, {v:2}]},
           {c:[{v: 'Sleep'}, {v:7, f:'7.000'}]}]
    }*/	
    		
			try {
				    var features = source.getFeatures();
				}
				catch(err) {
				    var features =  feature.get('features');	
				}
													
			var keys = features[0].getKeys();			
									
			cols=[];			
			for(i=0;i<keys.length;i++){
				var properties = features[0].getProperties(); 
				console.log( properties[keys[i]] );
				if( isNumber( properties[keys[i]] ) ) { type = 'number' } else { type = 'string' };							 	
			 	cols.push( {'id':'','label' :  keys[i]  ,'pattern':'', 'type' : type} );
			 	
			 	}				
			rows=[];
			for(i=0;i<features.length;i++){	
				var temprow = {c:[]};		 	
			 	for(j=0;j<keys.length;j++){
			 			var properties = features[i].getProperties();
			 			temprow['c'].push({'v' : properties[keys[j]] , 'f':null })
			 		}
			 	//console.log(temprow);
			 	rows.push(temprow);
			 	}	
			 	
			gdata = {cols:cols,rows:rows};
			
			//console.log(gdata);		  
			  
			return gdata;
		  }
		  
		function gdata2chart(container,data,tipo){	

      var data = new google.visualization.DataTable(data);
      var dashboard = new google.visualization.Dashboard(document.getElementById(container));

		//console.log(data);
      // Instantiate and draw our chart, passing in some options.
	      if(tipo=="piechart"){
				var chart = new google.visualization.PieChart(document.getElementById(container));
				}
				 else if (tipo=="linechart") {
				var chart = new google.visualization.LineChart(document.getElementById(container));
				}
			      else if (tipo=="barchart" ||  tipo=="sortbarchart") {
				var chart = new google.visualization.BarChart(document.getElementById(container));
				}
				
			      else if (tipo=="areachart") {
				var chart = new google.visualization.AreaChart(document.getElementById(container));	
				}
					else if (tipo=="treemap") {
				var chart = new google.visualization.TreeMap(document.getElementById(container));	
				}
					else if (tipo=="chartwrapper") {
					var chart = new google.visualization.ChartWrapper( {chartType:'Table',containerId: 'chart_usuarios',
						options: {  width: "100%" ,allowHtml:true    } });
						//var control = new google.visualization.ControlWrapper({});
					var control = new google.visualization.ControlWrapper({controlType: 'StringFilter',containerId: 'filter_usuarios',
        				options: {  filterColumnIndex: 0     }    });
        			dashboard.bind( control,chart );	
				}        
			      else{
				var chart = new google.visualization.Table(document.getElementById(container) );
			      }
			     		 
			  if (tipo=="chartwrapper") {			  		
			  		dashboard.draw(data);			  
			  		}
			  else if (tipo=="piechart") {			  		
			  		chart.draw(data,{width: '100%' ,height:200,  allowHtml:true});  
			  		}
			  else if (tipo=="barchart") {			  		
			  		chart.draw(data,{width: '100%' ,height:'100%',  allowHtml:true, chartArea: {  width: "50%", height: "70%" },vAxis : { textPosition : 'out' }  });  
			  		}
			  else if (tipo=="treemap") {			  		
			  		chart.draw(data, {
				          minColor: '#f00',
				          midColor: '#ddd',
				          maxColor: '#0d0',
				          headerHeight: 15,
				          fontColor: 'black',
				          showScale: true
				        });	  
			  		}
			   else if (tipo=="sorttable") {	
			   	data.sort({column: 1, desc: true});		  		
			  		chart.draw(data,{width: '100%',height:'auto' ,chartArea: {  width: "50%", height: "70%" }, allowHtml:true}); 					 			  		
			  		}
			  	else if (tipo=="sortbarchart") {
			  	 	data.sort({column: 1, desc: true});		
					chart.draw(data,{width: '100%' ,height:'100%',  allowHtml:true,hAxis:{},vAxis:{textPosition : 'out'}, chartArea: {  width: "50%", height: "95%" }  });  
				}	
			  		
			  else{			  		
			  		chart.draw(data,{width: '100%',height:'auto' ,chartArea: {  width: "50%", height: "70%" }, allowHtml:true});
			  		}
			 		
			 
			 	
			 		
			 		
	    
	    	var ret = [];
			ret["data"] = data
			ret["chart"] = chart;  
			ret["dashboard"] = dashboard;   
	    	return ret;
			}
		  
			function isNumber(n) {
			  return !isNaN(parseFloat(n)) && isFinite(n);
			}