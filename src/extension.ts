import * as vscode from 'vscode';
import { addConstructorAction } from './actions/addConstructorAction';

export class CodeActionProvider implements vscode.CodeActionProvider {
	public provideCodeActions(): vscode.Command[] {
		const editor = vscode.window.activeTextEditor;
		const codeActions: vscode.Command[] = [];

		if (!editor) {
			return codeActions;
		}

		codeActions.push({
			command: "php-code-actions.addConstructor",
			title: "Add Constructor"
		});

		return codeActions;
	}
}

export const activate = (context: vscode.ExtensionContext) => {

	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider(
			{ pattern: "**/*.{php}", scheme: "file" },
			new CodeActionProvider()
		)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("php-code-actions.addConstructor", () => {
			if (vscode.window.activeTextEditor) {
				addConstructorAction(vscode.window.activeTextEditor);
			}
		})
	);
};

export function deactivate() { }
