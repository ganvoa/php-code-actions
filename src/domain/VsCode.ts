export default interface VsCode {

    getText(): string;

    getIndentation(): string;

    showErrorMessage(message: string): void;

    showQuickPick(items: readonly string[] | Thenable<readonly string[]>, options?: any, token?: any): Thenable<string[] | undefined>;

}