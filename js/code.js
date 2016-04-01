
/**
* Observable that rapresent the mouse move
*/
var mouseMove = Rx.Observable.fromEvent(document, 'mousemove');


var quakes = Rx.Observable.interval(5000)
.flatMap(function(){
	return Rx.DOM.jsonpRequest({
		url: QUAKE_URL,
		jsonpCallback: 'eqfeed_callback'
	}).retry(3);
})
.flatMap(function(result){
	// Generate ad Observable from Array of features
	return Rx.Observable.from(result.response.features);
})
.distinct(function(quake) { return quake.properties.code })
.map(function(quake){
	return {
		lat: quake.geometry.coordinates[1],
		lng: quake.geometry.coordinates[0],
		size: quake.properties.mag * 10000,
		mag: quake.properties.mag
	};
})
.flatMap(function(quake){
	var marker = L.circle([quake.lat, quake.lng], quake.size).addTo(map);
	return Rx.Observable.fromEvent(marker, 'mouseover', () => ({ quake: quake, marker: marker }))
})
.map(function(data){
	var popup = data.marker.bindPopup("Magnitudo: " + data.quake.mag).openPopup();
	return {
		marker: data.marker,
		popup: popup,
		quake: data.quake
	};
})
.flatMap(function(data){
	return Rx.Observable.fromEvent(data.marker, 'mouseout', () => ( data.popup ));
});

quakes.subscribe(function(popup){
	
	popup.closePopup();;
});

