const INTERFACES = {
  IUserRepository: Symbol.for('IUserRepository'),
  IUserRoleRepository: Symbol.for('IUserRoleRepository'),
  IRoleRepository: Symbol.for('IRoleRepository'),
  ILoggerService: Symbol.for('ILoggerService'),
  IStockRepository: Symbol.for('IStockRepository'),
  IProductRepository: Symbol.for('IProductRepository'),
  IAssetRepository: Symbol.for('IAssetRepository'),
  IConsumptionRepository: Symbol.for('IConsumptionRepository'),
  IDepartureRepository: Symbol.for('IDepartureRepository'),
  IEntryRepository: Symbol.for('IEntryRepository'),
  IPurchaseRepository: Symbol.for('IPurchaseRepository'),
  IStockEntryRepository: Symbol.for('IStockEntryRepository'),
  IStockDepartureRepository: Symbol.for('IStockDepartureRepository'),
  IUserWorkOrderRepository: Symbol.for('IUserWorkOrderRepository'),
  IWorkOrderRepository: Symbol.for('IWorkOrderRepository'),
};

export { INTERFACES };
