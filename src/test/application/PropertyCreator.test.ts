import * as assert from 'assert';
import { suite, test } from 'mocha';
import { instance, mock, verify, when } from 'ts-mockito';
import ClassInspector from '../../application/ClassInspector';
import RegexpHelper from '../../application/RegexpHelper';
import PositionOffset from '../../domain/PositionOffset';
import VsCode from '../../domain/VsCode';

const exampleText: string = `<?php
class Example
{
    /** 
     * @var DateTime */
    private $var1;
    
    /** 
     * @var string */
    private $var2;
}`;

suite('PropertyCreator Suite', () => {
  test('constructor offset should be after last property', () => {
    const vscodeMock: VsCode = mock<VsCode>();
    when(vscodeMock.getText()).thenReturn(exampleText);
    let vscode: VsCode = instance(vscodeMock);

    const helper = new RegexpHelper();
    const inspector = new ClassInspector(vscode, helper);
    const offset: PositionOffset = inspector.getOffsetForProperty();

    verify(vscodeMock.getText()).called();
    assert.strictEqual(offset.value, 128);
  });
});
