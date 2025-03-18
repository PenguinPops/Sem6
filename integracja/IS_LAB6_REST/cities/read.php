<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/Database.php';
include_once '../class/Cities.php';

$database = new Database();
$db = $database->getConnection();
$cities = new Cities($db);

$requestMethod = $_SERVER["REQUEST_METHOD"];

switch ($requestMethod) {
    case 'GET':
        $cities->id = (isset($_GET['id']) && $_GET['id']) ? $_GET['id'] : '0';
        $result = $cities->read();
        if ($result->num_rows > 0) {
            $cityRecords = array();
            $cityRecords["cities"] = array();
            while ($city = $result->fetch_assoc()) {
                extract($city);
                $cityDetails = array(
                    "ID" => $ID,
                    "Name" => $Name,
                    "CountryCode" => $CountryCode,
                    "District" => $District,
                    "Population" => $Population
                );
                array_push($cityRecords["cities"], $cityDetails);
            }
            http_response_code(200);
            echo json_encode($cityRecords);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No item found."));
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));

        if (!$data) {
            http_response_code(400);
            echo json_encode(["message" => "Invalid JSON data."]);
            exit();
        }
        
        error_log("Received data: " . json_encode($data));
        
        $cities->name = htmlspecialchars(strip_tags($data->Name ?? ''));
        $cities->countryCode = htmlspecialchars(strip_tags($data->CountryCode ?? ''));
        $cities->district = htmlspecialchars(strip_tags($data->District ?? ''));
        $cities->population = isset($data->Population) ? (int) $data->Population : 0;
        
        if ($cities->create()) {
            http_response_code(201);
            echo json_encode(["message" => "City was created."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to create city."]);
        }
        
        break;

        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));
        
            if (!$data) {
                http_response_code(400);
                echo json_encode(["message" => "Invalid JSON data."]);
                exit();
            }
        
            if (!isset($data->ID) || empty($data->ID)) {
                http_response_code(400);
                echo json_encode(["message" => "ID is required."]);
                exit();
            }
        
            $cities->id = $data->ID;
            $cities->name = htmlspecialchars(strip_tags($data->Name ?? ''));
            $cities->countryCode = htmlspecialchars(strip_tags($data->CountryCode ?? ''));
            $cities->district = htmlspecialchars(strip_tags($data->District ?? ''));
            $cities->population = isset($data->Population) ? (int) $data->Population : 0;
        
            if ($cities->update()) {
                http_response_code(200);
                echo json_encode(["message" => "City was updated."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Unable to update city."]);
            }
            break;
        
        case 'DELETE':
            $data = json_decode(file_get_contents("php://input"));
        
            if (!$data) {
                http_response_code(400);
                echo json_encode(["message" => "Invalid JSON data."]);
                exit();
            }
        
            if (!isset($data->ID) || empty($data->ID)) {
                http_response_code(400);
                echo json_encode(["message" => "ID is required."]);
                exit();
            }
        
            $cities->id = $data->ID;
        
            if ($cities->delete()) {
                http_response_code(200);
                echo json_encode(["message" => "City was deleted."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Unable to delete city."]);
            }
            break;
        

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}

$db->close();