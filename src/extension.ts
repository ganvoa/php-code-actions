import * as vscode from 'vscode';
import * as constructor from './actions/AddConstructorAction';

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
			if (vscode.window.activeTextEditor)
				constructor.AddConstructorAction(vscode.window.activeTextEditor)
		}
		)
	);

	let disposable = vscode.commands.registerCommand('php-code-actions.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
