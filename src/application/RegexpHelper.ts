import GroupOffset from '../domain/GroupOffset';
import InvalidGroupOffset from '../domain/InvalidGroupOffset';
import PositionOffset from '../domain/PositionOffset';

export default class RegexpHelper {
  getGroupOffset(match: RegExpExecArray, groupNumber: number): GroupOffset {
    groupNumber++;

    let matchIndexStart = match.index;
    let matchIndexEnd = match.index;

    if (match.length < groupNumber) {
      throw new InvalidGroupOffset(groupNumber, match.length);
    }

    for (let i = 1; i < groupNumber; i++) {
      matchIndexStart = matchIndexEnd;
      matchIndexEnd += match[i].length;
    }

    return new GroupOffset(new PositionOffset(matchIndexStart), new PositionOffset(matchIndexEnd));
  }
}
