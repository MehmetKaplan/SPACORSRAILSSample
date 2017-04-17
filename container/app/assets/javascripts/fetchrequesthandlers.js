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
			var l_fd = new FormData();
			for (var l_key in p_params_as_json) {
				l_fd.append(l_key, p_params_as_json[l_key]);
			}
			var l_Init = { method: 'POST',
					credentials: 'same-origin',
					'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
					body: l_fd,
               cache: 'default'
			};
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