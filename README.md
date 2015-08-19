d3-mapbox-map-transition-us
===========================

<strong>DATA PROCESSING</strong>

After some time spent hunting for a data set that lends itself well to chloropleth mapping, I found unemployment rates for 2013 at the county level [here](http://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx).
<ul>
<li><strong>Step One</strong>: For blank values, enter -99.	
<li><strong>Step Two</strong>: Convert excel file to csv. <code>in2csv Unemployment.xls > unemployment-headers.csv</code></li>
<li><strong>Step Three</strong>: Remove header chatter from file so the first row in the csv is column names. <code>cat unemployment-headers.csv | sed "1,6d" >unemployment-no-headers.csv</code></li>
<li><strong>Step Four</strong>: Identify data points and execute python script.</li>
<li><strong>Step Five</strong>: Use makefile to generate topojson</li>
</ul>