#!/bin/bash
echo "Compiling...";
javac -cp .:lib/orgjson.jar Main.java
echo "Running...";
java -cp .:lib/orgjson.jar Main.java