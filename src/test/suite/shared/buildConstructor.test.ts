import * as assert from 'assert';
import { suite, test } from 'mocha';
import * as vscode from 'vscode';
import { buildConstructor } from '../../../shared/buildConstructor';
import { PropertyClass, PropertyVisibility } from '../../../shared/types';

const constructorExpected = 
`
/** 
 * @param mixed $property 
 * @param DateTime $propertyDate 
 * @param DateTime|null $propertyDateNullable 
 * @param DateTime|string|null $propertyDateStringNullable 
 * /
public function __construct($property, DateTime $propertyDate, DateTime $propertyDateNullable, $propertyDateStringNullable) {
    $this->property = $property;
    $this->propertyDate = $propertyDate;
    $this->propertyDateNullable = $propertyDateNullable;
    $this->propertyDateStringNullable = $propertyDateStringNullable;
}
`;

suite('buildConstructor Suite', () => {

    test('should build the constructor correctly', () => {
        const properties: PropertyClass[] = [];

        properties.push({
            name: "property",
            type: "mixed",
            position: new vscode.Position(0, 0),
            visibility: PropertyVisibility.private
        });
        properties.push({
            name: "propertyDate",
            type: "DateTime",
            position: new vscode.Position(0, 0),
            visibility: PropertyVisibility.private
        });
        properties.push({
            name: "propertyDateNullable",
            type: "DateTime|null",
            position: new vscode.Position(0, 0),
            visibility: PropertyVisibility.private
        });
        properties.push({
            name: "propertyDateStringNullable",
            type: "DateTime|string|null",
            position: new vscode.Position(0, 0),
            visibility: PropertyVisibility.private
        });
        const constructorBuilt = buildConstructor(properties);
        assert.strictEqual(constructorBuilt.replace(/[\n\t\r\s]/gm, ''), constructorExpected.replace(/[\n\t\r\s]/gm, ''));
    });
});