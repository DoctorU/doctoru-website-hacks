(function(){

		const pd = (e) => e.preventDefault();
	//endoding
	b_encode.addEventListener('click', pd);
	b_decode.addEventListener('click', pd);
	b_encode_clear.addEventListener('click', pd);
	b_decode_clear.addEventListener('click', pd);
		//encoding
	b_encode.addEventListener('click', ()=>{
		console.log('b_encode');
		t_encoded.value = window.btoa(t_plain.value);
	});

	//decoding
	b_decode.addEventListener('click', ()=>{
		console.log('b_decode');
		t_plain.value = window.atob(t_encoded.value);
	});
	
	// clear
	const clear = (area_to_clear) => {
		return function(e) {
			area_to_clear.value = '';
		}
	};
	
	b_decode_clear.addEventListener('click', clear(t_encoded));
	b_encode_clear.addEventListener('click', clear(t_plain));
})()