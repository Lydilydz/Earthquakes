// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var platesJSON = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";
//var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

//var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

//var query2 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"
var queryVolcanoUrl = "https://data.humdata.org/dataset/a60ac839-920d-435a-bf7d-25855602699d/resource/7234d067-2d74-449a-9c61-22ae6d98d928/download/volcano.json"

var oilFieldsJSON = "https://raw.githubusercontent.com/carnegieendowment/oil-climate-index-2/master/app/assets/data/oilfields.geojson"



// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Perform a GET request to the query URL
  d3.json(platesJSON, function(data2) {
    // Perform a GET request to the query URL
    d3.json(queryVolcanoUrl, function(data3) {
      // Perform a GET request to the query URL
      d3.json(oilFieldsJSON, function(data4) {
        // Perform a GET request to the query URL
        createFeatures(data.features, data2.features, data3.features, data4.features);
        })
      })
    })
});

// // Perform a GET request to the query URL
// d3.json(queryVolcanoUrl, function(data3) {
//   // Perform a GET request to the query URL
//   createFeatures(data.features, data2.features, data3.features);
// });

//return color based on value
  function getColor(x) {
    return x > 5 ? "#f40202" :
           x > 4 ? "#f45f02" :
           x > 3 ? "#f49702" :
           x > 2 ? "#F4bc02" :
           x > 1 ? "#d8f402" :
           x > 0 ? "#93f402" :
                "#FFEDA0";
  }


function createFeatures(earthquakeData, plateData, volcanoData, oilfieldData) {

  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
      "</h3><hr><p>Magnitude: " + feature.properties.mag + "</p>");
  }

  function onEachFeatureV(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.V_Name +
      "</h3><hr><p>Country: " + feature.properties.Country + "</p>" +
      "</h3><hr><p>Region: " + feature.properties.Region + "</p>" +
      "</h3><hr><p>Population Exposure Index (PEI): " + feature.properties.PEI + "<br>Scale:1 to 7 (ex. 7 >300,000)</p>");
  }


  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
  
      var geojsonMarkerOptions = {
        radius: +feature.properties.mag*4,
        fillColor: getColor(feature.properties.mag),
        color: "black",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
    
  });

  var volcanos = L.geoJSON(volcanoData, {
    onEachFeature: onEachFeatureV,
    pointToLayer: function (feature, latlng) {
        var geojsonMarkerOptions = {
        radius: 3,
        fillColor: "black",
        color: "red",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }

  });

  // console.log(volcanos);

  var plates = L.geoJson(plateData, {
    style: function(){
      return {
          color:"orange",
          fillColor: "white",
          fillOpacity:0
      }
    }, 
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.PlateName + "</h3>");
    }
  });

  // console.log(plates);

  var oilfields = L.geoJson(oilfieldData, {
    style: function(){
      return {
          color:"blue",
          fillColor: "white",
          fillOpacity:0
      }
    }, 
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.Field_Name + "</h3>");
    }
  });


  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes, plates, volcanos, oilfields);
  
}

function createMap(earthquakes, plates, volcanos, oilfields) {

  // Define streetmap and darkmap layers
//  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
//    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
//    "T6YbdDixkOBWH_k9GbS8JQ");
	
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });


  var satmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.sat",
    accessToken: API_KEY
  });

  var Esri_OceanBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
	maxZoom: 13
});

var JusticeMap_income = L.tileLayer('http://www.justicemap.org/tile/{size}/income/{z}/{x}/{y}.png', {
	attribution: '<a href="http://www.justicemap.org/terms.php">Justice Map</a>',
	size: 'county',
	opacity: .5,
	bounds: [[14, -180], [72, -56]]
});

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Satellite Map": satmap,
	"Ocean Basemap": Esri_OceanBasemap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes,
    Plates: plates,
    Volcanos: volcanos,
    Oil_Fields: oilfields,
	"Income": JusticeMap_income
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,

    timeDimension: true,
    timeDimensionOptions: {
      timeInterval : "P1W/today",
      period: "P2D",
      autoPlay: true
    },
    timeDimensionControl: true,
    timeDimensionControlOptions: {
      loopButton: true,
      autoPlay: true
    },

    
    layers: [streetmap, earthquakes, plates, volcanos, oilfields]
  });

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);


//add time timeDimension
//based on example from: http://jsfiddle.net/bielfrontera/5afucs89/
L.TimeDimension.Layer.GeoJson.GeometryCollection = L.TimeDimension.Layer.GeoJson.extend({
  // Do not modify features. Just return the feature if it intersects the time interval
  _getFeatureBetweenDates: function(feature, minTime, maxTime) {
    var time = new Date(feature.properties.time);
      if (time > maxTime || time < minTime) {
          return null;
      }
      return feature;
  }
});
var timeLayer = L.timeDimension.layer.geoJson.geometryCollection = function(layer, options) {
  return new L.TimeDimension.Layer.GeoJson.GeometryCollection(layer, options);
};



//L.timeDimension.layer.geoJson(layer).addTo(myMap);
geoJsonTimeLayer = L.timeDimension.layer.geoJson.geometryCollection(earthquakes, {
  updateTimeDimension: true,
  updateTimeDimensionMode: 'replace',
  duration: 'PT1H',
}).addTo(myMap);


//add legend
	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 1, 2, 3, 4, 5],
			labels = [];
			
		div.innerHTML+='Magnitude<br><hr>'	

		// loop through our density intervals and generate a label with a colored square for each interval
		for (var i = 0; i < grades.length; i++) {
			div.innerHTML +=
				'<i style="background:' + getColor(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
				grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
		}

		return div;
	};

	legend.addTo(myMap);

}