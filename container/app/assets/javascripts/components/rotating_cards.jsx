class RotatingCards extends React.Component {
	
  render() {
    return (
			<div className="container">
				<div className="row">
					<div className="col-sm-10 col-sm-offset-1">
						<div className="col-md-4 col-sm-6">
        {
          this.props.cards_as_array_of_json.map(function(p_card_as_json) {
            return   <div className="card-container manual-flip" key={p_card_as_json.id}>
								<div className="card">
									<div className="front">
										<div className="cover">
											<img src={p_card_as_json.card_cover_image}/>
										</div>
										<div className="user">
											<img className="img-circle" src={p_card_as_json.card_circle_image}/>
										</div>
										<div className="content">
											<div className="main">
												<h3 className="name">{p_card_as_json.card_name}</h3>
												<p className="profession">{p_card_as_json.card_title}</p>
												<p className="text-center">{p_card_as_json.card_self_description}</p>
											</div>
											<div className="footer">
												<button className="btn btn-simple" id={"btn_card_" + p_card_as_json.id} onClick={() => {window.rotateCard("btn_card_" + p_card_as_json.id)}  }>
													<i className="fa fa-mail-forward"></i> {p_card_as_json.card_encourage_to_check_content}
												</button>
											</div>
										</div>
									</div>
									<div className="back">
										<div className="header">
											<h5 className="motto">{p_card_as_json.card_back_header}</h5>
										</div>
										<div className="content">
											<div className="main">
												<h4 className="text-center">{p_card_as_json.card_back_title}</h4>
												<p className="text-center">{p_card_as_json.card_back_content}</p>
												<div className="stats-container">
													<div className="stats">
														<h4>{p_card_as_json.card_back_info_head}</h4>
														<p>{p_card_as_json.card_back_info_content}</p>
													</div>
												</div>
											</div>
										</div>
										<div className="footer">
											<button className="btn btn-simple" rel="tooltip" id={"btn_card_back_" + p_card_as_json.id} title="Flip Card" onClick={() => {window.rotateCard("btn_card_back_" + p_card_as_json.id)} }>
												<i className="fa fa-reply"></i> {p_card_as_json.card_back_to_front}
											</button>
											<div className="social-links text-center">
												<a href="http://facebook.com" className="facebook"><i className="fa fa-facebook fa-fw"></i></a>
												<a href="http://goofgle.com" className="google"><i className="fa fa-google-plus fa-fw"></i></a>
												<a href="http://twitter.com" className="twitter"><i className="fa fa-twitter fa-fw"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>;
          })
		  }
						</div>
					</div>
				</div>
			</div>
    );
  }
}
