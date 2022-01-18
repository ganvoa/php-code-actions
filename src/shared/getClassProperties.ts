import { Position, TextDocument } from "vscode";
import { PropertyClass, PropertyType, PropertyVisibility } from "./PropertyClass";

/**
 * @param fileContent
 */
export function getClassProperties(document: TextDocument): Map<string, PropertyClass> {
    const regex = /(private|protected|public)\s+\$(.+)\;/gm;
    const results = new Map<string, PropertyClass>();

    let match = null;
    while (match = regex.exec(document.getText())) {
        const visibility: PropertyVisibility = match[1] as PropertyVisibility;
        const property: PropertyClass = {
            name: match[2],
            type: PropertyType.mixed,
            position: document.positionAt(match.index),
            visibility: visibility
        };
        results.set(property.name, property);
    }

    return results;
};
