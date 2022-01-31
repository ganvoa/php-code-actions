import { Position, TextDocument } from "vscode";
import { getGroupIndex } from "../Regex/getGroupIndex";

export function getPositionForGetter(document: TextDocument): Position {
    const regex = /([\w\W]*?)({)([\w\W]*)(})/gm;

    let match: RegExpExecArray | null = regex.exec(document.getText());
    let position = new Position(0, 0);
    if (null !== match) {
        const group = getGroupIndex(match, 3);
        position = position.with(document.positionAt(group.end).line);
    }

    return position;
};
