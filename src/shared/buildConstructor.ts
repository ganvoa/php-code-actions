import { PropertyClass, PropertyType } from "./PropertyClass";

export const phpDocPre = `\n\t/**`;
export const phpDocPost = `\n\t */`;
export const constructorPre = `\n\tpublic function __constructor(`;
export const constructorPost = `) {`;
export const constructorEnd = `\t\n\t}\n`;

export function buildConstructor(selectedProperties: PropertyClass[]) {

    let constructor = "";

    constructor = constructor.concat(phpDocPre);
    selectedProperties.forEach((prop: PropertyClass, idx: number) => {

        constructor = constructor
            .concat(`\n\t * `)
            .concat(propForPhpDoc(prop));
    });
    constructor = constructor.concat(phpDocPost);


    constructor = constructor.concat(constructorPre);
    selectedProperties.forEach((prop: PropertyClass, idx: number) => {
        constructor = constructor
            .concat(propForConstructor(prop));

        if (idx < selectedProperties.length - 1) {
            constructor = constructor.concat(', ');
        }
    });
    constructor = constructor.concat(constructorPost);

    selectedProperties.forEach((prop: PropertyClass) => {
        constructor = constructor
            .concat('\n\t\t', '$this->', prop.name, ' = $', prop.name, ';');
    });

    return constructor.concat(constructorEnd);
}

function propForConstructor(prop: PropertyClass): string {
    if (prop.type !== PropertyType.mixed) {
        return prop.type
            .concat(' $').concat(prop.name);
    }

    return '$'.concat(prop.name);
}

function propForPhpDoc(prop: PropertyClass): string {
    return "@param ".concat(prop.type).concat(" $").concat(prop.name);
}

