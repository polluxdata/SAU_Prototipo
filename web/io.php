<?php
error_reporting(E_ERROR);
if (!defined('PHPEXCEL_ROOT')) {
    /**
     * @ignore
     */
    define('PHPEXCEL_ROOT', dirname(__FILE__) . '/PHPExcel/Classes/'); 
    //echo    PHPEXCEL_ROOT;
    require(PHPEXCEL_ROOT . 'PHPExcel/Autoloader.php');
    //die();
}


$io = new io();

if( isset( $_REQUEST['fullarray'] ) ){
	$io->arr2xls( json_decode($_REQUEST['fullarray'],true) );
}


class io{	
		
	public function io(){
		
	}


	public function arr2xls($arr) {
			$name = key($arr);
			$arr = $arr[key($arr)];
		
			header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
			header("Content-type:   application/x-msexcel; charset=utf-8");
			header("Content-Disposition: attachment; filename=".$name.".xls"); 
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
			header("Cache-Control: private",false);
			
			
			$file_chipsnc = new PHPExcel();
			$file_chipsnc->getProperties()
				   ->setCreator('Cite')
				   ->setTitle('Datos')
				   ->setLastModifiedBy('Tuenti')
				   ->setDescription('Datos')
				   ->setSubject('')
				   ->setKeywords('')
				   ->setCategory('')  ;
			$sheet = $file_chipsnc->getSheet(0);
			$sheet->setTitle($name);			
				
						
			$arrt= array();
			foreach ($arr as $key => $value) {
			    foreach($value as $key2 => $value2) {
			        $arrt[$key2][$key] = $value2;
			    }
			}
			
			//print_r($arr[key($arr)]);
			
							
			
			$sheet->fromArray( array_keys( $arr ) , ' ', 'A1');	
			$sheet->fromArray($arrt, ' ', 'A2');
			//$sheet->fromArray( Array( "$query" ), ' ', 'A1');
			$writer = \PHPExcel_IOFactory::createWriter( $file_chipsnc, 'Excel2007'); 
			//$sheet->getStyle('A:B')->getNumberFormat()->setFormatCode('0000'); 
			//$sheet->getStyle('C')->getAlignment()->setWrapText(true);          
			//$writer->setIncludeCharts(true);
			$filename=date('YmdHis')."cnc";
			//$writer->save("docs/{$filename}.xlsx");
			$writer->save('php://output');
			//$ret["chipsnc"] = "docs/{$filename}.xlsx";			
			
							
			
			
			
		return $ret;	
		}	
	}