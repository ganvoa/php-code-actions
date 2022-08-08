import Property from '../domain/Property';

export default class PropertyCreator {
  getSnippet(): string {
    const snippet = `\t/** @var \${1:mixed} */\n\t\${2|private,protected,public|} $\${3:propertyName};`;
    return snippet;
  }

  getForArgument(property: Property): string {
    if (property.numberOfTypes() === 1 && !property.isArray() && !property.isMixed() && !property.isPrimitiveType()) {
      return property.typesAsString().concat(' $').concat(property.name);
    }

    return '$'.concat(property.name);
  }

  getForConstructor(property: Property): string {
    return this.getForArgument(property);
  }

  getForDoc(property: Property): string {
    return '@param '.concat(property.type).concat(' $').concat(property.name);
  }

  getForReturnDoc(property: Property): string {
    return '@return '.concat(property.type);
  }
}
