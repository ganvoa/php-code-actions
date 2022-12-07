import * as assert from 'assert';
import { suite, test } from 'mocha';
import { instance, mock, when } from 'ts-mockito';
import PropertyCreator from '../../application/PropertyCreator';
import SetterCreator from '../../application/SetterCreator';
import EditorPreferences from '../../domain/EditorPreferences';
import PositionOffset from '../../domain/PositionOffset';
import Property from '../../domain/Property';
import { PropertyVisibility } from '../../domain/PropertyVisibility';
import VsCode from '../../domain/VsCode';

suite('SetterCreator Suite', () => {
  const runsWithGetPrefix: { expectedSetter: string; property: Property }[] = [
    {
      expectedSetter: `
            /**
             * @param mixed $property
             * @return self
             */
            public function setProperty($property) { 
                $this->property = $property;
                return $this;
            }`,
      property: new Property('property', 'mixed', new PositionOffset(0), PropertyVisibility.private)
    },
    {
      expectedSetter: `
            /**
             * @return self
             */
            public function setPropertyDate(DateTime $propertyDate) { 
                $this->propertyDate = $propertyDate;
                return $this;
            }`,
      property: new Property('propertyDate', 'DateTime', new PositionOffset(0), PropertyVisibility.private)
    },
    {
      expectedSetter: `
            /**
             * @param DateTime|null $propertyDateNullable
             * @return self
             */
            public function setPropertyDateNullable(DateTime $propertyDateNullable = null) { 
                $this->propertyDateNullable = $propertyDateNullable;
                return $this;
            }`,
      property: new Property('propertyDateNullable', 'DateTime|null', new PositionOffset(0), PropertyVisibility.private)
    },
    {
      expectedSetter: `
            /**
             * @param DateTime|string|null $propertyDateStringNullable
             * @return self
             */
            public function setPropertyDateStringNullable($propertyDateStringNullable = null) { 
                $this->propertyDateStringNullable = $propertyDateStringNullable;
                return $this;
            }`,
      property: new Property('propertyDateStringNullable', 'DateTime|string|null', new PositionOffset(0), PropertyVisibility.private)
    }
  ];

  test('should build the Setter correctly', () => {
    const editorPreferences = new EditorPreferences('    ', '\n');
    const vscodeMock: VsCode = mock<VsCode>();
    when(vscodeMock.getEditorPreferences()).thenReturn(editorPreferences);
    let vscode: VsCode = instance(vscodeMock);

    const propertyCreator: PropertyCreator = new PropertyCreator();
    const setterCreator: SetterCreator = new SetterCreator(propertyCreator, vscode);

    runsWithGetPrefix.forEach((object) => {
      const setterBuilt = setterCreator.build(object.property);
      assert.strictEqual(setterBuilt.replace(/[\n\t\r\s]/gm, ''), object.expectedSetter.replace(/[\n\t\r\s]/gm, ''));
    });
  });
});
