import { isPrimitiveType, PropertyClass, PropertyType } from "./types";

export function getForArgument(property: PropertyClass): string {
    if (
        property.type !== PropertyType.mixed &&
        !isPrimitiveType(property.type) &&
        (
            (property.type.split('|').length <= 2 && property.type.includes('null') === true)
            ||
            (property.type.split('|').length <= 1 && property.type.includes('null') === false)
        )
    ) {
        return property.type
            .replace("|null", "")
            .replace("null|", "")
            .concat(' \\$')
            .concat(property.name);
    }

    return '\\$'.concat(property.name);
}