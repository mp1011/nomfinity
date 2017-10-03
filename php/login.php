<?php 
	
	function verifyAuth()
	{
		$authToken = $_SERVER['HTTP_TOKEN'];	
		$verifyAuthURL = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" . $authToken;
		$response = file_get_contents($verifyAuthURL );

		if(contains($response, "iss") && contains($response,"azp"))
		{
			return true;
		}
		else		
		{
			return false;
		}
		
	}
	
	function contains($string, $search)
	{
		if (strpos($string, $search) !== false)
			return true;
		else
			return false;
	}	

	function return401()
	{	
		echo "unauthorized: ";
		header('HTTP/1.1 401 Unauthorized', true, 401);			
	}

?> 
