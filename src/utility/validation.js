const validate = (val, rule) => {
	let isValid = true;

	switch (rule) {
		case 'isName':
			isValid = isValid && nameValidator(val);
			break;
		case 'isNumber':
			isValid = isValid && numberValidator(val);
			break;
		case 'isEmail':
			isValid = isValid && emailValidator(val);
			break;
		case 'minLength':
			isValid = isValid && minLengthValidator(val, rules[rule]);
			break;
		case 'equalTo':
			isValid = isValid && equalToValidator(val, connectedValue[rule]);
			break;
		case 'notEmpty':
			isValid = isValid && notEmptyValidator(val);
			break;
		default:
			isValid = true;
	}
	return isValid;
};

const nameValidator = val => {
	return /^(\s)*[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*(\s)*$/.test(val);
};

const numberValidator = val => {
	return /^[a-z0-9]+$/.test(val);
};

const emailValidator = val => {
	return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
		val
	);
};

const minLengthValidator = (val, minLength) => {
	return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
	return val === checkValue;
};

const notEmptyValidator = val => {
	return val.trim() !== '';
};

export default validate;
