import * as assert from 'assert';
import { suite, test } from 'mocha';
import { addConstructorAction } from '../../../actions/addConstructorAction';

const original = `<?php
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

const expected = `<?php
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

suite('addConstructorAction tests', () => {

    test('should build constructor', () => {
        
    });

});
