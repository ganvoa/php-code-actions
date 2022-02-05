import * as assert from 'assert';
import { suite, test } from 'mocha';
import ConstructorCreator from '../../application/ConstructorCreator';
import PropertyCreator from '../../application/PropertyCreator';
import Editor from '../../domain/Editor';
import PositionOffset from '../../domain/PositionOffset';
import Property from '../../domain/Property';
import { PropertyVisibility } from '../../shared/Property/types';
import { mock, when, instance } from 'ts-mockito';
import VsCode from '../../domain/VsCode';

const constructorExpected =
    `
/** 
 * @param mixed \\$property 
 * @param DateTime \\$propertyDate 
 * @param DateTime|null \\$propertyDateNullable 
 * @param DateTime|string|null \\$propertyDateStringNullable 
 * /
public function __construct(\\$property, DateTime \\$propertyDate, DateTime \\$propertyDateNullable, \\$propertyDateStringNullable) {
    \\$this->property = \\$property;
    \\$this->propertyDate = \\$propertyDate;
    \\$this->propertyDateNullable = \\$propertyDateNullable;
    \\$this->propertyDateStringNullable = \\$propertyDateStringNullable;
}
`;

suite('ConstructorCreator Suite', () => {

    test('should build the constructor correctly', () => {
        const properties: Property[] = [];

        properties.push(new Property(
            "property",
            "mixed",
            new PositionOffset(0),
            PropertyVisibility.private
        ));
        properties.push(new Property(
            "propertyDate",
            "DateTime",
            new PositionOffset(0),
            PropertyVisibility.private
        ));
        properties.push(new Property(
            "propertyDateNullable",
            "DateTime|null",
            new PositionOffset(0),
            PropertyVisibility.private
        ));
        properties.push(new Property(
            "propertyDateStringNullable",
            "DateTime|string|null",
            new PositionOffset(0),
            PropertyVisibility.private
        ));

        const vscodeMock: VsCode = mock<VsCode>();
        when(vscodeMock.getIndentation()).thenReturn('    ');
        let vscode: VsCode = instance(vscodeMock);

        const propertyCreator: PropertyCreator = new PropertyCreator();
        const editor: Editor = new Editor(vscode);
        const constructorCreator: ConstructorCreator = new ConstructorCreator(propertyCreator, editor);

        const constructorBuilt = constructorCreator.build(properties);
        assert.strictEqual(constructorBuilt.replace(/[\n\t\r\s]/gm, ''), constructorExpected.replace(/[\n\t\r\s]/gm, ''));
    });
});