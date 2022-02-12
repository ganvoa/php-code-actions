import * as vscode from 'vscode';
import RegexpHelper from '../application/RegexpHelper';
import PropertyCreator from '../application/PropertyCreator';
import { VsCodeEnvironment } from '../infrastructure/VsCodeEnvironment';
import GetterCreator from '../application/GetterCreator';
import ClassInspector from '../application/ClassInspector';
import { PropertyVisibility } from '../domain/PropertyVisibility';

export const addGetterAction = (editor: vscode.TextEditor) => {

    const regexpHelper = new RegexpHelper();
    const propertyCreator = new PropertyCreator();
    const vsCode = new VsCodeEnvironment();
    const getterCreator = new GetterCreator(propertyCreator, vsCode);
    const classInspector = new ClassInspector(vsCode, regexpHelper);
    const properties = classInspector.getProperties();
    const offset = classInspector.getOffsetForGetter();

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
                        const getter = getterCreator.build(property);
                        edit.insert(
                            editor.document.positionAt(offset.value),
                            getter
                        );
                    }
                });
            });

        });

};


