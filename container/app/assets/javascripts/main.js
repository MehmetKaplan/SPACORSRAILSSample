window.onload = function() {
	alert("Click OK to send the request:");


	try{
		var l_ts = new Date().toUTCString();
		var l_params_as_json= {
								ClientTimestamp: l_ts,
								DummyParameter: '=-->'
							};
		//fetch_data_get_same_origin(l_params_as_json);
		fetch_data_post_same_origin(l_params_as_json);
	}
	catch(err) {
		alert(err.message);
	};
	alert("Finished.");

};

