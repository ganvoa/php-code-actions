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

    constructor(vsCode: VsCode) {
        this.vsCode = vsCode;
    }

    getTitle(): string {
        throw new Error("Method not implemented.");
    }

    getCommand(): string {
        throw new Error("Method not implemented.");
    }

    run(): void {

        if (!this.vsCode.hasActiveEditor()) {
            return;
        }

        if (null !== this.vsCode.getText().match(/__construct\(/)) {
            return;
        }

        const regexpHelper = new RegexpHelper();
        const propertyCreator = new PropertyCreator();
        const constructorCreator = new ConstructorCreator(propertyCreator, this.vsCode);
        const classInspector = new ClassInspector(this.vsCode, regexpHelper);
        const properties = classInspector.getProperties();
        const offset = classInspector.getOffsetForConstructor();

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

                const constructor = constructorCreator.build(selectedAsArrayOfProperties);
                this.vsCode.insertText(offset, constructor);
            });
    }
}