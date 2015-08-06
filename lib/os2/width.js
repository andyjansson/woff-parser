module.exports = function (width) {
	switch (width) {
		case 1: return "Ultra-condensed";
		case 2: return "Extra-condensed";
		case 3: return "Condensed";
		case 4: return "Semi-condensed";
		case 5: return "Medium (normal)";
		case 6: return "Semi-expanded";
		case 7: return "Expanded";
		case 8: return "Extra-expanded";
		case 9: return "Ultra-expanded";
	}
};