import PositionOffset from './PositionOffset';
import { PropertyVisibility } from './PropertyVisibility';

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
    return this.typesAsString().trim() !== '';
  }

  numberOfTypes(): number {
    return this.typesAsString().split('|').length;
  }

  typesAsString(): string {
    return this.type.replace('|null', '').replace('null|', '');
  }

  isNullable(): boolean {
    return this.type.includes('null');
  }

  isMixed(): boolean {
    return ['mixed'].includes(this.type);
  }

  isArray(): boolean {
    return this.type.search(/\[/) !== -1 || this.type.search(/\</) !== -1;
  }

  isPrimitiveType(): boolean {
    return ['bool', 'string', 'int', 'float', 'array'].includes(this.type) || this.type.search(/array/) !== -1;
  }
}
