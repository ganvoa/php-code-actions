import * as vscode from 'vscode';
import VsCode from '../domain/VsCode';

export class VsCodeEnvironment implements VsCode {

    getPositionAt(offset: number): vscode.Position {
        return this.getCurrentDocument().positionAt(offset);
    }

    getText(): string {
        return this.getCurrentDocument().getText();
    }

    getCurrentDocument(): vscode.TextDocument {
        return this.getActiveTextEditor().document;
    }

    getActiveTextEditor(): vscode.TextEditor {
        if (!vscode.window.activeTextEditor) {
            throw new Error('Theres no active text editor');
        }

        return vscode.window.activeTextEditor;
    }

    showErrorMessage(message: string): void {
        vscode.window.showErrorMessage(message);
    }

    showQuickPick(items: readonly string[] | Thenable<readonly string[]>, options?: any, token?: any): Thenable<string[] | undefined> {
        return vscode.window.showQuickPick(items, options, token);
    }
}