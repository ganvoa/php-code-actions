import { Position } from "vscode";

enum PropertyVisibility {
    public = 'public',
    private = 'private',
    protected = 'protected',
    none = ''
}

enum PropertyType {
    mixed = 'mixed',
    string = 'string',
    bool = 'bool',
    int = 'int',
    float = 'float'
}

const SCALAR_TYPES = [
    PropertyType.float,
    PropertyType.string,
    PropertyType.bool,
    PropertyType.int
];

type PropertyClass = {
    position: Position,
    name: string,
    visibility: PropertyVisibility,
    type: PropertyType | string,
};

export {
    PropertyClass,
    PropertyType,
    SCALAR_TYPES,
    PropertyVisibility
};