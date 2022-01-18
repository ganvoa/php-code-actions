import { PropertyClass } from "./PropertyClass";

export const constructorPre = `\n\tpublic function __constructor(`;
export const constructorPost = `) {`;
export const constructorEnd = `\t\n\t}\n`;

export function buildConstructor(selectedProperties: PropertyClass[]) {

    let constructor = constructorPre;

    selectedProperties.forEach((prop: PropertyClass, idx: number) => {
        constructor = constructor.concat('$', prop.name);
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
