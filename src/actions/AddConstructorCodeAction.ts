import ClassInspector from "../application/ClassInspector";
import ConstructorCreator from "../application/ConstructorCreator";
import EditorAction from "../domain/EditorAction";
import Property from "../domain/Property";
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

    async run(): Promise<void> {

        if (!this.vsCode.hasActiveEditor()) {
            return;
        }

        if (null !== this.vsCode.getText().match(/__construct\(/)) {
            return;
        }

        const offset = this.classInspector.getOffsetForConstructor();
        const properties = this.classInspector.getNonPublicProperties();

        const selectedProperties: string[] = await this.vsCode.quickPickMultiple(
            'Add Constructor for', Array.from(properties.values()).map(prop => prop.name));

        if (selectedProperties.length <= 0) {
            return Promise.resolve();
        }

        const selectedAsArrayOfProperties: Property[] = [];
        selectedProperties.forEach(p => {
            let property = properties.get(p);
            if (undefined !== property) {
                selectedAsArrayOfProperties.push(property);
            }
        });

        const constructor = this.constructorCreator.build(selectedAsArrayOfProperties);
        this.vsCode.insertText(offset, constructor);
        return Promise.resolve();
    }
}