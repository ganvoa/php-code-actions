import * as vscode from 'vscode';
import { getClassProperties } from '../shared/getClassProperties';
import { getLineForConstructor } from '../shared/getLineForConstructor';
import { buildConstructor } from '../shared/buildConstructor';
import { PropertyClass, PropertyVisibility } from '../shared/PropertyClass';

export const addConstructorAction = (editor: vscode.TextEditor) => {
    const properties: Map<string, PropertyClass> = getClassProperties(editor.document);
    const position: vscode.Position = getLineForConstructor(editor.document);

    vscode.window.showQuickPick(
        Array.from(properties.values())
            .filter(prop => prop.visibility !== PropertyVisibility.public)
            .map(prop => prop.name),
        {
            canPickMany: true,
            title: 'Add constructor for'
        }).then((selectedProperties?: string[]) => {

            if (undefined === selectedProperties)
                {return;}

            const selectedAsArrayOfProperties: PropertyClass[] = [];
            selectedProperties.forEach(p => {
                let property = properties.get(p);
                if (undefined !== property) {
                    selectedAsArrayOfProperties.push(property);
                }
            });

            editor.edit(edit => {
                const constructor = buildConstructor(selectedAsArrayOfProperties);
                edit.insert(
                    position,
                    constructor
                );
            });
        });

};


