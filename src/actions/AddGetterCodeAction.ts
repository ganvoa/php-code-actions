import ClassInspector from "../application/ClassInspector";
import GetterCreator from "../application/GetterCreator";
import PropertyCreator from "../application/PropertyCreator";
import RegexpHelper from "../application/RegexpHelper";
import EditorAction from "../domain/EditorAction";
import { PropertyVisibility } from "../domain/PropertyVisibility";
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

    run(): void {

        if (!this.vsCode.hasActiveEditor()) {
            return;
        }

        const properties = this.classInspector.getProperties();
        const offset = this.classInspector.getOffsetForGetter();

        this.vsCode.showQuickPick(
            Array.from(properties.values())
                .filter(prop => prop.visibility !== PropertyVisibility.public)
                .map(prop => prop.name),
            {
                canPickMany: true,
                title: 'Add Getter for'
            }).then((selectedProperties?: string[]) => {

                if (undefined === selectedProperties) { return; }

                selectedProperties.forEach(p => {
                    let property = properties.get(p);
                    if (undefined !== property) {
                        const getter = this.getterCreator.build(property);
                        this.vsCode.insertText(offset, getter);
                    }
                });
            });
    }
}