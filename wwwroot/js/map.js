// Coordinates and information for each marker
const markerData = [
    { coords: [-9.1734425, 38.7402514], info: 'União Zoófila', link: 'https://www.uniaozoofila.org/', type: 'Abrigo' },
    { coords: [-9.026012876658726, 38.6643997631585], info: 'O Abrigo da Mãozinhas', link: 'https://www.facebook.com/VoluntariosAAAAMoita/', type: 'Abrigo' },
    { coords: [-9.184845114390965, 38.724408387134254], info: 'Casa dos Animais de Lisboa', link: 'https://informacoeseservicos.lisboa.pt/contactos/diretorio-da-cidade/casa-dos-animais-de-lisboa', type: 'Abrigo' },
    { coords: [-9.203821076041395, 38.78131788051613], info: 'Parque dos Bichos', link: 'https://www.cm-odivelas.pt/areas-de-intervencao/veterinaria/parque-dos-bichos', type: 'Abrigo' },
    { coords: [-8.5375843291377, 40.89808781622984], info: 'Aanifeira', link: 'https://www.facebook.com/https://aanifeira.pt//', type: 'Abrigo' },
    { coords: [-8.514725846626577, 40.676511283844036], info: 'Associação dos Amigos dos Animais de Albergaria', link: 'https://www.facebook.com/amigosdosanimaisdealbergaria', type: 'Abrigo' },
    { coords: [-7.174847560270738, 41.50742787368101], info: 'Associação Mirandelense de Protecção Animal', link: 'http://ampamirandela.blogspot.com', type: 'Abrigo' },
    { coords: [-8.534077695343484, 37.212761412600514], info: 'Associação de Defesa dos Animais de Portimão', link: 'https://www.facebook.com/AdaPortimao?fref=ts', type: 'Abrigo' },
    { coords: [-8.67861687521375, 37.10731981734158], info: 'Cadela Carlota & Companhia', link: 'https://www.cadela-carlota.com/', type: 'Abrigo' },
    { coords: [-28.64449445586116, 38.53975325661159], info: 'Associação Faialense dos Amigos dos Animais', link: 'https://afamafaial.org/', type: 'Abrigo' },
    { coords: [-8.618699929898023, 38.72279343296144], info: 'CDB - Chão dos Bichos', link: 'https://chaodosbichos.org/', type: 'Abrigo' },
    { coords: [-9.124423981475223, 38.738979931471356], info: 'Sociedade Protectora dos Animais', link: 'https://www.facebook.com/SociedadeProtectoradosAnimais', type: 'Abrigo' },
    { coords: [-7.28467320964188, 39.126211947366244], info: 'Arronches Adopta ', link: 'https://www.arronchesadopta.com/', type: 'Abrigo' },
    { coords: [-8.217902864417722, 41.13836664256163], info: 'Animarco', link: 'https://www.facebook.com/animarcoassoc', type: 'Abrigo' },
    { coords: [-8.620296269962083, 41.23797965359038], info: 'Cantinho do Tareco', link: 'https://www.cantinhodotareco.org/', type: 'Abrigo' },
    { coords: [-7.7666215545976405, 41.372555780461525], info: 'Plataforma Proanimal', link: 'https://www.facebook.com/plataformaproanimalVR', type: 'Abrigo' },
    { coords: [-8.624566943295402, 41.147206463914515], info: 'Hospital Veterinário da Universidade do Porto - UPVet', link: 'https://icbas.up.pt/clinicavet/', type: 'Hospital Veterinário' },
    { coords: [-8.653322137430393, 41.1531880363245], info: 'Onevet Hospital Veterinário Port', link: 'https://onevetgroup.pt/porto/', type: 'Hospital Veterinário' },
    { coords: [-8.64466809107026, 41.27007858904469], info: 'AniCura CHV Porto Hospital Veterinário', link: 'https://www.anicura.pt/clinicas-veterinarias/chv-porto-hospital-veterinario/', type: 'Hospital Veterinário' },
    { coords: [-8.599460443295188, 41.151794170014774], info: 'Hospital Referência Veterinária Montenegro', link: 'https://hospvetmontenegro.com/sv/', type: 'Hospital Veterinário' },
    { coords: [-8.405138235582278, 40.18365472582335], info: 'HVC - Hospital Veterinário de Coimbra', link: 'https://hospvetcoimbra.com/', type: 'Hospital Veterinário' },
    { coords: [-9.14177553848608, 38.73773715648478], info: 'AniCura Arco do Cego Hospital Veterinário', link: 'https://www.anicura.pt/clinicas-veterinarias/arco-do-cego-hospital-veterinario/', type: 'Hospital Veterinário' },
    { coords: [-9.172664002909569, 38.75252484399122], info: 'VetLuz Hospital Veterinário', link: 'https://www.vetluz.pt/', type: 'Hospital Veterinário' },
    { coords: [-9.215247418475847, 38.71854534667504], info: 'AniCura Restelo Hospital Veterinário', link: 'https://www.anicura.pt/clinicas-veterinarias/restelo-hospital-veterinario/', type: 'Hospital Veterinário' },
    { coords: [-7.927712829962788, 37.01684037014615], info: 'Clínica Veterinária de Faro', link: 'https://clinicaveterinariadefaro.pt/', type: 'Hospital Veterinário' },
    { coords: [-9.14429379826268, 38.82942941612737], info: 'Pet Rações', link: 'https://www.petracoes.pt/', type: 'Petshop' },
    { coords: [-9.145667089199724, 38.79331398141389], info: 'ZU Alta de Lisboa', link: 'https://www.zu.pt/zu/zu-nossas-lojas.html', type: 'Petshop' },
    { coords: [-9.156996742730716, 38.723171045795866], info: 'PetBelo', link: 'https://petbelo.pt/', type: 'Petshop' },
    { coords: [-8.407621879759505, 40.20500769877096], info: 'Tiendaanimal Coimbra', link: 'https://lojas.tiendanimal.pt/', type: 'Petshop' },
    { coords: [-8.60703130859495, 41.152023675489176], info: 'Pet Lar Porto', link: 'https://www.facebook.com/petlar.antas', type: 'Petshop' },
    { coords: [-8.621131473978348, 41.16186676605653], info: 'Doçura Animal', link: 'https://docura-animal.webnode.pt/', type: 'Petshop' }
]; 


// Map style icons for different categories
const icons = {
    'Abrigo': 'img/map_paw_pin.png',
    'Petshop': 'img/map_paw_pin.png',
    'Hospital Veterinário': 'img/map_paw_pin.png'
};

// Function to create marker features based on type
function createMarkers(filterType = 'all') {
    return markerData
        .filter(marker => filterType === 'all' || marker.type === filterType)
        .map(marker => {
            const feature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat(marker.coords)),
                name: marker.info, // Set feature name for popup
                link: marker.link  // Store the link for click event
            });

            feature.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    src: icons[marker.type], // Use corresponding icon
                    anchor: [0.5, 1],
                    scale: 0.05
                })
            }));

            return feature;
        });
}

// Initialize vector layer with default 'all' markers
let vectorSource = new ol.source.Vector({
    features: createMarkers()
});
let markerLayer = new ol.layer.Vector({
    source: vectorSource
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
    const feature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
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
    const feature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
        return feature;
    });

    if (feature) {
        const coordinates = ol.proj.toLonLat(feature.getGeometry().getCoordinates());
        const lat = coordinates[1].toFixed(6);
        const lng = coordinates[0].toFixed(6);

        // Construct Google Maps link with destination
        const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

        // Open the link in a new tab
        window.open(googleMapsLink, '_blank');
    }
});

// Filtering Functionality
document.querySelectorAll('.filter-option').forEach(item => {
    item.addEventListener('click', function (event) {
        event.preventDefault();
        const filterType = this.getAttribute('data-filter');

        // Update the vector layer with the filtered markers
        vectorSource.clear();
        vectorSource.addFeatures(createMarkers(filterType));
    });
});