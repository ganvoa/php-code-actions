import Property from '../domain/Property';

export default class PropertyCreator {
  getSnippet(): string {
    const snippet = `\t/** @var \${1:mixed} */\n\t\${2|private,protected,public|} $\${3:propertyName};`;
    return snippet;
  }

  getForArgument(property: Property): string {
    let prop = '';

    if (property.numberOfTypes() === 1 && !property.isArray() && !property.isMixed() && !property.isPrimitiveType()) {
      prop = property.typesAsString().concat(' $').concat(property.name);
    } else {
      prop = '$'.concat(property.name);
    }

    if (property.isNullable()) {
      prop = prop.concat(' = null');
    }

    return prop;
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
