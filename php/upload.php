<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE');
header('Access-Control-Allow-Headers: Token, content-type');

include("login.php");
	
	
	$method = $_SERVER['REQUEST_METHOD'];
	
	if($method == "POST")
	{
		if(verifyAuth())
		{
			$data = file_get_contents($_FILES['recipe_image']['tmp_name']); 
			$name = $_FILES['recipe_image']['name'];
			$filename = "../uploads/" . $name;
			file_put_contents ($filename , $data);					
		}
			
	}
	

?>