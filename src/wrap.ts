
const wrap = (text, fore, aft) => {
	/*const userPatterns = workspace.getConfiguration("wrapSelection.patterns");
	const isUserDefined = userPatterns.hasOwnProperty(pattern);

	if (isUserDefined) {
		return userPattern(text, userPatterns[pattern]);
	}*/

	return `${fore}${text}${aft}`;

	/*switch (pattern) {
		case "%>": case "<%": return `<%${text}%>`;
		case "%}": case "{%": return `{%${text}%}`;
		case "(": case ")": return `(${text})`;
		case "<": case ">": return `<${text}>`;
		case "[": case "]": return `[${text}]`;
		case "{": case "}": return `{${text}}`;
		case "{{": case "}}": return `{{${text}}}`;
		case "{{{": case "}}}": return `{{{${text}}}}`;
		case "«": case "»": return `«${text}»`;
		case "<!--": case "--!>": return `<!--${text}--!>`;
		default: return `${pattern}${text}${pattern}`;
	}*/
};

export default wrap;
