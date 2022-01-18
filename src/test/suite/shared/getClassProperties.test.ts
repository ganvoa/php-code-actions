import * as assert from 'assert';
import * as vscode from 'vscode';
import * as utils from '../../../shared/getClassProperties';

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
}`;

suite('Get Class Properties Suite', () => {

    test('properties should have private or protected modifier', () => {

        vscode.workspace.openTextDocument({
            content: example
        }).then(document => {
            const properties = utils.getClassProperties(document);
            assert.strictEqual(properties.size, 7);
            assert.strictEqual(properties.has('property1'), true);
            assert.strictEqual(properties.has('property2'), true);
            assert.strictEqual(properties.has('property_3'), true);
            assert.strictEqual(properties.has('PROPERTY'), true);
            assert.strictEqual(properties.has('property'), true);
            assert.strictEqual(properties.has('protectedProperty'), true);
            assert.strictEqual(properties.has('publicProperty'), true);
        });

    });

});
