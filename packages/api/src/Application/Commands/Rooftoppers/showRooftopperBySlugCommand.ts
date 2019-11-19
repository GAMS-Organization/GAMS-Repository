export default class ShowRooftopperBySlugCommand {
  private slug: string;

  public constructor(slug: string) {
    this.slug = slug;
  }

  public getSlug(): string {
    return this.slug;
  }
}
