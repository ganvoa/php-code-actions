import * as vscode from 'vscode';
import { getClassProperties } from '../shared/GetClassProperties';
import { getLineForConstructor } from '../shared/GetLineForConstructor';

const constructorPre = `
    public function __constructor(`
const constructorPost = `) {
    `
const constructorEnd = `
    }`

/**
 * @param editor
 */
export const addConstructorAction = (editor: vscode.TextEditor) => {
    const properties: Array<string> = getClassProperties(editor.document);
    const position: vscode.Position = getLineForConstructor(editor.document);

    vscode.window.showQuickPick(properties, {
        canPickMany: true,
        title: 'Add constructor for'
    }).then((selectedProperties) => {

        if (undefined === selectedProperties)
            return;

        let constructor = constructorPre;

        editor.edit(edit => {
            selectedProperties.forEach((prop, idx) => {
                constructor = constructor.concat('$', prop)
                if (idx < selectedProperties.length - 1) {
                    constructor = constructor.concat(', ')
                }
            });
            constructor = constructor.concat(constructorPost);
            selectedProperties.forEach(prop => {
                constructor = constructor
                    .concat('$this->', prop, ' = $', prop, ';\n')
            });
            constructor = constructor.concat(constructorEnd);
            edit.insert(
                position,
                constructor
            );
        });
    });

};
