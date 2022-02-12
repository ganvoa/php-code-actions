import * as vscode from 'vscode';
import ClassInspector from '../application/ClassInspector';
import ConstructorCreator from '../application/ConstructorCreator';
import PropertyCreator from '../application/PropertyCreator';
import RegexpHelper from '../application/RegexpHelper';
import Property from '../domain/Property';
import { PropertyVisibility } from '../domain/PropertyVisibility';
import { VsCodeEnvironment } from '../infrastructure/VsCodeEnvironment';

export const addConstructorAction = (editor: vscode.TextEditor) => {

    const regexpHelper = new RegexpHelper();
    const propertyCreator = new PropertyCreator();
    const vsCode = new VsCodeEnvironment();
    const constructorCreator = new ConstructorCreator(propertyCreator, vsCode);
    const classInspector = new ClassInspector(vsCode, regexpHelper);
    const properties = classInspector.getProperties();
    const offset = classInspector.getOffsetForConstructor();

    vscode.window.showQuickPick(
        Array.from(properties.values())
            .filter(prop => prop.visibility !== PropertyVisibility.public)
            .map(prop => prop.name),
        {
            canPickMany: true,
            title: 'Add Constructor for'
        }).then((selectedProperties?: string[]) => {

            if (undefined === selectedProperties) { return; }

            const selectedAsArrayOfProperties: Property[] = [];
            selectedProperties.forEach(p => {
                let property = properties.get(p);
                if (undefined !== property) {
                    selectedAsArrayOfProperties.push(property);
                }
            });

            const constructor = constructorCreator.build(selectedAsArrayOfProperties);

            editor.insertSnippet(
                new vscode.SnippetString(constructor),
                editor.document.positionAt(offset.value)
            );
        });

};


