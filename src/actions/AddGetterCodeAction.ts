import ClassInspector from "../application/ClassInspector";
import GetterCreator from "../application/GetterCreator";
import PropertyCreator from "../application/PropertyCreator";
import RegexpHelper from "../application/RegexpHelper";
import EditorAction from "../domain/EditorAction";
import { PropertyVisibility } from "../domain/PropertyVisibility";
import VsCode from "../domain/VsCode";

export class AddGetterCodeAction implements EditorAction {

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

        const regexpHelper = new RegexpHelper();
        const propertyCreator = new PropertyCreator();
        const getterCreator = new GetterCreator(propertyCreator, this.vsCode);
        const classInspector = new ClassInspector(this.vsCode, regexpHelper);
        const properties = classInspector.getProperties();
        const offset = classInspector.getOffsetForGetter();
    
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
                        const getter = getterCreator.build(property);
                        this.vsCode.insertText(offset, getter);
                    }
                });
            });
    }
}