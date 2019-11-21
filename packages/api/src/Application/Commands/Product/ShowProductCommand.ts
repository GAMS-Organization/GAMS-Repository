export default class ShowProductCommand {
    private id: number;

    public constructor(id: number) {
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }
}
