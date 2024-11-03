(function(){
	const c_to_k = function(_in) {
		return Number(_in) + 273.6;
	};
	const c_to_f = function(_in) {
		return (_in * 180/100) + 32; 
	};
	const k_to_c = function(_in) {
		return Number(_in) - 273.6;
	};
	const f_to_c = function(_in) {
		return (_in - 32)  * 100/180; 
	};

	const scale_from = function(_from, _from_unit) {
		switch(_from_unit){
			case 'K': return k_to_c(_from);
			case 'F': return f_to_c(_from);
			default: return _from;
		}
	}
	const scale_to = function(_from, _to_unit) {
		switch(_to_unit) {
			// case 'C': _from = from.value; break;
			case 'K': return c_to_k(_from);
			case 'F': return c_to_f(_from);
			default: return _from;
		}

	};

	const setAriaInvalid = (el, value) => el.setAttribute('aria-invalid', value); 
	const alignValidators = (e) => {
		setAriaInvalid(e.target, !e.target.validity.valid);
	};
	const FROM_UNIT_SEL = "[name='from_unit']";
	const TO_UNIT_SEL = "[name='to_unit']";
	const calculate_temperature = (e)=> {

		if(!document.getElementById('form').checkValidity()) {
			to_val.value = 'Please check values.';
			return;
		}
		const _to_unit = document.querySelectorAll("[name='to_unit']:checked")[0].value;
		const _from_unit = document.querySelectorAll("[name='from_unit']:checked")[0].value;
		var _from = Number(from_value.value);
		_from = scale_from(_from, _from_unit);
		_from = scale_to(_from, _to_unit);
		const _to_val = Math.round(_from*100)/100;
		to_val.value = _to_val;

	};

	b_clear.addEventListener('click', (e) => e.preventDefault());
	b_clear.addEventListener('click', ()=>{
		from_value.value= 100;
		document.querySelectorAll(FROM_UNIT_SEL).forEach((el, id)=> el.checked = id == 0);
		document.querySelectorAll(TO_UNIT_SEL).forEach((el, id)=> el.checked = id == 0);
		setAriaInvalid(from_value, false);
	});
	b_clear.addEventListener('click', calculate_temperature);
	
	document.querySelectorAll("input").forEach(el =>{
		el.addEventListener('input', alignValidators);
		el.addEventListener('input', calculate_temperature);		
	})

	document.addEventListener('DOMContentLoaded', ()=> from_value.setAttribute('aria-invalid', false));
	document.addEventListener('DOMContentLoaded', calculate_temperature);


	
})()