import { Position, TextDocument } from "vscode";

export function getLineForConstructor(document: TextDocument): Position {
    const regex = /(private|protected|public)\s+\$(.+)\;/gm;

    let match: RegExpExecArray | null;
    let lastIndex = 0;
    while (match = regex.exec(document.getText())) {
        lastIndex = match.index;
    }

    return document.positionAt(lastIndex)
};
