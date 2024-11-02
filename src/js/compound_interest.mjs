(function () {
	
	const i_currency = document.querySelectorAll('[name="i_currency"]');
	const select_indicator = (id) => document.querySelector(`#${id}+*`);

	const currency_to_entity = (curr) => {
		switch (curr) {
			case 'EUR': return '&euro;';
			case 'GBP': return '&pound;';
			case 'USD': return '&dollar;';
		}
	}

	const update_symbol = (element, currency_value) => {
		element.className='';
		console.log(currency_value);
		element.innerHTML = currency_value;

	}

	const get_currency = () => {
		return document.querySelector('[name="i_currency"]:checked').value;
	};
	const update_symbols = () => {
			update_symbol(start_currency, currency_to_entity(get_currency()));
	};
	
	//function for calculating compount interest.
	const calculate = () => {
		//a = p * (1 + (r/n))^tn

		//only calculate if everything is valid.
		if (!start_amt.validity.valid || !int_rate.validity.valid || !years.validity.valid) {
			result.innerText = 'bad values';
			return;
		}
		const p = start_amt.value;
		const r = int_rate.value * 0.01; //(convert it into a percentage)
		const n = 1;
		const t = years.value;
		
		const a = p * Math.pow(1 + r / n, t * n);
		const val = Math.round(a * 100) / 100;
		result.innerText = val.toLocaleString(navigator.language,{"style":"currency", "currency":get_currency()});
	};
		
	i_currency.forEach(i=> {
		i.addEventListener('change', update_symbols);
		i.addEventListener('change', calculate);
	});

	const alignValidation = (e) => {
		e.target.setAttribute('aria-invalid', !e.target.validity.valid);
	}
  
	b_clear.addEventListener("click", () => {
    start_amt.value = 0;
    int_rate.value = 0;
    years.value = 0;
  });
	b_clear.addEventListener("click", calculate);


	start_amt.addEventListener('input', alignValidation);
	start_amt.addEventListener('input', calculate);
	years.addEventListener('input', alignValidation);
	years.addEventListener('input', calculate);
	int_rate.addEventListener('input', (e) => select_indicator(e.target.id).innerText = e.target.value);
	int_rate.addEventListener('input', calculate);
	
	document.addEventListener('readystatechange', () => {
		const init_value=4.5;
		int_rate.value = init_value;
		select_indicator(int_rate.id).innerText = init_value;
	});
})();