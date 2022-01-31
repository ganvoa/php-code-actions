import * as vscode from 'vscode';

export function indentation(times: number = 1): string {

    const uri = vscode.window.activeTextEditor?.document.uri;
    const insertSpaces: boolean = vscode.workspace.getConfiguration('editor', uri)
        .get('insertSpaces') as boolean;

    if (insertSpaces) {
        return '\t'.repeat(times);
    }

    const repeatSpaces: number = vscode.workspace.getConfiguration('editor', uri)
        .get('tabSize') as number;

    return ' '.repeat(repeatSpaces).repeat(times);
}