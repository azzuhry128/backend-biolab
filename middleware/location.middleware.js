const { mapboxgl } = require('mapbox-gl')

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/street-v12",
    center: [-74.5,40],
    zoom: 9
})