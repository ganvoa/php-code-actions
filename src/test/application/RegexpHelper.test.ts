import * as assert from 'assert';
import { suite, test } from 'mocha';
import RegexpHelper from '../../application/RegexpHelper';

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

suite('RegexpHelper Suite', () => {

    test('should return group offset', () => {

        const helper = new RegexpHelper();

        const regex = /([\w\W]*?)({)([\w\W]*)(})/gm;
        const match: RegExpExecArray = regex.exec(example) as RegExpExecArray;
        let group = helper.getGroupOffset(match, 2);
        assert.strictEqual(group.start.value, 21);
        assert.strictEqual(group.end.value, 22);

        group = helper.getGroupOffset(match, 4);
        assert.strictEqual(group.start.value, 342);
        assert.strictEqual(group.end.value, 343);
    });
});