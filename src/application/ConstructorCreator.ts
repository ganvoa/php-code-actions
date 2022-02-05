import Property from "../domain/Property";
import VsCode from "../domain/VsCode";
import PropertyCreator from "./PropertyCreator";

export default class ConstructorCreator {

    propertyCreator: PropertyCreator;
    vsCode: VsCode;

    constructor(propertyCreator: PropertyCreator, vsCode: VsCode) {
        this.propertyCreator = propertyCreator;
        this.vsCode = vsCode;
    }

    build(selectedProperties: Property[]): string {

        const breakLine = this.vsCode.getEditorPreferences().breakLine;
        const indentation = this.vsCode.getEditorPreferences().indentation;

        const phpDocPre = `${breakLine}${indentation}/**`;
        const phpDocPost = `${breakLine}${indentation} */`;
        const constructorPre = `${breakLine}${indentation}public function __construct(`;
        const constructorPost = `)${breakLine}${indentation}{`;
        const constructorEnd = `${breakLine}${indentation}}`;

        let constructor = "";

        constructor = constructor.concat(phpDocPre);
        selectedProperties.forEach((prop: Property) => {
            constructor = constructor
                .concat(`${breakLine}${indentation} * `)
                .concat(this.propertyCreator.getForDoc(prop));
        });

        constructor = constructor.concat(phpDocPost);

        constructor = constructor.concat(constructorPre);
        selectedProperties.forEach((prop: Property, idx: number) => {
            constructor = constructor
                .concat(this.propertyCreator.getForConstructor(prop));

            if (idx < selectedProperties.length - 1) {
                constructor = constructor.concat(', ');
            }
        });
        constructor = constructor.concat(constructorPost);

        selectedProperties.forEach((prop: Property) => {
            constructor = constructor
                .concat(`${breakLine}`)
                .concat(`${indentation.repeat(2)}`)
                .concat('\\$this->')
                .concat(prop.name)
                .concat(' = \\$')
                .concat(prop.name)
                .concat(';');
        });

        return constructor.concat(constructorEnd);
    }
}
