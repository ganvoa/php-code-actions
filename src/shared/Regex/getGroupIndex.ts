import InvalidGroup from "./InvalidGroup";

export type GroupIndex = {
    start: number,
    end: number
};

export function getGroupIndex(match: RegExpExecArray, groupNumber: number): GroupIndex {

    groupNumber++;

    let matchIndexStart = match.index;
    let matchIndexEnd = match.index;

    if (match.length < groupNumber) {
        throw new InvalidGroup(groupNumber, match.length);
    }

    for (let i = 1; i < groupNumber; i++) {
        matchIndexStart = matchIndexEnd;
        matchIndexEnd += match[i].length;
    }

    return {
        start: matchIndexStart,
        end: matchIndexEnd
    };
}