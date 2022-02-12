export default interface EditorAction {

    getTitle(): string;
    
    getCommand(): string;

    runnable(): boolean;

    run(): Promise<void>;
}