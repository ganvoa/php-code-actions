import { PropertyVisibility } from "../shared/Property/types";
import PositionOffset from "./PositionOffset";

export default class Property {

    readonly name: string;
    readonly type: string;
    readonly offset: PositionOffset;
    readonly visibility: PropertyVisibility;

    constructor(name: string, type: string, position: PositionOffset, visibility: PropertyVisibility) {
        this.name = name;
        this.type = type;
        this.offset = position;
        this.visibility = visibility;
    }

    hasType(): boolean {
        return this.typesAsString().trim() !== "";
    }

    numberOfTypes(): number {
        return this.typesAsString().split('|').length;
    }

    typesAsString(): string {
        return this.type
            .replace("|null", "")
            .replace("null|", "");
    }

    isNullable(): boolean {
        return this.type.includes('null');
    }

    isMixed(): boolean {
        return ['mixed'].includes(this.type);
    }

    isPrimitiveType(): boolean {
        return ['bool', 'string', 'int', 'float'].includes(this.type);
    }
}