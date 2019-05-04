import { Tweak } from '@squarespace/core';

function MapViewer(element) {

  // Get theme color
  var color = require('onecolor/minimal.js');
  var mapAccent = Y.Squarespace.Template.getTweakValue('tweak-site-color-primary');
  mapAccent = color(mapAccent);
  
  // Load mapbox
  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  
  mapboxgl.accessToken = 'pk.eyJ1Ijoibmljb2xhc2wiLCJhIjoiOWVlNGM4ZmM1MDQ5NmI4MDU2MzQ1N2UwOGUwNTkyZWUifQ.Xw1GbwplWlT8hPCYUMmVuw';

  var mapData = {
    name: element.dataset.locName,
    desc: document.querySelector(element.dataset.locPopup).innerHTML,
    lng: parseFloat(element.dataset.locLng),
    lat: parseFloat(element.dataset.locLat),
    zoom: parseFloat(element.dataset.locZoom) || 12,
  };

  mapData.desc = mapData.desc
    .replace(/\n/g, '') // remove newline / carriage return
    .replace(/[\t ]+\</g, '<') // remove whitespace (space and tabs) before tags
    .replace(/\>[\t ]+\</g, '><') // remove whitespace between tags
    .replace(/\>[\t ]+$/g, '>'); // remove whitespace after tags
  
  var map = new mapboxgl.Map({
    container: element,
    style: 'mapbox://styles/nicolasl/cjcitqzrm8jhh2so5jc3o5250',
    center: [mapData.lng, mapData.lat],
    zoom: mapData.zoom,
  });

  var marker = {
    size: 40,
    spread: 24,
    borderWidth: 4,
  }
  marker.box = marker.size + marker.spread*2;

  var pulsingDot = {
      width: marker.box,
      height: marker.box,
      data: new Uint8Array(marker.box * marker.box * 4),
  
      onAdd: function() {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
      },
  
      render: function() {
        var duration = 1500;
        var t = (performance.now() % duration) / duration;

        var radius = marker.size / 2 - marker.borderWidth;
        var outerRadius = marker.size / 2 + marker.spread * t;
        var context = this.context;

        // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
        context.fillStyle = mapAccent.alpha(1 - t).cssa();
        context.fill();

        // draw inner circle
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = mapAccent.alpha(1).cssa();
        context.strokeStyle = 'white';
        context.lineWidth = marker.borderWidth;
        context.fill();
        context.stroke();

        // update this image's data with data from the canvas
        this.data = context.getImageData(0, 0, this.width, this.height).data;

        // keep the map repainting
        map.triggerRepaint();

        // return `true` to let the map know that the image was updated
        return true;
      }
  };

  map.on('load', function () {

    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
    
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
                'description': mapData.desc,
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
        'icon-image': 'pulsing-dot'
      },
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
  map.on('mouseenter', 'markers', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  
  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'markers', function () {
    map.getCanvas().style.cursor = '';
  });

}

export default MapViewer;
