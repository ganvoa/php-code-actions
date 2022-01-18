import * as assert from 'assert';
import * as vscode from 'vscode';
import * as utils from '../../../shared/GetClassProperties';

const example = `<?php
class Example
{
    private $property1;

    private $property2;

    private $property_3;

    private $property;

    private $PROPERTY;

    protected $protectedProperty;
    public $publicProperty;
}`

suite('Get Class Properties Suite', () => {

    test('properties should have private or protected modifier', () => {

        vscode.workspace.openTextDocument({
            content: example
        }).then(document => {
            const properties = utils.getClassProperties(document);
            assert.strictEqual(properties.length, 6);
            assert.strictEqual(properties[0], 'property1');
            assert.strictEqual(properties[1], 'property2');
            assert.strictEqual(properties[2], 'property_3');
            assert.strictEqual(properties[3], 'property');
            assert.strictEqual(properties[4], 'PROPERTY');
            assert.strictEqual(properties[5], 'protectedProperty');
        })

    });

});
