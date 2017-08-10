function familyType(val) {
	switch (val) {
		case 0: return "Any";
		case 1: return "No fit";
		case 2: return "Text and display";
		case 3: return "Script";
		case 4: return "Decorative";
		case 5: return "Pictorial";
	}
}

function serifStyle(val) {
	switch (val) {
		case 0: return "Any";
		case 1: return "No fit";
		case 2: return "Cove";
		case 3: return "Obtuse cove";
		case 4: return "Square cove";
		case 5: return "Obtuse square cove";
		case 6: return "Square";
		case 7: return "Thin";
		case 8: return "Bone";
		case 9: return "Exaggerated";
		case 10: return "Triangle";
		case 11: return "Normal sans serif";
		case 12: return "Obtuse sans serif";
		case 13: return "Perp sans serif";
		case 14: return "Flared";
		case 15: return "Rounded";
	}
}

function weight(val) {
	switch (val) {
		case 0: return "Any";
		case 1: return "No fit";
		case 2: return "Very light";
		case 3: return "Light";
		case 4: return "Thin";
		case 5: return "Book";
		case 6: return "Medium";
		case 7: return "Demibold";
		case 8: return "Bold";
		case 9: return "Heavy";
		case 10: return "Black";
		case 11: return "Nord";
	}
}

function proportion(val) {
	switch (val) {
		case 0: return "Any";
		case 1: return "No fit";
		case 2: return "Old style";
		case 3: return "Modern";
		case 4: return "Even width";
		case 5: return "Expanded";
		case 6: return "Condensed";
		case 7: return "Very expanded";
		case 8: return "Very condensed";
		case 9: return "Monospaced";
	}
}

function contrast(val) {
	switch (val) {
		case 0: return "Any";
		case 1: return "No fit";
		case 2: return "None";
		case 3: return "Very low";
		case 4: return "Low";
		case 5: return "Medium low";
		case 6: return "Medium";
		case 7: return "Medium high";
		case 8: return "High";
		case 9: return "Very high";
	}
}

function strokeVariation(val) {
	switch (val) {
		case 0: return "Any";
		case 1: return "No fit";
		case 2: return "Gradual/diagonal";
		case 3: return "Gradual/transitional";
		case 4: return "Gradual/vertical";
		case 5: return "Gradual/horizontal";
		case 6: return "Rapid/vertical";
		case 7: return "Rapid/horizontal";
		case 8: return "Instant/vertical";
	}
}

function armStyle(val) {
	switch (val) {
		case 0: return "Any";
		case 1: return "No fit";
		case 2: return "Straight arms/horizontal";
		case 3: return "Straight arms/wedge";
		case 4: return "Straight arms/vertical";
		case 5: return "Straight arms/single-serif";
		case 6: return "Straight arms/double-serif";
		case 7: return "Nonstraight arms/horizontal";
		case 8: return "Nonstraight arms/wedge";
		case 9: return "Nonstraight arms/vertical";
		case 10: return "Nonstraight arms/single-serif";
		case 11: return "Nonstraight arms/double-serif";
	}
}

function letterform(val) {
	switch (val) {
		case 0: return "Any";
		case 1: return "No fit";
		case 2: return "Normal/contact";
		case 3: return "Normal/weighted";
		case 4: return "Normal/boxed";
		case 5: return "Normal/flattened";
		case 6: return "Normal/rounded";
		case 7: return "Normal/off center";
		case 8: return "Normal/square";
		case 9: return "Oblique/contact";
		case 10: return "Oblique/weighted";
		case 11: return "Oblique/boxed";
		case 12: return "Oblique/flattened";
		case 13: return "Oblique/rounded";
		case 14: return "Oblique/off center";
		case 15: return "Oblique/square";
	}
}

function midline(val) {
	switch (val) {
		case 0: return "Any";
		case 1: return "No fit";
		case 2: return "Standard/trimmed";
		case 3: return "Standard/pointed";
		case 4: return "Standard/serifed";
		case 5: return "High/trimmed";
		case 6: return "High/pointed";
		case 7: return "High/serifed";
		case 8: return "Constant/trimmed";
		case 9: return "Constant/pointed";
		case 10: return "Constant/serifed";
		case 11: return "Low/trimmed";
		case 12: return "Low/pointed";
		case 13: return "Low/serifed";
	}
}

function xHeight(val) {
	switch (val) {
		case 0: return "Any";
		case 1: return "No fit";
		case 2: return "Constant/smalL";
		case 3: return "Constant/standard";
		case 4: return "Constant/large";
		case 5: return "Ducking/small";
		case 6: return "Ducking/standard";
		case 7: return "Ducking/large";
	}
}

export default function panose(panose) {
	return {
		familyType: familyType(panose[0]),
		serifStyle: serifStyle(panose[1]),
		weight: weight(panose[2]),
		proportion: proportion(panose[3]),
		contrast: contrast(panose[4]),
		strokeVariation: strokeVariation(panose[5]),
		armStyle: armStyle(panose[6]),
		letterform: letterform(panose[7]),
		midline: midline(panose[8]),
		xHeight: xHeight(panose[9])
	};
}
