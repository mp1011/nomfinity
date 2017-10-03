<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE');
header('Access-Control-Allow-Headers: Token, content-type');

	include("login.php");

	set_error_handler("customError");
	
	$method = $_SERVER['REQUEST_METHOD'];
	$id= getQueryParam('id');	
	$type = getQueryParam('type');	
	$name = getQueryParam('name');
	$search = getQueryParam('search');
	$sort= getQueryParam('sort');
	
	if($type == null)
	{
		die("Invalid type");
	}		
		
	if($method == "POST")
	{						
		$data = file_get_contents('php://input');	
		uploadData($type, $id, $name, $data, $searchdata);		
	}
	else if($method == "DELETE")	
	{
		delete($type,$id);	
	}
	else if($method == "GET")	
	{
		echo getData($type, $id, $name, $data, $search, $sort);	
	}
	
	function getQueryParam($key)
	{
		try
		{
			return $_GET[$key];
		}
		catch (Exception $e) 
		{
		    return null;
		}
	}
	
	function getDBConn()
	{
		$conn = new mysqli("imcgrunt.asoshared.com","nomfinit_eats","Ydmbwnyd.ly5654","nomfinit_eats");		
		return $conn;
	}
	
	function getData($type, $id, $search, $sort)
	{	
		$sql = "SELECT ID, Name, Updated, Data FROM Records WHERE Type = ? ";
		
		if(!isNullOrEmptyString($id))
		{
			$sql = $sql . " AND ID = ? ";
		}		
		else if(!isNullOrEmptyString($search))
		{
			$sql = $sql . " AND SearchData LIKE $";
		}

		if(!isNullOrEmptyString($sort))
		{
			$sort = "UPDATED DESC";
		}
		
		$sql = $sql . " ORDER BY ?";
		
		
		$conn = getDBConn();						
		$query= $conn->prepare($sql);
		
		$query->bind_param('s', $type);	
		
		// type, id|search, sort
		if(!isNullOrEmptyString($id))
		{
			$query->bind_param('sis', $type, $id, $sort);			
		}		
		else if(!isNullOrEmptyString($search))
		{
			$query->bind_param('sss', $type, $search, $sort);			
		}
		else 
		{
			$query->bind_param('ss', $type, $sort);	
		}
		
		if(!isNullOrEmptyString($id))
		{
			$query->bind_result($id, $name, $updated, $data);	
			$query->execute();				
			$query->fetch();
			$conn->close();
			return '{"ID": ' . $id. ', "Name": "' . $name . '", "Updated": "' . $updated . '", "Data": ' . $data . '}';
		}
		else 
		{				
			$out = array();
		
			while($arr = $query->fetch_array(MYSQLI_NUM))
			{				
				array_push($out, '{"ID": ' . $arr[0] . ', "Name": "' . $arr[1] . '", "Updated": "' . $arr[2]. '", "Data": ' . $arr[3] . '}');
			}
				
			$query->free();
			$conn->close();
				
			$json = "[" . array_pop($out);
		
			foreach($out as $o)
			{
				$json =  $json . ',' . $o;
			}
				
			return $json . "]" ;					
		}
					
	}
	
	function IsNullOrEmptyString($question)
	{
		return (!isset($question) || trim($question)==='');	
	}

	function uploadData($type, $id, $name, $data, $search)
	{
	
		if(verifyAuth())
		{
			$conn = getDBConn();		
				
			if($id > 0)
			{				
				$query = "UPDATE Records Set Name=?, Updated=CURRENT_TIMESTAMP, Data=?, SearchData=? WHERE ID=?";
				$statement=$conn->prepare($query);					
				$statement->bind_param('sssi', $name, $data, $search, $id);		
				$statement->execute();				
							
			}
			else 
			{
					
				$query = "INSERT INTO Records(Type,Data,SearchData,Name,Updated) VALUES(?,?,?,?,CURRENT_TIMESTAMP)";	
				$statement=$conn->prepare($query);
				$statement->bind_param('ssss', $type, $data, $searchdata, $name);		
				$statement->execute();	
				$id =mysqli_insert_id($conn);		
				
			}

			echo $id;
			$conn->close();	
				
		}
		else
		{	
			return401();
		};
	
	}
	
	function delete($type, $id)
	{
		
		if(verifyAuth())
		{
			$conn = getDBConn();		
				
			if($id > 0)
			{
				$query = "DELETE FROM Records WHERE Type=? AND ID=?";
				$statement=$conn->prepare($query);
				$statement->bind_param('si', $type, $id);					
				$statement->execute();
			}
			
			echo "Deleted " . $id;
			$conn->close();	
				
		}
		else
		{	
			return401();
		};
	
	}
	
	function customError($errno, $errstr)
	{
	  	echo "Error: " . $errstr;
	}

?>