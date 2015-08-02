// Call external dependencies
'use strict';

var $ = require('jQuery');
var d3 = require('d3');
// var queue = require('queue-async');
var topojson = require('topojson');

//jquery global variables
var $mbMap = $('#mbMap').attr('style', 'visibility: hidden;');
var $reset = $('button[id=reset]');
var $d3Map = $('#d3Map');
var $mapTooltip = $('.map-tooltip');
// var $pop1 =       $('.popover');
// var $popTitle =   $('.popover-title');
// var $popContent = $('.popover-content');

// initialize mapbox map (outside logic to avoid duplicate initializations).
L.mapbox.accessToken = 'pk.eyJ1IjoiZ3JlYXRmYWxscyIsImEiOiJTRkozTnBzIn0.ok9JnUv5zXqrLT-WVPgYiQ';
var mbMap = L.mapbox.map('mbMap', 'examples.map-i86nkdio', {
  minZoom: 4,
  maxZoom: 8
});
// popup for state geojson featureLayer
var popup = L.popup();

// array for our state geojson featureLayer
var overlayLayers = [];

// d3 map parameters
var width = $d3Map.width();
var height = $d3Map.height();

var quantize = d3.scale.quantize()
    .domain([0.9, 9.9])
    .range(d3.range(5).map(function(i) { return 'q' + i + '-5'; }));
    // console.log(quantize.invertExtent('q0-5'));
    // console.log(quantize.invertExtent('q1-5'));
    // console.log(quantize.invertExtent('q2-5'));
    // console.log(quantize.invertExtent('q3-5'));
    // console.log(quantize.invertExtent('q4-5'));

var projection = d3.geo.albersUsa()
    .scale(width / 0.285 / Math.PI)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select('#d3Map').append('svg')
    .attr('width', width)
    .attr('height', height);

var g = svg.append('g')
    .attr('class', 'county-container');

// render maps
var countyBounds = [];

d3.json ('../Make/counties.json', function (error, us) {
  if (error) { return console.error(error); }

  countyBounds = topojson.feature(us, us.objects.counties).features;

  var counties = g.append('g')
        .attr('class', 'counties')
      .selectAll('path')
        .data(countyBounds)
      .enter().append('path')
        .attr('class', function (d) { return quantize(d.properties.r); })
        .attr('d', path)
        .on('mouseover', function (d) {
          d3.select(this)
          .style('stroke', '#fff')
          .style('stroke-width', '2.5px');
          fillTooltip(d);
        })
        .on('mouseout', function (d) {
          d3.select(this)
          .style('stroke', 'none');
          $mapTooltip.attr('style', 'visibility: hidden;');
        })
        .on('click', clicked);

  var borders = g.append('path')
      .datum(topojson.mesh(us, us.objects.counties, function (a, b) { return a.id / 1000 ^ b.id /1000; }))
      .attr('class', 'state-borders')
      .attr('d', path);

  var onResize = function() {

        var width = $d3Map.width();
        var height = $d3Map.height();
        // console.log(width, height);

        svg.attr('width', width)
          .attr('height', height);

        projection.scale(width / 0.285 / Math.PI)
          .translate([width / 2, height / 2]);

        path.projection(projection);
        counties.attr('d', path);
        borders.attr('d', path);
      };

  $(window).resize(debounce(onResize, 200, false));

  // onEachFeature: onEachFeature TO DO
  var usLayer = L.geoJson(countyBounds, { style: style }).addTo(mbMap);
  
});

// transition from d3 view to mapbox view on click
function clicked(d) {
  $d3Map.fadeOut(600);
  $mbMap.fadeIn(1000);
  var centroid = path.centroid(d);
  var x = centroid[0];
  var y = centroid[1];
  var zoom = 1;
  $reset.attr('style', 'visibility: visible;');
  $mbMap.attr('style', 'visibility: visible;');

  var stateBounds = getBounds(getState(d.properties.s));
  overlayLayers.push(stateBounds);
  mbMap.fitBounds(stateBounds.getBounds());

  g.transition()
      .duration(750)
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + zoom + ')translate(' + -x + ',' + -y + ')')
      .style('stroke-width', 1.5 / zoom + 'px');
}

// event listener to transition back to D3 map.
$reset.on('click', function (e) {
  $mbMap.fadeOut(600);
  $d3Map.fadeIn(1000);
  $reset.attr('style', 'visibility: hidden;');

// remove styling from state geojson featureLayer
  for(var i = 0, ii = overlayLayers.length; i < ii; ++i) {
    mbMap.removeLayer(overlayLayers[i]);
  }

  g.transition()
      .duration(750)
      .attr('transform', 'translate(0,0)scale(1)')
      .style('stroke-width', '1.5px');
});

// get bounds of clicked county geography
// create & style state featureLayer
function getBounds(geojson) {

  var style = {
    fillOpacity: 0.6,
    color: '#666',
    weight: 1.8,
    opacity: 1,
  };

  var featureLayer = L.geoJson(geojson, {
    style: style,
    onEachFeature: function(feature, layer) {
      layer.setStyle({
        fillColor: getColor(layer.feature.properties.r),
      });
    }
  }).on('mouseover', function (e) {
    var layer = e.layer;
    var properties = layer.feature.properties;
    layer.setStyle({
        weight: 4,
        opacity: 1,
        color: '#fff'
      });
    popup.setContent(
      '<h2>' + properties.c + ', ' + properties.s + '</h2>' +
      '<p>' + 'Unemployment Rate: ' + properties.r + '</p>'
      )
      .setLatLng(e.latlng)
      .openOn(mbMap);
  }).on('mouseout', function (e) {
    e.layer.setStyle(style);
  }).addTo(mbMap);
  
  return featureLayer;
}

// get all county bounds for a state, using properties.s
function getState(state) {
  var stateBounds = [];
  for(var i = 0, ii = countyBounds.length; i < ii; ++i) {
    if (countyBounds[i].properties.s === state) {
      stateBounds.push(countyBounds[i]);
    }
  }
  return {type: 'FeatureCollection', features: stateBounds};
}

// set color for mapbox quantile scale
function getColor(d) {
    if (d) {
    return d < 2.699 ? 'rgb(219,217,235)':
           d < 4.5 ? 'rgb(203,201,226)' :
           d < 6.3 ? 'rgb(158,154,200)' :
           d < 8.1 ? 'rgb(117,107,177)' :
                     'rgb(84,39,143)';
    } else {
      return 'rgb(198,198,198)';
    }
}

function style(feature) {
      return {
          fillColor: getColor(feature.properties.r),
          weight: 0.7,
          opacity: 1,
          color: '#fff',
          fillOpacity: 0.5
      };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 4,
        opacity: 1,
        color: '#fff'
    });

    popup.setContent(
      '<h2>' + layer.feature.properties.c + ', ' + layer.feature.properties.s + '</h2>' +
      '<p>' + 'Unemployment Rate: ' + layer.feature.properties.r + '</p>'
    );
}

function resetHighlight(e) {
    usLayer.resetStyle(e.target);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}

function fillTooltip(d) {
  var mouse = d3.mouse(g.node()).map( function(d) { return (d); } );

  if (mouse[0] < 500) {
    $mapTooltip.attr('style', 'left:'+(mouse[0]+18)+'px; top:'+(mouse[1]+130)+'px');
  } else {
    $mapTooltip.attr('style', 'left:'+(mouse[0]-160)+'px; top:'+(mouse[1]+130)+'px');
  }

  $('.map-tooltip-county-state').html(d.properties.c + ', ' + d.properties.s);
  $('.map-tooltip-unemployment').html('Unemployment Rate: ' + d.properties.r);
  }

// Debounce function to limit number of function calls
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};