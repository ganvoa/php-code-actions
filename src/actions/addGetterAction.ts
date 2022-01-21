import * as vscode from 'vscode';
import { getClassProperties } from '../shared/getClassProperties';
import { PropertyClass, PropertyVisibility } from '../shared/types';
import { buildGetter } from '../shared/buildGetter';
import { getLineForGetter } from '../shared/getLineForGetter';

export const addGetterAction = (editor: vscode.TextEditor) => {
    const properties: Map<string, PropertyClass> = getClassProperties(editor.document);
    const position: vscode.Position = getLineForGetter(editor.document);

    vscode.window.showQuickPick(
        Array.from(properties.values())
            .filter(prop => prop.visibility !== PropertyVisibility.public)
            .map(prop => prop.name),
        {
            canPickMany: true,
            title: 'Add Getter for'
        }).then((selectedProperties?: string[]) => {

            if (undefined === selectedProperties) { return; }

            editor.edit(edit => {
                selectedProperties.forEach(p => {
                    let property = properties.get(p);
                    if (undefined !== property) {
                        const getter = buildGetter(property);
                        edit.insert(
                            position,
                            getter
                        );
                    }
                });
            });

        });

};


