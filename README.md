d3-mapbox-map-transition-us
===========================

TO-DO
1. Build custom tooltip for mapbox view.
	-remove x button
	-offset
	-fix issue of where popup occurs for non-selected geojson states.
2. Fix the AK projection issue
	-hardcode lat/lon if AK clicked	
3. Add leaflet hash
	  // add hash to url
  	 var hash = new L.Hash(mbMap);
4. Update basemap with USAT styles. Remove USAT specific styling from repo and move to Gannett repo.
5. Refigure position of reset button or build out on zoom buttons.
6. Add legend



LATER
1. make map responsive
2. add link to example in Tech Specs of healthcare-deductibles-map-2014

<strong>DATA PROCESSING</strong>

After some time spent hunting for a data set that lends itself well to chloropleth mapping, I found unemployment rates for 2013 at the county level [here](http://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx).
<ul>
<li><strong>Step One</strong>: For blank values, enter -99.	
<li><strong>Step Two</strong>: Convert excel file to csv. <code>in2csv Unemployment.xls > unemployment-headers.csv</code></li>
<li><strong>Step Three</strong>: Remove header chatter from file so the first row in the csv is column names. <code>cat unemployment-headers.csv | sed "1,6d" >unemployment-no-headers.csv</code></li>
<li><strong>Step Four</strong>: Identify data points and execute python script.</li>
<li><strong>Step Five</strong>: Use makefile to generate topojson</li>
</ul>