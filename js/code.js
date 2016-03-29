
var quakes = Rx.Observable.create(function(observer){
	console.log(quakes)
	window.eqfeed_callback = function(response){
		var quakes = response.features;
		
		onsole.log(quakes.length)
		quakes.forEach(function(quake){
			observer.onNext(quake);
		})
	};

	loadJSONP(QUAKE_URL);
});

quakes.subscribe(function(quake){
	/* Retrive coordinates and size from quake */
	var coords = quake.geometry.coordinates;

	/* Size is proportional with magnitude */
	var size = quake.properties.mag * 1000;

	L.circle([coords[1], coords[0]], size).addTo(map);
});