module.exports = function (weight) {
	switch (weight) {
		case 100: return "Thin";
		case 200: return "Extra-light";
		case 300: return "Light";
		case 400: return "Normal";
		case 500: return "Medium";
		case 600: return "Semi-bold";
		case 700: return "Bold";
		case 800: return "Extra-bold";
		case 900: return "Black";
	};
};