import VsCode from "../domain/VsCode";
import Property from "../domain/Property";
import PositionOffset from "../domain/PositionOffset";
import RegexpHelper from "./RegexpHelper";
import { PropertyVisibility } from "../domain/PropertyVisibility";
import PropertyType from "../domain/PropertyType";

export default class ClassInspector {

    constructor(
        private vscode: VsCode,
        private regexpHelper: RegexpHelper) { }

    getOffsetForProperty(): PositionOffset {

        const properties = this.getProperties();
        let offset = new PositionOffset(0);

        if (0 === properties.size) {
            const regex = /([\w\W]*?)({)([\w\W]*)(})/gm;
            let match: RegExpExecArray | null = regex.exec(this.vscode.getText());
            if (null !== match) {
                const group = this.regexpHelper.getGroupOffset(match, 2);
                offset = group.end;
            }
        } else {
            let prop = Array.from(properties.values()).pop();
            if (prop) {
                offset = prop.offset;
            }
        }

        return offset;
    }

    getOffsetForConstructor(): PositionOffset {
        return this.getOffsetForProperty();
    }

    getOffsetForGetter(): PositionOffset {
        const regex = /([\w\W]*?)({)([\w\W]*)(})/gm;

        let match: RegExpExecArray | null = regex.exec(this.vscode.getText());
        let offset = new PositionOffset(0);
        if (null !== match) {
            const group = this.regexpHelper.getGroupOffset(match, 3);
            offset = group.end;
        }

        return offset;
    }

    getNonPublicProperties(): Map<string, Property> {
        const properties = this.getProperties();
        const propertiesSelected = Array.from(properties.values())
            .filter(prop => prop.visibility !== PropertyVisibility.public)
            .map(prop => prop.name);

        const selected: Map<string, Property> = new Map<string, Property>();
        propertiesSelected.forEach(value => {
            selected.set(value, properties.get(value) as Property);
        });

        return selected;
    }

    getProperties(): Map<string, Property> {
        const regex = /((@var\s+([\w\\|<>\s,\[\]]+)[\t\r\n\s]{1}[\w\W]*?\*\/)?[\t\r\n\s]+(private|protected|public)\s+\$(.+)\;)/gm;

        const properties = new Map<string, Property>();

        let match = null;
        const text = this.vscode.getText();
        while (match = regex.exec(text)) {
            const type = match[3] === undefined ? PropertyType.mixed : match[3].trim();
            const visibility: PropertyVisibility = match[4] as PropertyVisibility;
            const name = match[5];
            const property: Property = new Property(
                name,
                type,
                new PositionOffset(match.index + match[0].length),
                visibility
            );
            properties.set(property.name, property);
        }

        return properties;
    };

}