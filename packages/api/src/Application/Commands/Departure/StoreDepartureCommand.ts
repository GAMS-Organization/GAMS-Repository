export default class StoreDepartureCommand {
  private date: string;
  private observations: string;
  private products: number[];
  private quantities: number[];

  public constructor(date: string, observations: string, products: number[], quantities: number[]) {
    this.date = date;
    this.observations = observations;
    this.products = products;
    this.quantities = quantities;
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
}
