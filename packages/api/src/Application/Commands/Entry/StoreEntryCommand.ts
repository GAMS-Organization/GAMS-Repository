export default class StoreEntryCommand {
  private date: string;
  private observations: string;
  private products: string[];
  private quantities: number[];
  private providers: string[];

  public constructor(
    date: string,
    observations: string,
    products: string[],
    quantities: number[],
    providers: string[],
  ) {
    this.date = date;
    this.observations = observations;
    this.products = products;
    this.quantities = quantities;
    this.providers = providers;
  }

  public getDate(): string {
    return this.date;
  }

  public getObservations(): string {
    return this.observations;
  }

  public getProducts(): string[] {
    return this.products;
  }

  public getQuantities(): number[] {
    return this.quantities;
  }

  public getProviders(): string[] {
    return this.providers;
  }
}
