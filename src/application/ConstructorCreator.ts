import Editor from "../domain/Editor";
import Property from "../domain/Property";
import PropertyCreator from "./PropertyCreator";


export default class ConstructorCreator {

    propertyCreator: PropertyCreator;
    editor: Editor;

    constructor(propertyCreator: PropertyCreator, editor: Editor) {
        this.propertyCreator = propertyCreator;
        this.editor = editor;
    }

    build(selectedProperties: Property[]): string {

        const phpDocPre = `${this.editor.getBreakLine()}${this.editor.getIndentation()}/**`;
        const phpDocPost = `${this.editor.getBreakLine()}${this.editor.getIndentation()} */`;
        const constructorPre = `${this.editor.getBreakLine()}${this.editor.getIndentation()}public function __construct(`;
        const constructorPost = `)${this.editor.getBreakLine()}${this.editor.getIndentation()}{`;
        const constructorEnd = `${this.editor.getBreakLine()}${this.editor.getIndentation()}}`;

        let constructor = "";

        constructor = constructor.concat(phpDocPre);
        selectedProperties.forEach((prop: Property) => {
            constructor = constructor
                .concat(`${this.editor.getBreakLine()}${this.editor.getIndentation()} * `)
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
                .concat(`${this.editor.getBreakLine()}`)
                .concat(`${this.editor.getIndentation(2)}`)
                .concat('\\$this->')
                .concat(prop.name)
                .concat(' = \\$')
                .concat(prop.name)
                .concat(';');
        });

        return constructor.concat(constructorEnd);
    }
}
