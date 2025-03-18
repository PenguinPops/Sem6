#!/bin/bash
echo "Compiling...";
javac -cp .:lib/orgjson.jar model/City.java service/CityService.java view/CityView.java Main2.java
echo "Running...";
java -cp .:lib/orgjson.jar Main2.java