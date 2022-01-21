import { Position, TextDocument } from "vscode";

export function getLineForGetter(document: TextDocument): Position {
    const regex = /}[\s]+?$/gm;

    let match: RegExpExecArray | null;
    let lastIndex = 0;
    while (match = regex.exec(document.getText())) {
        lastIndex = match.index;
    }

    return new Position(document.positionAt(lastIndex).line - 1, 0);
};
