#!/bin/bash

echo '-----------'
echo 'CREATE DOWNLOADS DIRECTORY'
echo '-----------'
# If downloads directory does not already exist, create.
if [ ! -d 'downloads' ]; then
    mkdir downloads
fi

echo '-----------'
echo 'DOWNLOAD UNEMPLOYMENT DATA'
echo '-----------'
wget --directory-prefix=downloads 'http://www.ers.usda.gov/dataFiles/CountyLevelDatasets/Unemployment.xls'

echo '-----------'
echo 'CONVERT EXCEL FILE TO CSV'
echo '-----------'
in2csv downloads/Unemployment.xls > unemployment-headers.csv

echo '-----------'
echo 'REMOVE HEADER CHATTER'
echo '-----------'
cat unemployment-headers.csv | sed "1,6d" >unemployment-no-headers.csv

echo '-----------'
echo 'CLEAN DATA WITH PYTHON SCRIPT'
echo '-----------'
python clean.py

echo '-----------'
echo 'GENERATE TOPOJSON WITH MAKE'
echo '-----------'
cd ..
make bin/counties.json

echo '-----------'
echo 'CHECK THE BIN DIRECTORY FOR COUNTIES.JSON'
echo '-----------'