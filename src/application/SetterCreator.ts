import Property from '../domain/Property';
import VsCode from '../domain/VsCode';
import PropertyCreator from './PropertyCreator';

export default class SetterCreator {
  propertyCreator: PropertyCreator;
  vsCode: VsCode;

  constructor(propertyCreator: PropertyCreator, vsCode: VsCode) {
    this.propertyCreator = propertyCreator;
    this.vsCode = vsCode;
  }

  build(property: Property): string {
    const breakLine = this.vsCode.getEditorPreferences().breakLine;
    const indentation = this.vsCode.getEditorPreferences().indentation;

    const phpDocPre = `${indentation}/**`;
    const phpDocPost = `${breakLine}${indentation} */`;
    const methodPre = `${breakLine}${indentation}public function `;
    const methodPost = `(${this.propertyCreator.getForConstructor(property)})${breakLine}${indentation}{`;
    const methodEnd = `${indentation}${breakLine}${indentation}}`;

    let method = '';

    method = method.concat(phpDocPre);
    if (property.shouldBeOnDoc()) {
      method = method.concat(`${breakLine}${indentation} * `).concat(this.propertyCreator.getForDoc(property));
    }
    method = method
      .concat(`${breakLine}${indentation} * `)
      .concat(`@return self`)
      .concat(phpDocPost)
      .concat(methodPre)
      .concat(property.setterName())
      .concat(methodPost)
      .concat(`${breakLine}${indentation.repeat(2)}`)
      .concat(`$this->${property.name} = $${property.name};`)
      .concat(`${breakLine}${indentation.repeat(2)}`)
      .concat('return $this')
      .concat(';');

    return method.concat(methodEnd);
  }
}
