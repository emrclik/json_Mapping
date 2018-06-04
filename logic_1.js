// Mapbox API
var mapbox = "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW1yY2xpayIsImEiOiJjamg5cWg3cWIwZmh1MzZscjRvN284bTNuIn0.5gQBWjvOBd9Cx-8PbnZclA";

// Creating map object
var myMap = L.map("map", {
  center: [40.7, -110.95],
  zoom: 5
});

// Adding tile layer to the map
L.tileLayer(mapbox).addTo(myMap);

function getColor(d) {
return d > 7 ? '#800026' :
        d > 6  ? '#BD0026' :
        d > 5  ? '#E31A1C' :
        d > 4  ? '#FC4E2A' :
        d > 3   ? '#FD8D3C' :
        d >2   ? '#FEB24C' :
        d > 1   ? '#FED976' :
                    '#FFEDA0';
}


// Building API query URL
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var url_tect = 'https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_boundaries.json';

d3.json(url_tect, function(res_tect) {

  console.log(res_tect)

  for (var i = 0; i < res_tect.features.length; i++) {

    var location_tect = res_tect.features[i].geometry;
    if (location_tect) {

      var line = [];
      for (var i=0; i < location_tect.coordinates.length; i++) {
        
        line.append(location_tect.coordinates[i])

      }

      L.polyline(line, {
        color: "blue"
      }).addTo(myMap);
    }

  }
});


// Grabbing the data with d3..
d3.json(url, function(res) {

  // Loop through our data...
  for (var i = 0; i < res.features.length; i++) {
    //console.log(res.features[i])
    // set the data location property to a variable
    var location = res.features[i].geometry;
    // If the data has a location property...
    if (location) {

      // Add a new marker to the map and bind a pop-up
    //   ,{style:style}
     L.circle([location.coordinates[1], location.coordinates[0]], {
        fillOpacity: 0.75,
        color: "white",
        fillColor: getColor(res.features[i].properties.mag),
        radius: (res.features[i].properties.mag)*10000
      })
      .bindPopup(res.features[i].properties.place).addTo(myMap);
    }

  }

});
