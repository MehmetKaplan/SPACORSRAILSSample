fetch_add_params = function(p_params_as_json){
	/*
		var l_params_as_json = {
			parameter1: 'value_1',
			parameter2: 'value 2',
			parameter3: 'value&3' 
		};
	*/
	var l_esc = encodeURIComponent;
	var l_retval = Object.keys(p_params_as_json)
		.map(k => l_esc(k) + '=' + l_esc(p_params_as_json[k]))
		.join('&');	
	return l_retval
}

fetch_data_get_same_origin = function(p_params_as_json){
	/*
		var l_params_as_json = {
			parameter1: 'value_1',
			parameter2: 'value 2',
			parameter3: 'value&3' 
		};
	*/
			var l_Headers = new Headers();
			l_Headers.append("credentials", "include");
			var l_params = fetch_add_params(p_params_as_json);
			var l_Init = { method: 'GET',
               headers: l_Headers,
               //mode: 'cors',
               cache: 'default'
			};

			fetch('/dataget?' + l_params, l_Init)
				.then(function(response) {
					return response.json();
				})
				.then(function(p_json) {
					document.getElementById("container").innerHTML = 
						p_json['ClientTimestamp'] + ' ' + 
						p_json['DummyParameter'] + ' ' + 
						p_json['ServerTimestamp'];
				});
}

fetch_data_post_same_origin = function(p_params_as_json){
	/*
		var l_params_as_json = {
			parameter1: 'value_1',
			parameter2: 'value 2',
			parameter3: 'value&3' 
		};
	*/

			var l_Init = { method: 'POST',
					credentials: 'same-origin',
					'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
					body: JSON.stringify(p_params_as_json),
               //mode: 'cors',
               cache: 'default'
			};

			alert (JSON.stringify(l_Init));

			fetch('/datapost', l_Init)
				.then(function(response) {
					return response.json();
				})
				.then(function(p_json) {
					document.getElementById("container").innerHTML = 
						p_json['ClientTimestamp'] + ' ' + 
						p_json['DummyParameter'] + ' ' + 
						p_json['ServerTimestamp'];
				});

}

window.onload = function() {
	alert("Click OK to send the request:");


	try{
		var l_ts = new Date().toUTCString();
		var l_params_as_json= {
								ClientTimestamp: l_ts,
								DummyParameter: '=>'
							};
		//fetch_data_get_same_origin(l_params_as_json);
		fetch_data_post_same_origin(l_params_as_json);
	}
	catch(err) {
		alert(err.message);
	};
	alert("Finished.");

};

