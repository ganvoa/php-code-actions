import * as vscode from 'vscode';
import EditorPreferences from '../domain/EditorPreferences';
import GetterConfiguration from '../domain/GetterConfiguration';
import PositionOffset from '../domain/PositionOffset';
import VsCode from '../domain/VsCode';

export class VsCodeEnvironment implements VsCode {

    insertText(offset: PositionOffset, content: string): void {
        const editor = this.getActiveTextEditor();
        editor.edit(edit => {
            edit.insert(
                editor.document.positionAt(offset.value),
                content
            );
        });
    }

    hasActiveEditor(): boolean {
        return !(null === vscode.window.activeTextEditor);
    }

    getEditorPreferences(): EditorPreferences {
        return new EditorPreferences(this.getIndentation(), '\n');
    }

    private getIndentation(): string {
        const editor = this.getActiveTextEditor();
        const uri = editor.document.uri;
        const insertSpaces: boolean = vscode.workspace.getConfiguration('editor', uri)
            .get('insertSpaces') as boolean;

        if (insertSpaces) {
            return '\t';
        }

        const repeatSpaces: number = vscode.workspace.getConfiguration('editor', uri)
            .get('tabSize') as number;

        return ' '.repeat(repeatSpaces);
    }

    getGetterConfiguration(): GetterConfiguration {
        const addPrefix = vscode.workspace.getConfiguration("php-code-actions").get("getter.addPrefix", true) as boolean;
        return new GetterConfiguration(addPrefix);
    }

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