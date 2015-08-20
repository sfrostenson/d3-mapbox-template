d3-mapbox-template
===========================
A simple D3-Mapbox choropleth map that uses D3 transitions to toggle between a D3 map view and a web tile map view on zoom.

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

## About the data

After some time spent hunting for a data set that lends itself well to chloropleth mapping, I found unemployment rates for 2013 at the county level [here](http://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx).

The data is already processed for you, but if you're interested in the process of downloading, cleaning and joining the data to a county json file, run `bash process-data.sh` in the bin directory. This script will run some batch processing tools (csvkit, ogr2ogr) in addition to a python script for slicing and cleaning our data and Make for generating our counties.json file, which we use to build our frontend presentation.