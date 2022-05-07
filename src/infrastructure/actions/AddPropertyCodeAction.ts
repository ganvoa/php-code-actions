import ClassInspector from "../../application/ClassInspector";
import PropertyCreator from "../../application/PropertyCreator";
import EditorAction from "../../domain/EditorAction";
import VsCode from "../../domain/VsCode";

export class AddPropertyCodeAction implements EditorAction {

    title: string = "Add Property";
    command: string = "php-code-actions.addProperty";

    constructor(
        private vsCode: VsCode,
        private classInspector: ClassInspector,
        private propertyCreator: PropertyCreator) {
    }

    runnable(): boolean {

        if (!this.vsCode.hasActiveEditor()) {
            false;
        }

        return true;
    }

    getTitle(): string {
        return this.title;
    }

    getCommand(): string {
        return this.command;
    }

    async run(): Promise<void> {

        if (!this.runnable()) {
            return Promise.resolve();
        }
        const offset = this.classInspector.getOffsetForProperty();
        const snippet = this.propertyCreator.getSnippet();
        await this.vsCode.insertSnippet(offset, snippet);
        return Promise.resolve();
    }
}