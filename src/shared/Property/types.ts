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

function isPrimitiveType(type: string): boolean {
    return ['bool', 'string', 'int', 'float'].includes(type);
}

type PropertyClass = {
    position: Position,
    name: string,
    visibility: PropertyVisibility,
    type: PropertyType | string,
};

export {
    PropertyClass,
    PropertyType,
    PropertyVisibility,
    isPrimitiveType
};