export abstract class BaseFactory<T> {
  private registry: { [key: string]: () => T } = {};

  protected register(key: string, factory: () => T): void {
    this.registry[key] = factory;
  }

  get(key: string): T | null {
    const factory = this.registry[key];
    return factory ? factory() : null;
  }
}
