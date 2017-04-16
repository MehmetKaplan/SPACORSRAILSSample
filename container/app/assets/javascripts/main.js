fetch_data2 = function(){
			var l_Headers = new Headers();

			var l_Init = { method: 'GET',
               headers: l_Headers,
					credentials: 'omit',
               //mode: 'cors',
               cache: 'default'
			};

			fetch('/data2', l_Init)
				.then(function(response) {
					return response.json();
				})
				.then(function(p_json) {
					document.getElementById("container").innerHTML = p_json['ServerTimestamp'];
				});
}


window.onload = function() {
	alert("Ready to make container post request");

	var l_ts = + new Date();

	alert (l_ts);
	try{
		fetch_data2();
	}
	catch(err) {
		alert(err.message);
	};
	alert("Finished.");

};

