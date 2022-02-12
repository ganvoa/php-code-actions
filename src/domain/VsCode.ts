import EditorPreferences from "./EditorPreferences";
import GetterConfiguration from "./GetterConfiguration";
import PositionOffset from "./PositionOffset";

export default interface VsCode {

    getText(): string;

    hasActiveEditor(): boolean;

    insertText(offset: PositionOffset, content: string): Thenable<boolean>;

    getEditorPreferences(): EditorPreferences;

    getGetterConfiguration(): GetterConfiguration;

    showErrorMessage(message: string): void;

    showQuickPick(items: readonly string[] | Thenable<readonly string[]>, options?: any, token?: any): Thenable<string[] | undefined>;
   
    quickPickMultiple(title: string, options: readonly string[]): Thenable<string[]>;

}