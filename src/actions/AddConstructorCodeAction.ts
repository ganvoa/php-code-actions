import ClassInspector from "../application/ClassInspector";
import ConstructorCreator from "../application/ConstructorCreator";
import PropertyCreator from "../application/PropertyCreator";
import RegexpHelper from "../application/RegexpHelper";
import EditorAction from "../domain/EditorAction";
import Property from "../domain/Property";
import { PropertyVisibility } from "../domain/PropertyVisibility";
import VsCode from "../domain/VsCode";

export class AddConstructorCodeAction implements EditorAction {

    vsCode: VsCode;
    classInspector: ClassInspector;
    constructorCreator: ConstructorCreator;
    title: string = "Add Constructor";
    command: string = "php-code-actions.AddConstructor";

    constructor(vsCode: VsCode, classInspector: ClassInspector, constructorCreator: ConstructorCreator) {
        this.vsCode = vsCode;
        this.constructorCreator = constructorCreator;
        this.classInspector = classInspector;
    }

    getTitle(): string {
        return this.title;
    }

    getCommand(): string {
        return this.command;
    }

    run(): void {

        if (!this.vsCode.hasActiveEditor()) {
            return;
        }

        if (null !== this.vsCode.getText().match(/__construct\(/)) {
            return;
        }


        const properties = this.classInspector.getProperties();
        const offset = this.classInspector.getOffsetForConstructor();

        this.vsCode.showQuickPick(
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

                const constructor = this.constructorCreator.build(selectedAsArrayOfProperties);
                this.vsCode.insertText(offset, constructor);
            });
    }
}