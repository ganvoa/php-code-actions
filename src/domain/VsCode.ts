import EditorPreferences from "./EditorPreferences";
import GetterConfiguration from "./GetterConfiguration";

export default interface VsCode {

    getText(): string;

    getEditorPreferences(): EditorPreferences;

    getGetterConfiguration(): GetterConfiguration;

    showErrorMessage(message: string): void;

    showQuickPick(items: readonly string[] | Thenable<readonly string[]>, options?: any, token?: any): Thenable<string[] | undefined>;

}