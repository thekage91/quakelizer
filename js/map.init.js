
var QUAKE_URL = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

function loadJSONP (url) {
	var script = document.createElement('script');
	script.url = url;

	var head = document.getElementsByTagName('head')[0];
	head.appendChild(script);
}

var map = L.map('map').setView([43.318567, 11.330482], 7);
L.tileLayer('http://{s}.title.osm.org/{z}/{x}/{y}.png').addTo(map);


