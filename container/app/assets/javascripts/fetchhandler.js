fetch_add_params = function(p_params_as_json){
	var l_esc = encodeURIComponent;
	var l_retval = Object.keys(p_params_as_json)
		.map(k => l_esc(k) + '=' + l_esc(p_params_as_json[k]))
		.join('&');	
	return l_retval
}


fetch_data_generic = function(p_function_to_execute_with_result_json, p_uri, p_method, p_params_as_json, p_cross_or_same_origin, p_origin){
	if (['GET', 'POST', 'PUT'].indexOf(p_method.toUpperCase()) < 0) {
		throw "Unknown method: " + p_method + ". Allowed are GET, POST, PUT.";
	};
	if (['CROSS', 'SAME'].indexOf(p_cross_or_same_origin.toUpperCase()) < 0) {
		throw "Unknown origin: " + p_cross_or_same_origin + ". Allowed are CROSS, SAME.";
	};
	var l_uri = p_uri;
	var l_fd = new FormData();
	var l_Init = {};
	var l_Headers = new Headers();

	l_Headers.append("method", p_method.toUpperCase());
	l_Init.method = p_method.toUpperCase();
	if (p_method.toUpperCase() == "POST") {
		for (var l_key in p_params_as_json) {
			l_fd.append(l_key, p_params_as_json[l_key]);
		};
		l_Init.body = l_fd;
	}
	else {
		l_uri += "?" + fetch_add_params(p_params_as_json);
	};


	if (p_cross_or_same_origin.toUpperCase() == "CROSS") {
		l_Headers.append("Access-Control-Allow-Origin", "*");
		l_Headers.append("credentials", 'omit');
		l_Headers.append("mode", "cors");
	}
	else {
		l_Headers.append('X-CSRF-Token', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
	};
	l_Init.headers = l_Headers;

	l_Init.cache = 'default';

	fetch(l_uri, l_Init)
				.then(function(response) {
					return response.json();
				})
				.then(function(p_json) {
					p_function_to_execute_with_result_json(p_json);
				});
}


