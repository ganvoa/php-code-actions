import * as vscode from 'vscode';
import { AddConstructorCodeAction } from './infrastructure/actions/AddConstructorCodeAction';
import { AddGetterCodeAction } from './infrastructure/actions/AddGetterCodeAction';
import { AddPropertyCodeAction } from './infrastructure/actions/AddPropertyCodeAction';
import ClassInspector from './application/ClassInspector';
import ConstructorCreator from './application/ConstructorCreator';
import GetterCreator from './application/GetterCreator';
import PropertyCreator from './application/PropertyCreator';
import RegexpHelper from './application/RegexpHelper';
import EditorAction from './domain/EditorAction';
import { VsCodeEnvironment } from './infrastructure/VsCodeEnvironment';
import { ReplaceConstructorCodeAction } from './infrastructure/actions/ReplaceConstructorCodeAction';

class CodeActionProvider implements vscode.CodeActionProvider {

	actions: EditorAction[];

	constructor(actions: EditorAction[]) {
		this.actions = actions;
	}

	public provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.CodeAction[] {
		const codeActions: vscode.CodeAction[] = [];

		for (let index = 0; index < this.actions.length; index++) {
			const action = this.actions[index];

			if (action.runnable()) {
				const vsCodeAction = new vscode.CodeAction(action.getTitle(), vscode.CodeActionKind.Refactor);
				vsCodeAction.command = {
					command: action.getCommand(),
					title: action.getTitle()
				};
				codeActions.push(vsCodeAction);
			}

		}

		return codeActions;
	}
}

export const activate = (context: vscode.ExtensionContext) => {

	const actions: EditorAction[] = [];

	const vsCode: VsCodeEnvironment = new VsCodeEnvironment();
	const regexpHelper = new RegexpHelper();
	const propertyCreator = new PropertyCreator();
	const constructorCreator = new ConstructorCreator(propertyCreator, vsCode);
	const classInspector = new ClassInspector(vsCode, regexpHelper);
	const getterCreator = new GetterCreator(propertyCreator, vsCode);

	actions.push(new ReplaceConstructorCodeAction(vsCode, classInspector, constructorCreator));
	actions.push(new AddConstructorCodeAction(vsCode, classInspector, constructorCreator));
	actions.push(new AddGetterCodeAction(vsCode, classInspector, getterCreator));
	actions.push(new AddPropertyCodeAction(vsCode, classInspector, propertyCreator));

	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider(
			{ pattern: "**/*.{php}", scheme: "file" },
			new CodeActionProvider(actions)
		)
	);

	for (let index = 0; index < actions.length; index++) {
		const action = actions[index];
		context.subscriptions.push(
			vscode.commands.registerCommand(action.getCommand(), () => {
				action.run();
			})
		);
	}
};

export function deactivate() { }
