import * as vscode from 'vscode';

/**
 * @param editor
 */
export const AddConstructorAction = (editor: vscode.TextEditor) => {
    const text = editor.document.getText();
    editor.edit(edit => {
        edit.insert(
            new vscode.Position(0, 0),
            'Hola\n'
        );
    });
};
