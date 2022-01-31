import * as vscode from 'vscode';
import { getProperties } from '../shared/Class/getProperties';
import { getPositionForConstructor } from '../shared/Class/getPositionForConstructor';
import { buildConstructor } from '../shared/buildConstructor';
import { PropertyClass, PropertyVisibility } from '../shared/Property/types';

export const addConstructorAction = (editor: vscode.TextEditor) => {
    const properties: Map<string, PropertyClass> = getProperties(editor.document);
    const position: vscode.Position = getPositionForConstructor(editor.document);

    vscode.window.showQuickPick(
        Array.from(properties.values())
            .filter(prop => prop.visibility !== PropertyVisibility.public)
            .map(prop => prop.name),
        {
            canPickMany: true,
            title: 'Add Getter for'
        }).then((selectedProperties?: string[]) => {

            if (undefined === selectedProperties) { return; }

            const selectedAsArrayOfProperties: PropertyClass[] = [];
            selectedProperties.forEach(p => {
                let property = properties.get(p);
                if (undefined !== property) {
                    selectedAsArrayOfProperties.push(property);
                }
            });

            const constructor = buildConstructor(selectedAsArrayOfProperties);

            editor.insertSnippet(
                new vscode.SnippetString(constructor),
                position
            );
        });

};


