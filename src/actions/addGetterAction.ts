import * as vscode from 'vscode';
import { getProperties } from '../shared/Class/getProperties';
import { PropertyClass, PropertyVisibility } from '../shared/Property/types';
import { buildGetter } from '../shared/buildGetter';
import { getLineForGetter } from '../shared/Class/getLineForGetter';

export const addGetterAction = (editor: vscode.TextEditor) => {
    const properties: Map<string, PropertyClass> = getProperties(editor.document);
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


