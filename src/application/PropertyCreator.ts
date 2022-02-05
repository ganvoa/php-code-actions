import Property from "../domain/Property";

export default class PropertyCreator {

    getForArgument(property: Property): string {
        if (
            property.numberOfTypes() === 1 &&
            !property.isMixed() &&
            !property.isPrimitiveType()
        ) {
            return property.typesAsString()
                .concat(' \\$')
                .concat(property.name);
        }

        return '\\$'.concat(property.name);
    }

    getForConstructor(property: Property): string {
        return this.getForArgument(property);
    }

    getForDoc(property: Property): string {
        return "@param ".concat(property.type).concat(" \\$").concat(property.name);
    }

}