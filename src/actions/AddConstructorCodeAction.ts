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

    runnable(): boolean {
        if (!this.vsCode.hasActiveEditor()) {
            return false;
        }

        if (null !== this.vsCode.getText().match(/__construct\(/)) {
            return false;
        }

        return true;
    }

    getTitle(): string {
        return this.title;
    }

    getCommand(): string {
        return this.command;
    }

    async run(): Promise<void> {

        if (!this.runnable()) {
            return Promise.resolve();
        }

        const offset = this.classInspector.getOffsetForConstructor();
        const properties = this.classInspector.getNonPublicProperties();

        let selectedProperties: string[] = [];
        if (properties.size > 0) {
            selectedProperties = await this.vsCode.quickPickMultiple(
                'Add Constructor for', Array.from(properties.values()).map(prop => prop.name));
        }

        const selectedAsArrayOfProperties: Property[] = [];
        selectedProperties.forEach(p => {
            let property = properties.get(p) as Property;
            selectedAsArrayOfProperties.push(property);
        });

        const constructor = this.constructorCreator.build(selectedAsArrayOfProperties);
        await this.vsCode.insertText(offset, constructor);
        return Promise.resolve();
    }
}