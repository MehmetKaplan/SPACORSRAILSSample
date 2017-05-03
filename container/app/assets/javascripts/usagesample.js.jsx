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
			ReactDOM.render(React.createElement(Container, {kaplancustomtext: "This text is coming from usagesample.js via manual React component generation: " + l_text_to_add}), 
				document.getElementById("containerreact1")
			);

			ReactDOM.render(
				 <div className="container">
							<div className="row">
								<div className="col-sm-10 col-sm-offest-1">
										<div className="col-sm-4">
											Here comes your card 1
										</div>
										<div className="col-sm-4">
											Here comes your card 2
										</div>
										<div className="col-sm-4">
											Here comes your card 3
										</div>

								</div>
							</div>
				</div>,
				document.getElementById('containerreact1')
			);

		};
		fetch_data_generic(l_function_to_execute_with_result_json, '/dataget', 'GET', l_params_as_json, 'SAME', '');

		l_function_to_execute_with_result_json = function(p_call_result_as_json) {
			var l_text_to_add = "<br>" +
				'This is from container server with a POST request from SAME ORIGIN: ' +
				p_call_result_as_json['ClientTimestamp'] + ' ' + 
				p_call_result_as_json['DummyParameter'] + ' ' + 
				p_call_result_as_json['ServerTimestamp'];
			document.getElementById("container").innerHTML += l_text_to_add;
			ReactDOM.render(React.createElement(Container, {kaplancustomtext: "This text is coming from usagesample.js via manual React component generation: " + l_text_to_add}), 
				document.getElementById("containerreact2")
			);
		};
		fetch_data_generic(l_function_to_execute_with_result_json, '/datapost', 'POST', l_params_as_json, 'SAME', '');

		l_function_to_execute_with_result_json = function(p_call_result_as_json) {
			var l_text_to_add = "<br>" +
				'This is from content server with a GET request from CROSS ORIGIN: ' +
				p_call_result_as_json['ClientTimestamp'] + ' ' + 
				p_call_result_as_json['DummyParameter'] + ' ' + 
				p_call_result_as_json['ServerTimestamp'];
			document.getElementById("content").innerHTML += l_text_to_add;
			ReactDOM.render(React.createElement(Content, {kaplancustomtext: "This text is coming from usagesample.js via manual React component generation: " + l_text_to_add}), 
				document.getElementById("contentreact1")
			);
		};
		fetch_data_generic(l_function_to_execute_with_result_json, 'http://localhost:3001/dataget', 'GET', l_params_as_json, 'SAME', '');
	
		l_function_to_execute_with_result_json = function(p_call_result_as_json) {
			var l_text_to_add = "<br>" +
				'This is from content server with a POST request from CROSS ORIGIN: ' +
				p_call_result_as_json['ClientTimestamp'] + ' ' + 
				p_call_result_as_json['DummyParameter'] + ' ' + 
				p_call_result_as_json['ServerTimestamp'];
			document.getElementById("content").innerHTML += l_text_to_add;
			ReactDOM.render(React.createElement(Content, {kaplancustomtext: "This text is coming from usagesample.js via manual React component generation: " + l_text_to_add}), 
				document.getElementById("contentreact2")
			);
		};
		fetch_data_generic(l_function_to_execute_with_result_json, 'http://localhost:3001/datapost', 'POST', l_params_as_json, 'SAME', '');

		var l_cards_as_array_of_json = [
													{
														id: 1,
														card_cover_image: 'http://news.mit.edu/sites/mit.edu.newsoffice/files/styles/browse_news_image/public/images/2017/MIT-Machine_Learning-1.jpg', 
														card_circle_image: 'http://news.mit.edu/sites/mit.edu.newsoffice/files/styles/browse_news_image/public/images/2017/MIT-Machine_Learning-1.jpg', 
														card_name: 'a', 
														card_title: 'a', 
														card_self_description: 'a', 
														card_encourage_to_check_content: 'BACK', 
														card_back_header: 'a', 
														card_back_title: 'a', 
														card_back_content: 'a', 
														card_back_to_front: 'a'
													}, 
													{
														id: 2,
														card_cover_image: 'http://news.mit.edu/sites/mit.edu.newsoffice/files/styles/browse_news_image/public/images/2017/MIT-Machine_Learning-1.jpg', 
														card_circle_image: 'http://news.mit.edu/sites/mit.edu.newsoffice/files/styles/browse_news_image/public/images/2017/MIT-Machine_Learning-1.jpg', 
														card_name: 'a2', 
														card_title: 'a2', 
														card_self_description: 'a2', 
														card_encourage_to_check_content: 'BACK - a2', 
														card_back_header: 'a2', 
														card_back_title: '2a', 
														card_back_content: 'a2', 
														card_back_to_front: 'a2'
													}, 
		];
		ReactDOM.render(React.createElement(RotatingCards, {cards_as_array_of_json: l_cards_as_array_of_json}), 
			document.getElementById("contentreact3")
		);

	}
	catch(err) {
		alert(err.message);
	};
	alert("Finished.");

};

