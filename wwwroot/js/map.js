// Coordinates and information for each marker
const markerData = [
    { coords: [-9.1734425, 38.7402514], info: 'União Zoófila', link: 'https://example.com/shelter1' },
    { coords: [-8.611, 41.14961], info: 'Shelter 2', link: 'https://example.com/shelter2' },
    { coords: [-7.9118, 37.0194], info: 'Shelter 3', link: 'https://example.com/shelter3' }
];

// Create features for each marker
const markerFeatures = markerData.map(data => {
    const feature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat(data.coords)),
        name: data.info, // Set the feature's name to be used in the popup
        link: data.link  // Store the link to redirect on click
    });
    return feature;
});

// Create a vector layer with all marker features
const markerLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: markerFeatures
    }),
    style: new ol.style.Style({
        image: new ol.style.Icon({
            src: 'img/map_paw_pin.png', // Marker icon URL
            anchor: [0.5, 1],
            scale: 0.05
        })
    })
});

// Create the map with tile layer and marker layer
const map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.TileJSON({
                url: 'https://api.maptiler.com/maps/satellite/tiles.json?key=W9Otg8vd6JezJmLyH6E4',
                tileSize: 512
            })
        }),
        markerLayer
    ],
    target: 'map',
    view: new ol.View({
        center: ol.proj.fromLonLat([-8.8536565, 39.4838897]),
        zoom: 6
    })
});

// Select the .pin_text element for the popup
const popup = document.querySelector('.pin_text');
const overlay = new ol.Overlay({
    element: popup,
    positioning: 'bottom-center',
    offset: [0, -50],
    autoPan: false // Disable autoPan to prevent map movement
});
map.addOverlay(overlay);

// Show info on hover and set up click for redirection
map.on('pointermove', function (event) {
    const feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
        return feature;
    });
    
    if (feature) {
        const coordinates = feature.getGeometry().getCoordinates();
        const info = feature.get('name');
        
        // Set the popup content and position it
        popup.innerHTML = info;
        overlay.setPosition(coordinates);
        popup.style.display = 'block';
    } else {
        // Hide popup when not hovering over a marker
        popup.style.display = 'none';
    }
});

// Redirect to link on marker click
map.on('click', function (event) {
    const feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
        return feature;
    });
    
    if (feature) {
        const link = feature.get('link');
        if (link) {
            window.open(link, '_blank'); // Open link in a new tab
        }
    }
});
