import * as assert from 'assert';
import { suite, test } from 'mocha';
import * as vscode from 'vscode';
import { getGroupIndex } from '../../../../shared/Regex/getGroupIndex';

const example = `<?php

class Example
{

    /** @var int */
    private $test;

    /** @var string|int|mixed */
    private $test2;

    /** @var DateTime */
    private $test3;

    /** @var null|DateTime */
    private $test1;

    /**
     * @var null|DateTime */
    private $test4;

    /**
     * @var null|string|DateTime
     */
    private $test5;
}`;

suite('getGroupIndex Suite', () => {

    test('should return group indexes', () => {
        return vscode.workspace.openTextDocument({ content: example }).then(
            document => {
                const regex = /([\w\W]*?)({)([\w\W]*)(})/gm;
                const match: RegExpExecArray = regex.exec(document.getText()) as RegExpExecArray;
                let group = getGroupIndex(match, 2);
                assert.strictEqual(group.start, 21);
                assert.strictEqual(group.end, 22);

                group = getGroupIndex(match, 4);
                assert.strictEqual(group.start, 342);
                assert.strictEqual(group.end, 343);
            });
    });
});