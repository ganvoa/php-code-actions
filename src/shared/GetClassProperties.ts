import { TextDocument } from "vscode";

/**
 * @param fileContent
 */
export function getClassProperties(document: TextDocument): Array<string> {
    const regex = /(private|protected)\s+\$(.+)\;/gm;
    const results: Array<string> = [];

    let match = null;
    while (match = regex.exec(document.getText())) {
        results.push(match[2]);
    }

    return results;
};
