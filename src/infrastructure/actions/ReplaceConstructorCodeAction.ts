import ClassInspector from "../../application/ClassInspector";
import ConstructorCreator from "../../application/ConstructorCreator";
import EditorAction from "../../domain/EditorAction";
import Property from "../../domain/Property";
import VsCode from "../../domain/VsCode";

export class ReplaceConstructorCodeAction implements EditorAction {

    vsCode: VsCode;
    classInspector: ClassInspector;
    constructorCreator: ConstructorCreator;
    title: string = "Replace Constructor";
    command: string = "php-code-actions.replaceConstructor";

    constructor(vsCode: VsCode, classInspector: ClassInspector, constructorCreator: ConstructorCreator) {
        this.vsCode = vsCode;
        this.constructorCreator = constructorCreator;
        this.classInspector = classInspector;
    }

    runnable(): boolean {
        if (!this.vsCode.hasActiveEditor()) {
            return false;
        }

        if (null === this.vsCode.getText().match(/__construct\(/)) {
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

        const groupOffset = this.classInspector.getConstructorGroupOffset();
        const properties = this.classInspector.getNonPublicProperties();

        if (groupOffset === null) {
            this.vsCode.showErrorMessage("constructor not found");
            return Promise.resolve();
        }

        let selectedProperties: string[] = [];
        if (properties.size > 0) {
            selectedProperties = await this.vsCode.quickPickMultiple(
                'Replace Constructor with', Array.from(properties.values()).map(prop => prop.name));
        }

        const selectedAsArrayOfProperties: Property[] = [];
        selectedProperties.forEach(p => {
            let property = properties.get(p) as Property;
            selectedAsArrayOfProperties.push(property);
        });

        const constructor = this.constructorCreator.build(selectedAsArrayOfProperties);
        await this.vsCode.replaceText(groupOffset, constructor);
        return Promise.resolve();
    }
}