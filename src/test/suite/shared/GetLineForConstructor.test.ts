import * as assert from 'assert';
import * as vscode from 'vscode';
import { getLineForConstructor } from '../../../shared/GetLineForConstructor';

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

suite('Get Line For Constructor tests', () => {

    test('constructor line should be after last property', () => {
        vscode.workspace.openTextDocument({
            content: example
        }).then(document => {
            const position: vscode.Position = getLineForConstructor(document)
            assert.strictEqual(position.line, 12);
        })
    });

});