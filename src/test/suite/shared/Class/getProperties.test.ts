import * as assert from 'assert';
import { suite, test } from 'mocha';
import * as vscode from 'vscode';
import { getProperties } from '../../../../shared/Class/getProperties';

const example = `<?php
class Example
{
    /** 
     * @var DateTime */
    private $dateTimeVar1;
    
    /** 
     * @var DateTime */
    private $dateTimeVar2;
    
    /** 
     * @var DateTime 
     */
    private $dateTimeVar3;

    /** 
     * @var DateTime
     * @Type("enum")
     */
    private $dateTimeVar4;

    /** @var string */
    private $property1;

    /** @var Gamboa\DataType */
    private $propertyDateTimeWithNamesPace;

    private $property2;

    private $property_3;

    private $property;

    private $PROPERTY;

    protected $protectedProperty;

    public $publicProperty;
}`;

suite('getProperties Suite', () => {

    test('properties should have private, protected or public modifier', () => {
        return vscode.workspace.openTextDocument({ content: example }).then(
            document => {
                const properties = getProperties(document);
                assert.strictEqual(properties.size, 12);
                assert.strictEqual(properties.has('dateTimeVar1'), true);
                assert.strictEqual(properties.has('dateTimeVar2'), true);
                assert.strictEqual(properties.has('dateTimeVar3'), true);
                assert.strictEqual(properties.has('dateTimeVar4'), true);
                assert.strictEqual(properties.has('property1'), true);
                assert.strictEqual(properties.has('property2'), true);
                assert.strictEqual(properties.has('property_3'), true);
                assert.strictEqual(properties.has('PROPERTY'), true);
                assert.strictEqual(properties.has('property'), true);
                assert.strictEqual(properties.has('protectedProperty'), true);
                assert.strictEqual(properties.has('publicProperty'), true);

            });
    });

    test('var type should be assigned when exists', () => {
        return vscode.workspace.openTextDocument({ content: example }).then(
            document => {
                const properties = getProperties(document);
                assert.strictEqual(properties.get('dateTimeVar1')?.type, "DateTime");
                assert.strictEqual(properties.get('dateTimeVar2')?.type, "DateTime");
                assert.strictEqual(properties.get('dateTimeVar3')?.type, "DateTime");
                assert.strictEqual(properties.get('dateTimeVar4')?.type, "DateTime");
                assert.strictEqual(properties.get('property1')?.type, "string");
                assert.strictEqual(properties.get('property')?.type, "mixed");
                assert.strictEqual(properties.get('propertyDateTimeWithNamesPace')?.type, `Gamboa\DataType`);
            });
    });
});