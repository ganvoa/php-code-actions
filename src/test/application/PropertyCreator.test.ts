import * as assert from 'assert';
import { suite, test } from 'mocha';
import PropertyCreator from '../../application/PropertyCreator';
import PositionOffset from '../../domain/PositionOffset';
import Property from '../../domain/Property';
import { PropertyVisibility } from '../../domain/PropertyVisibility';

suite('PropertyCreator Suite', () => {
  test('getForArgument should support different types', () => {
    const propertyCreator = new PropertyCreator();

    const mixedProp = new Property('property', 'mixed', new PositionOffset(0), PropertyVisibility.private);
    const objProp = new Property('propertyDate', 'DateTime', new PositionOffset(0), PropertyVisibility.private);
    const arrObjProp = new Property('propertyDateArray', 'DateTime[]', new PositionOffset(0), PropertyVisibility.private);
    const nullableObjProp = new Property('propertyDateNullable', 'DateTime|null', new PositionOffset(0), PropertyVisibility.private);
    const objPrimNullableProp = new Property('propertyDateStringNullable', 'DateTime|string|null', new PositionOffset(0), PropertyVisibility.private);
    const stringProp = new Property('stringProperty', 'string', new PositionOffset(0), PropertyVisibility.private);

    assert.strictEqual(propertyCreator.getForArgument(mixedProp), `$${mixedProp.name}`);
    assert.strictEqual(propertyCreator.getForArgument(objProp), `${objProp.type} $${objProp.name}`);
    assert.strictEqual(propertyCreator.getForArgument(arrObjProp), `$${arrObjProp.name}`);
    assert.strictEqual(propertyCreator.getForArgument(nullableObjProp), `${objProp.type} $${nullableObjProp.name} = null`);
    assert.strictEqual(propertyCreator.getForArgument(objPrimNullableProp), `$${objPrimNullableProp.name} = null`);
    assert.strictEqual(propertyCreator.getForArgument(stringProp), `$${stringProp.name}`);
  });
});
