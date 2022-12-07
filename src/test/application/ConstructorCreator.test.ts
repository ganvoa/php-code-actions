import * as assert from 'assert';
import { suite, test } from 'mocha';
import { instance, mock, when } from 'ts-mockito';
import ConstructorCreator from '../../application/ConstructorCreator';
import PropertyCreator from '../../application/PropertyCreator';
import EditorPreferences from '../../domain/EditorPreferences';
import PositionOffset from '../../domain/PositionOffset';
import Property from '../../domain/Property';
import { PropertyVisibility } from '../../domain/PropertyVisibility';
import VsCode from '../../domain/VsCode';

const constructorExpected = `
/** 
 * @param mixed $property 
 * @param DateTime[] $propertyDateArray 
 * @param DateTime|null $propertyDateNullable 
 * @param DateTime|string|null $propertyDateStringNullable 
 * @param string $stringProperty 
 * /
public function __construct($property, DateTime $propertyDate, $propertyDateArray, DateTime $propertyDateNullable = null, $propertyDateStringNullable = null, $stringProperty) {
  $this->property = $property;
  $this->propertyDate = $propertyDate;
  $this->propertyDateArray = $propertyDateArray;
  $this->propertyDateNullable = $propertyDateNullable;
  $this->propertyDateStringNullable = $propertyDateStringNullable;
  $this->stringProperty = $stringProperty;
}
`;

suite('ConstructorCreator Suite', () => {
  test('should build the constructor correctly', () => {
    const properties: Property[] = [];

    properties.push(new Property('property', 'mixed', new PositionOffset(0), PropertyVisibility.private));
    properties.push(new Property('propertyDate', 'DateTime', new PositionOffset(0), PropertyVisibility.private));
    properties.push(new Property('propertyDateArray', 'DateTime[]', new PositionOffset(0), PropertyVisibility.private));
    properties.push(new Property('propertyDateNullable', 'DateTime|null', new PositionOffset(0), PropertyVisibility.private));
    properties.push(new Property('propertyDateStringNullable', 'DateTime|string|null', new PositionOffset(0), PropertyVisibility.private));
    properties.push(new Property('stringProperty', 'string', new PositionOffset(0), PropertyVisibility.private));

    const editorPreferences = new EditorPreferences('    ', '\n');
    const vscodeMock: VsCode = mock<VsCode>();
    when(vscodeMock.getEditorPreferences()).thenReturn(editorPreferences);
    let vscode: VsCode = instance(vscodeMock);

    const propertyCreator: PropertyCreator = new PropertyCreator();
    const constructorCreator: ConstructorCreator = new ConstructorCreator(propertyCreator, vscode);

    const constructorBuilt = constructorCreator.build(properties);
    assert.strictEqual(constructorBuilt.replace(/[\n\t\r\s]/gm, ''), constructorExpected.replace(/[\n\t\r\s]/gm, ''));
  });
});
