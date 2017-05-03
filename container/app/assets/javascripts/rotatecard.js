function rotateCard(btn){
alert('a');
	var $card = $(btn).closest('.card-container');
	if($card.hasClass('hover')){
		$card.removeClass('hover');
	} else {
		$card.addClass('hover');
	}
}
