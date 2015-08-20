d3-mapbox-template
===========================
A simple D3-Mapbox choropleth map that uses D3 transitions to toggle between a D3 map view and a web tile map view.

## Dependencies
This template uses gulp and browserify as a project scaffolding tool. To use it, you'll need node and gulp installed.

To install node with homebrew:
````
brew install node
````
To install gulp globally:
````
npm install -g gulp
````

## Installing and using this repo
To install project dependencies in package.json:
````
npm install
````

To install additional dependencies and devDependencies:
````
npm install <PKGNAME> --save
````
````
npm install <PKGNAME> --save-dev
````

To run gulp:
````
gulp
````
The default `gulp` command launches watchify to monitor changes in src, browserify to compile bundled.js in build & a server that refreshes automatically.

To minify files for production:
````
gulp build
````
The `gulp build` command compresses generated js/css. Must have run the default `gulp` command at least once.

## A note on the data

After some time spent hunting for a data set that lends itself well to chloropleth mapping, I found unemployment rates for 2013 at the county level [here](http://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx).

* **Step One**: For blank values, enter -99.	
* **Step Two**: Convert excel file to csv. `in2csv Unemployment.xls > unemployment-headers.csv`
* **Step Three**: Remove header chatter from file so the first row in the csv is column names. `cat unemployment-headers.csv | sed "1,6d" >unemployment-no-headers.csv`
* **Step Four**: Identify data points and execute python script.
* **Step Five**: Use makefile to generate topojson.
