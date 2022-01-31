import { PropertyClass } from "./Property/types";

export const phpDocPre = `\n\t/**`;
export const phpDocPost = `\n\t */`;
export const getterPre = `\n\tpublic function `;
export const getterPost = `() {`;
export const getterEnd = `\t\n\t}\n`;

export function buildGetter(property: PropertyClass) {

    let getter = "";

    getter = getter.concat(phpDocPre)
        .concat(`\n\t * `)
        .concat(propForPhpDoc(property))
        .concat(phpDocPost)
        .concat(getterPre)
        .concat(propForGetter(property))
        .concat(getterPost)
        .concat('\n\t\t')
        .concat('return $this->')
        .concat(property.name)
        .concat(';');

    return getter.concat(getterEnd);
}

function propForGetter(prop: PropertyClass): string {
    return "get".concat(prop.name);
}

function propForPhpDoc(prop: PropertyClass): string {
    return "@return ".concat(prop.type);
}

