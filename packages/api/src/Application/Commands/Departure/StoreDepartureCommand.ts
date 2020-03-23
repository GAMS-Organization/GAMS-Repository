export default class StoreDepartureCommand {
  private date: string;
  private observations: string;
  private products: number[];
  private quantities: number[];
  private providers: string[];

  public constructor(
    date: string,
    observations: string,
    products: number[],
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

  public getProducts(): number[] {
    return this.products;
  }

  public getQuantities(): number[] {
    return this.quantities;
  }

  public getProviders(): string[] {
    return this.providers;
  }
}
