import ClassInspector from "../application/ClassInspector";
import GetterCreator from "../application/GetterCreator";
import EditorAction from "../domain/EditorAction";
import VsCode from "../domain/VsCode";

export class AddGetterCodeAction implements EditorAction {

    vsCode: VsCode;
    classInspector: ClassInspector;
    getterCreator: GetterCreator;
    title: string = "Add Getter";
    command: string = "php-code-actions.AddGetter";

    constructor(vsCode: VsCode, classInspector: ClassInspector, getterCreator: GetterCreator) {
        this.vsCode = vsCode;
        this.getterCreator = getterCreator;
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
            return Promise.resolve();
        }

        const properties = this.classInspector.getNonPublicProperties();

        const selectedProperties: string[] = await this.vsCode.quickPickMultiple(
            'Add Getter for', Array.from(properties.values()).map(prop => prop.name));

        if (selectedProperties.length <= 0) {
            return Promise.resolve();
        }

        const offset = this.classInspector.getOffsetForGetter();
        let getter = '';
        selectedProperties.forEach(p => {
            let property = properties.get(p);
            if (undefined !== property) {
                getter = getter.concat(this.getterCreator.build(property));
            }
        });

        this.vsCode.insertText(offset, getter);
        return Promise.resolve();
    }
}