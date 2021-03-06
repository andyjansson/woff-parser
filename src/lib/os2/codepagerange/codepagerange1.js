export default function codepagerange1(codepagerange) {
	const ranges = [];
	if (codepagerange & 0x0000FFFF) ranges.push("Reserved for OEM");
	if (codepagerange & 0x00010000) ranges.push("IBM Greek");
	if (codepagerange & 0x00020000) ranges.push("MS-DOS Russian");
	if (codepagerange & 0x00040000) ranges.push("MS-DOS Nordic");
	if (codepagerange & 0x00080000) ranges.push("Arabic");
	if (codepagerange & 0x00100000) ranges.push("MS-DOS Canadian French");
	if (codepagerange & 0x00200000) ranges.push("Hebrew");
	if (codepagerange & 0x00400000) ranges.push("MS-DOS Icelandic");
	if (codepagerange & 0x00800000) ranges.push("MS-DOS Portuguese");
	if (codepagerange & 0x01000000) ranges.push("IBM Turkish");
	if (codepagerange & 0x02000000) ranges.push("IBM Cyrillic; primarily Russian");
	if (codepagerange & 0x04000000) ranges.push("Latin 2");
	if (codepagerange & 0x08000000) ranges.push("MS-DOS Baltic");
	if (codepagerange & 0x10000000) ranges.push("Greek; former 437 G");
	if (codepagerange & 0x20000000) ranges.push("Arabic; ASMO 708");
	if (codepagerange & 0x40000000) ranges.push("WE/Latin 1");
	if (codepagerange & 0x80000000) ranges.push("US");
	return ranges;
}
