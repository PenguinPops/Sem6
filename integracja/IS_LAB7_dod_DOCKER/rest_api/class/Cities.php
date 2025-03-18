<?php

class Cities
{
    private $citiesTable = "city";
    public $id;
    public $name;
    public $countryCode;
    public $district;
    public $population;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    function read()
    {
        if ($this->id) {
            $stmt = $this->conn->prepare("SELECT * FROM " . $this->citiesTable . " WHERE ID = ?");
            $stmt->bind_param("i", $this->id);
        } else {
            $stmt = $this->conn->prepare("SELECT * FROM " . $this->citiesTable);
        }
        $stmt->execute();
        $result = $stmt->get_result();
        return $result;
    }

    function create()
    {
        $stmt = $this->conn->prepare("INSERT INTO " . $this->citiesTable . " (Name, CountryCode, District, Population) VALUES (?, ?, ?, ?)");
        
        if (!$stmt) {
            error_log("SQL Prepare Error: " . $this->conn->error);
            return false;
        }
    
        $stmt->bind_param("sssi", $this->name, $this->countryCode, $this->district, $this->population);
        
        if (!$stmt->execute()) {
            error_log("MySQL Execute Error: " . $stmt->error);
            return false;
        }
    
        return true;
    }
    

function update() {
    if (empty($this->id)) {
        error_log("ID is missing for update.");
        return false; 
    }

    $stmt = $this->conn->prepare("UPDATE " . $this->citiesTable . " SET Name = ?, CountryCode = ?, District = ?, Population = ? WHERE ID = ?");
    if (!$stmt) {
        error_log("SQL Prepare Error: " . $this->conn->error);
        return false;
    }

    $stmt->bind_param("sssii", $this->name, $this->countryCode, $this->district, $this->population, $this->id);
    
    if (!$stmt->execute()) {
        error_log("MySQL Execute Error: " . $stmt->error);
        return false;
    }

    return true;
}

function delete() {
    if (empty($this->id)) {
        error_log("ID is missing for delete.");
        return false; 
    }

    $stmt = $this->conn->prepare("DELETE FROM " . $this->citiesTable . " WHERE ID = ?");
    if (!$stmt) {
        error_log("SQL Prepare Error: " . $this->conn->error);
        return false;
    }

    $stmt->bind_param("i", $this->id);
    
    if (!$stmt->execute()) {
        error_log("MySQL Execute Error: " . $stmt->error);
        return false;
    }

    return true;
}

}