export default function encoding (enc) {
	switch (enc) {
		case 0: return "macroman";
		case 6: return "macgreek";
		case 7: return "maccyrillic";
		case 21: return "macthai";
		case 29: return "maccenteuro";
	}
	return "macintosh";
}
