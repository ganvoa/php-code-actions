import * as vscode from 'vscode';
import { addConstructorAction } from './actions/addConstructorAction';
import { addGetterAction } from './actions/addGetterAction';

class CodeActionProvider implements vscode.CodeActionProvider {
	public provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.Command[] {
		const codeActions: vscode.Command[] = [];

		if (null === document.getText().match(/__construct\(/)) {
			codeActions.push({
				command: "php-code-actions.addConstructor",
				title: "Add Constructor"
			});
		}

		codeActions.push({
			command: "php-code-actions.addGetter",
			title: "Add Getter"
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

	context.subscriptions.push(
		vscode.commands.registerCommand("php-code-actions.addGetter", () => {
			if (vscode.window.activeTextEditor) {
				addGetterAction(vscode.window.activeTextEditor);
			}
		})
	);
};

export function deactivate() { }
