import { TextDocument } from "vscode";
import { PropertyClass, PropertyType, PropertyVisibility } from "./PropertyClass";

/**
 * @param fileContent
 */
export function getClassProperties(document: TextDocument): Map<string, PropertyClass> {
    const regex = /(@var\s+([\w\\|]+)[\t\r\n\s]{1}[\w\W]*?\*\/)?[\t\r\n\s]+(private|protected|public)\s+\$(.+)\;/gm;
    const results = new Map<string, PropertyClass>();

    let match = null;
    while (match = regex.exec(document.getText())) {
        const type = match[2] === undefined ? PropertyType.mixed : match[2];
        const visibility: PropertyVisibility = match[3] as PropertyVisibility;
        const name = match[4];
        const property: PropertyClass = {
            name: name,
            type: type,
            position: document.positionAt(match.index),
            visibility: visibility
        };
        results.set(property.name, property);
    }

    return results;
};
