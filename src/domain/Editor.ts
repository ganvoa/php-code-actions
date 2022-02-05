import VsCode from "./VsCode";

export default class Editor {

    vscode: VsCode;

    constructor(vscode: VsCode) {
        this.vscode = vscode;
    }

    getIndentation(times: number = 1) {
        return this.vscode.getIndentation().repeat(times);
    }

    getBreakLine(times: number = 1) {
        return '\n'.repeat(times);
    }

}