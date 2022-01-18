import { Position } from "vscode";

enum PropertyVisibility {
    public = 'public',
    private = 'private',
    protected = 'protected',
    none = ''
}

enum PropertyType {
    mixed = 'mixed'
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
    PropertyVisibility
};