import * as vscode from 'vscode';
import { AddConstructorCodeAction } from './actions/AddConstructorCodeAction';
import { AddGetterCodeAction } from './actions/AddGetterCodeAction';
import EditorAction from './domain/EditorAction';
import { VsCodeEnvironment } from './infrastructure/VsCodeEnvironment';

class CodeActionProvider implements vscode.CodeActionProvider {

	actions: EditorAction[];

	constructor(actions: EditorAction[]) {
		this.actions = actions;
	}

	public provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.Command[] {
		const codeActions: vscode.Command[] = [];

		for (let index = 0; index < this.actions.length; index++) {
			const action = this.actions[index];

			codeActions.push({
				command: action.getCommand(),
				title: action.getTitle()
			});
		}

		return codeActions;
	}
}

export const activate = (context: vscode.ExtensionContext) => {

	const vsCode: VsCodeEnvironment = new VsCodeEnvironment();

	const actions: EditorAction[] = [];
	actions.push(new AddConstructorCodeAction(vsCode));
	actions.push(new AddGetterCodeAction(vsCode));

	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider(
			{ pattern: "**/*.{php}", scheme: "file" },
			new CodeActionProvider(actions)
		)
	);

	for (let index = 0; index < actions.length; index++) {
		const action = actions[index];
		context.subscriptions.push(
			vscode.commands.registerCommand(action.getCommand(), action.run)
		);
	}
};

export function deactivate() { }
