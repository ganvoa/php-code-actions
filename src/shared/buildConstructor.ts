import { breakLine } from "./Document/breakLine";
import { indentation } from "./Document/indentation";
import { getForArgument } from "./Property/getForArgument";
import { PropertyClass } from "./Property/types";

const phpDocPre = `${breakLine()}${indentation()}/**`;
const phpDocPost = `${breakLine()}${indentation()} */`;
const constructorPre = `${breakLine()}${indentation()}public function __construct(`;
const constructorPost = `)${breakLine()}${indentation()}{`;
const constructorEnd = `${breakLine()}${indentation()}}`;

export function buildConstructor(selectedProperties: PropertyClass[]) {

    let constructor = "";

    constructor = constructor.concat(phpDocPre);
    selectedProperties.forEach((prop: PropertyClass) => {
        constructor = constructor
            .concat(`${breakLine()}${indentation()} * `)
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
            .concat(`${breakLine()}`)
            .concat(`${indentation(2)}`)
            .concat('\\$this->')
            .concat(prop.name)
            .concat(' = \\$')
            .concat(prop.name)
            .concat(';');
    });

    return constructor.concat(constructorEnd);
}

function propForConstructor(prop: PropertyClass): string {
    return getForArgument(prop);
}

function propForPhpDoc(prop: PropertyClass): string {
    return "@param ".concat(prop.type).concat(" \\$").concat(prop.name);
}

