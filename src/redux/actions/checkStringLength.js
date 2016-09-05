export function checkStringLength(string) {
	if(string.length > 997) {
		string = string.substring(0, 996);
	}
	return string;
};