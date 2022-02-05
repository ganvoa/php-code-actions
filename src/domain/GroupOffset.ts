import PositionOffset from "./PositionOffset";

export default class GroupOffset {

    readonly start: PositionOffset;
    readonly end: PositionOffset;

    constructor(start: PositionOffset, end: PositionOffset) {
        this.start = start;
        this.end = end;
    }
}