import { commands, ExtensionContext, window } from "vscode";
import wrap from "./wrap";

const wrapSelection = (editor, fore, aft) => {
	if (!fore || !aft) {
		return;
	}

	const { document, selections } = editor;

	editor.edit((b) => {
		selections.forEach((selection) => {
			if (!selection.isEmpty) {
				const text = document.getText(selection);

				b.replace(selection, wrap(text, fore, aft));
			}
		});
	});
};

export function activate(context: ExtensionContext) {

	context.subscriptions.push(commands.registerCommand("wrapSelection", async () => {
		const { activeTextEditor: editor } = window;

		const symbol = await window.showInputBox({ placeHolder: "symbols" });
		wrapSelection(editor, symbol, symbol);
	}));

	context.subscriptions.push(
		commands.registerCommand(
			"wrapSelection.code-block",
			() => {
				const { activeTextEditor: editor } = window;
				wrapSelection(editor, "//:code-block-start:\r\n",  "\r\n//:code-block-end:");
			},
		),
	);

	context.subscriptions.push(
		commands.registerCommand(
			"wrapSelection.replace-block",
			() => {
				const { activeTextEditor: editor } = window;
				wrapSelection(editor, "//:replace-start:{\r\n\t//\"terms\":{ \r\n\t\t//\"foo\":\"bar\"\r\n\t//}\r\n//}\r\n",  "\r\n//:replace-end:");
			},
		),
	);

	context.subscriptions.push(
		commands.registerCommand(
			"wrapSelection.hide-block",
			() => {
				const { activeTextEditor: editor } = window;
				wrapSelection(editor, "//:hide-start:\r\n",  "\r\n//:hide-end:");
			},
		),
	);
}
