
var quakes = Rx.Observable.create(function(observer){
	window.eqfeed_callback = function(response){
		// Main Observable emits the response
		observer.onNext(response);
		observer.onCompleted();
	};

	loadJSONP(QUAKE_URL);	
}).flatMap(function transform(dataset){
	// Generate ad Observable from Array of features
	return Rx.Observable.from(dataset.response.features);
});

quakes.subscribe(function(quake){
	/* Retrive coordinates and size from quake */
	var coords = quake.geometry.coordinates;
	/* Size is proportional with magnitude */
	var size = quake.properties.mag * 10000;

	L.circle([coords[1], coords[0]], size).addTo(map);
});