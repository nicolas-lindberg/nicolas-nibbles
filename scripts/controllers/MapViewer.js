

function MapViewer(element) {
  
  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  
  mapboxgl.accessToken = 'pk.eyJ1Ijoibmljb2xhc2wiLCJhIjoiOWVlNGM4ZmM1MDQ5NmI4MDU2MzQ1N2UwOGUwNTkyZWUifQ.Xw1GbwplWlT8hPCYUMmVuw';
  
  var mapData = {
    name: element.dataset.locName,
    desc: document.querySelector(element.dataset.locPopup).innerHTML.replace(/\n|\t/g, ' '),
    lng: parseFloat(element.dataset.locLng),
    lat: parseFloat(element.dataset.locLat),
    zoom: parseFloat(element.dataset.locZoom) || 12,
  };

  var map = new mapboxgl.Map({
    container: element,
    style: 'mapbox://styles/nicolasl/cjv8j9qz91evc1fqo5pg8zmxu',
    center: [mapData.lng, mapData.lat],
    zoom: mapData.zoom,
  });

  map.on('load', function () {

    /* Image: An image is loaded and added to the map. */
    map.loadImage('https://i.imgur.com/MK4NUzI.png', function(error, image) {

      if (error) throw error;

      map.addImage('custom-marker', image);
      
      /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
      map.addLayer({
        id: 'markers',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {
                  "description": mapData.desc,
                },
                geometry: {
                  type: 'Point',
                  coordinates: [mapData.lng, mapData.lat],
                }
              },
            ],
          },
        },
        layout: {
          'icon-image': 'custom-marker',
        },
      });
    });
  });

  // When a click event occurs on a feature in the places layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on('click', 'markers', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;
    
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
  });
    
  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on('mouseenter', 'places', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  
  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'places', function () {
    map.getCanvas().style.cursor = '';
  });

}

export default MapViewer;
