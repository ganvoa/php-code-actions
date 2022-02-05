import VsCode from "../domain/VsCode";
import Property from "../domain/Property";
import PositionOffset from "../domain/PositionOffset";
import RegexpHelper from "./RegexpHelper";
import { PropertyVisibility } from "../domain/PropertyVisibility";
import PropertyType from "../domain/PropertyType";

export default class ClassInspector {

    vscode: VsCode;
    regexpHelper: RegexpHelper;

    constructor(vscode: VsCode, regexpHelper: RegexpHelper) {
        this.vscode = vscode;
        this.regexpHelper = regexpHelper;
    }

    getOffsetForConstructor(): PositionOffset {
        const regex = /(private|protected|public)\s+\$(.+)\;/gm;

        let match: RegExpExecArray | null;
        let lastIndex = 0;
        while (match = regex.exec(this.vscode.getText())) {
            lastIndex = match.index;
        }

        return new PositionOffset(lastIndex);
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

    getProperties(): Map<string, Property> {
        const regex = /(@var\s+([\w\\|]+)[\t\r\n\s]{1}[\w\W]*?\*\/)?[\t\r\n\s]+(private|protected|public)\s+\$(.+)\;/gm;
        const properties = new Map<string, Property>();

        let match = null;
        const text = this.vscode.getText();
        while (match = regex.exec(text)) {
            const type = match[2] === undefined ? PropertyType.mixed : match[2];
            const visibility: PropertyVisibility = match[3] as PropertyVisibility;
            const name = match[4];
            const property: Property = new Property(
                name,
                type,
                new PositionOffset(match.index),
                visibility
            );
            properties.set(property.name, property);
        }

        return properties;
    };

}