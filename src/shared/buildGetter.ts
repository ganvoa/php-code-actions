import * as vscode from 'vscode';
import { breakLine } from "./Document/breakLine";
import { indentation } from "./Document/indentation";
import { PropertyClass } from "./Property/types";

const phpDocPre = `${breakLine()}${indentation()}/**`;
const phpDocPost = `${breakLine()}${indentation()} */`;
const getterPre = `${breakLine()}${indentation()}public function `;
const getterPost = `()${breakLine()}${indentation()}{`;
const getterEnd = `${indentation()}${breakLine()}${indentation()}}${breakLine()}`;

export function buildGetter(property: PropertyClass) {

    let getter = "";

    getter = getter.concat(phpDocPre)
        .concat(`${breakLine()}${indentation()} * `)
        .concat(propForPhpDoc(property))
        .concat(phpDocPost)
        .concat(getterPre)
        .concat(propForGetter(property))
        .concat(getterPost)
        .concat(`${breakLine()}${indentation(2)}`)
        .concat('return $this->')
        .concat(property.name)
        .concat(';');

    return getter.concat(getterEnd);
}

function propForGetter(prop: PropertyClass): string {

    let addPrefix: boolean = vscode.workspace.getConfiguration("php-code-actions").get("getter.addPrefix", true) as boolean;

    return addPrefix ?
        "get".concat(prop.name.charAt(0).toUpperCase() + prop.name.slice(1)) : prop.name;
}

function propForPhpDoc(prop: PropertyClass): string {
    return "@return ".concat(prop.type);
}

