import * as assert from 'assert';
import { suite, test } from 'mocha';
import PropertyCreator from '../../application/PropertyCreator';
import PositionOffset from '../../domain/PositionOffset';
import Property from '../../domain/Property';
import { mock, when, instance } from 'ts-mockito';
import VsCode from '../../domain/VsCode';
import { PropertyVisibility } from '../../domain/PropertyVisibility';
import EditorPreferences from '../../domain/EditorPreferences';
import GetterCreator from '../../application/GetterCreator';
import GetterConfiguration from '../../domain/GetterConfiguration';

suite('GetterCreator Suite', () => {

    const runsWithGetPrefix: { expectedGetter: string, property: Property }[] = [
        {
            expectedGetter: `
            /**
             * @return mixed
             */
            public function getProperty() { 
                return$this->property;
            }`,
            property: new Property("property", "mixed", new PositionOffset(0), PropertyVisibility.private)
        },
        {
            expectedGetter: `
            /**
             * @return DateTime
             */
            public function getPropertyDate() { 
                return$this->propertyDate;
            }`,
            property: new Property(
                "propertyDate",
                "DateTime",
                new PositionOffset(0),
                PropertyVisibility.private
            )
        },
        {
            expectedGetter: `
            /**
             * @return DateTime|null
             */
            public function getPropertyDateNullable() { 
                return$this->propertyDateNullable;
            }`,
            property: new Property(
                "propertyDateNullable",
                "DateTime|null",
                new PositionOffset(0),
                PropertyVisibility.private
            )
        },
        {
            expectedGetter: `
            /**
             * @return DateTime|string|null
             */
            public function getPropertyDateStringNullable() { 
                return$this->propertyDateStringNullable;
            }`,
            property: new Property(
                "propertyDateStringNullable",
                "DateTime|string|null",
                new PositionOffset(0),
                PropertyVisibility.private
            )
        },
    ];

    const runsWithoutGetPrefix: { expectedGetter: string, property: Property }[] = [
        {
            expectedGetter: `
            /**
             * @return mixed
             */
            public function property() { 
                return$this->property;
            }`,
            property: new Property("property", "mixed", new PositionOffset(0), PropertyVisibility.private)
        },
        {
            expectedGetter: `
            /**
             * @return DateTime
             */
            public function propertyDate() { 
                return$this->propertyDate;
            }`,
            property: new Property(
                "propertyDate",
                "DateTime",
                new PositionOffset(0),
                PropertyVisibility.private
            )
        },
        {
            expectedGetter: `
            /**
             * @return DateTime|null
             */
            public function propertyDateNullable() { 
                return$this->propertyDateNullable;
            }`,
            property: new Property(
                "propertyDateNullable",
                "DateTime|null",
                new PositionOffset(0),
                PropertyVisibility.private
            )
        },
        {
            expectedGetter: `
            /**
             * @return DateTime|string|null
             */
            public function propertyDateStringNullable() { 
                return$this->propertyDateStringNullable;
            }`,
            property: new Property(
                "propertyDateStringNullable",
                "DateTime|string|null",
                new PositionOffset(0),
                PropertyVisibility.private
            )
        },
    ];

    test('should build the getter correctly with get prefix', () => {
        const editorPreferences = new EditorPreferences('    ', '\n');
        const getterConfiguration = new GetterConfiguration(true);
        const vscodeMock: VsCode = mock<VsCode>();
        when(vscodeMock.getEditorPreferences()).thenReturn(editorPreferences);
        when(vscodeMock.getGetterConfiguration()).thenReturn(getterConfiguration);
        let vscode: VsCode = instance(vscodeMock);

        const propertyCreator: PropertyCreator = new PropertyCreator();
        const getterCreator: GetterCreator = new GetterCreator(propertyCreator, vscode);

        runsWithGetPrefix.forEach(object => {
            const getterBuilt = getterCreator.build(object.property);
            assert.strictEqual(getterBuilt.replace(/[\n\t\r\s]/gm, ''), object.expectedGetter.replace(/[\n\t\r\s]/gm, ''));
        });
    });

    test('should build the getter correctly without get prefix', () => {
        const editorPreferences = new EditorPreferences('    ', '\n');
        const getterConfiguration = new GetterConfiguration(false);
        const vscodeMock: VsCode = mock<VsCode>();
        when(vscodeMock.getEditorPreferences()).thenReturn(editorPreferences);
        when(vscodeMock.getGetterConfiguration()).thenReturn(getterConfiguration);
        let vscode: VsCode = instance(vscodeMock);

        const propertyCreator: PropertyCreator = new PropertyCreator();
        const getterCreator: GetterCreator = new GetterCreator(propertyCreator, vscode);

        runsWithoutGetPrefix.forEach(object => {
            const getterBuilt = getterCreator.build(object.property);
            assert.strictEqual(getterBuilt.replace(/[\n\t\r\s]/gm, ''), object.expectedGetter.replace(/[\n\t\r\s]/gm, ''));
        });
    });
});