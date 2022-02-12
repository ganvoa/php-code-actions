export default interface EditorAction {

    getTitle(): string;
    
    getCommand(): string;

    run(): void;
}