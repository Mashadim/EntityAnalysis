export function isWhatType(search) {
	let inputType = '';
	
	if(search.startsWith('http://') || search.startsWith('https://')) {
		inputType = 'url';
	}else {
		inputType = 'text';
	};
	
	return inputType;
};