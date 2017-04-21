window.onload = function() {
	alert("Click OK to send the request:");


	try{
		var l_ts = new Date().toUTCString();
		var l_params_as_json= {
								ClientTimestamp: l_ts,
								DummyParameter: ' - '
							};
		// fetch_data_get_same_origin('/dataget', l_params_as_json);
		// fetch_data_post_same_origin('/datapost', l_params_as_json);
		// fetch_data_get_different_origin('http://localhost:3001/dataget', l_params_as_json)
		// fetch_data_post_different_origin('http://localhost:3001/datapost', l_params_as_json)

		l_function_to_execute_with_result_json = function(p_call_result_as_json) {
			var l_text_to_add = '<br>' + 'This is from container server with a GET request from SAME ORIGIN: ' +
				p_call_result_as_json['ClientTimestamp'] + ' ' + 
				p_call_result_as_json['DummyParameter'] + ' ' + 
				p_call_result_as_json['ServerTimestamp'];
			document.getElementById("container").innerHTML += l_text_to_add;
			ReactDOM.render(React.createElement(Container, {kaplancustomtext: "Obarahaeyy"}), 
				document.getElementById("containerreact")
			);
		};
		fetch_data_generic(l_function_to_execute_with_result_json, '/dataget', 'GET', l_params_as_json, 'SAME', '');

		l_function_to_execute_with_result_json = function(p_call_result_as_json) {
			document.getElementById("container").innerHTML += "<br>" +
				'This is from container server with a POST request from SAME ORIGIN: ' +
				p_call_result_as_json['ClientTimestamp'] + ' ' + 
				p_call_result_as_json['DummyParameter'] + ' ' + 
				p_call_result_as_json['ServerTimestamp'];
		};
		fetch_data_generic(l_function_to_execute_with_result_json, '/datapost', 'POST', l_params_as_json, 'SAME', '');

		l_function_to_execute_with_result_json = function(p_call_result_as_json) {
			document.getElementById("content").innerHTML += "<br>" +
				'This is from content server with a GET request from CROSS ORIGIN: ' +
				p_call_result_as_json['ClientTimestamp'] + ' ' + 
				p_call_result_as_json['DummyParameter'] + ' ' + 
				p_call_result_as_json['ServerTimestamp'];
		};
		fetch_data_generic(l_function_to_execute_with_result_json, 'http://localhost:3001/dataget', 'GET', l_params_as_json, 'SAME', '');
	
		l_function_to_execute_with_result_json = function(p_call_result_as_json) {
			document.getElementById("content").innerHTML += "<br>" +
				'This is from content server with a POST request from CROSS ORIGIN: ' +
				p_call_result_as_json['ClientTimestamp'] + ' ' + 
				p_call_result_as_json['DummyParameter'] + ' ' + 
				p_call_result_as_json['ServerTimestamp'];
		};
		fetch_data_generic(l_function_to_execute_with_result_json, 'http://localhost:3001/datapost', 'POST', l_params_as_json, 'SAME', '');

	}
	catch(err) {
		alert(err.message);
	};
	alert("Finished.");

};

