import { Container } from 'inversify';
import { INTERFACES } from './interfaces.types';

import IUserRepository from '../../Domain/Interfaces/IUserRepository';
import IUserRoleRepository from '../../Domain/Interfaces/IUserRoleRepository';
import IRoleRepository from '../../Domain/Interfaces/IRoleRepository';
import IStockRepository from '../../Domain/Interfaces/IStockRepository';

import TypeUserRepository from '../../Persistence/TypeORM/Repositories/TypeUserRepository';
import TypeUserRoleRepository from '../../Persistence/TypeORM/Repositories/TypeUserRoleRepository';
import TypeRoleRepository from '../../Persistence/TypeORM/Repositories/TypeRoleRepository';
import TypeStockEntryRepository from '../../Persistence/TypeORM/Repositories/TypeStockEntryRepository';

import LoginAction from '../../API/Http/Actions/Auth/LoginAction';

import StoreRooftopperAction from '../../API/Http/Actions/Rooftoppers/StoreRooftopperAction';

import StoreStockAdapter from '../../API/Http/Adapters/Stock/StoreStockAdapter';
import StoreStockHandler from '../../Application/Handlers/Stock/StoreStockHandler';
import StockEntryService from '../../Domain/Services/StockEntryService';

import StoreProductAction from '../../API/Http/Actions/Product/StoreProductAction';
import UpdateProductAction from '../../API/Http/Actions/Product/UpdateProductAction';
import IndexProductAction from '../../API/Http/Actions/Product/IndexProductsAction';
import DestroyProductAction from '../../API/Http/Actions/Product/DestroyProductAction';
import ShowProductByNameAction from '../../API/Http/Actions/Product/ShowProductByNameAction';
import StoreProductAdapter from '../../API/Http/Adapters/Product/StoreProductAdapter';
import UpdateProductAdapter from '../../API/Http/Adapters/Product/UpdateProductAdapter';
import DestroyProductAdapter from '../../API/Http/Adapters/Product/DestroyProductAdapter';
import ShowProductByNameAdapter from '../../API/Http/Adapters/Product/ShowProductByNameAdapter';
import StoreProductHandler from '../../Application/Handlers/Product/StoreProductHandler';
import UpdateProductHandler from '../../Application/Handlers/Product/UpdateProductHandler';
import ShowProductHandler from '../../Application/Handlers/Product/ShowProductHandler';
import DestroyProductHandler from '../../Application/Handlers/Product/DestroyProductHandler';
import ShowProductByNameHandler from '../../Application/Handlers/Product/ShowProductByNameHandler';
import TypeProductRepository from '../../Persistence/TypeORM/Repositories/TypeProductRepository';
import IProductRepository from '../../Domain/Interfaces/IProductRepository';

import IndexUsersAction from '../../API/Http/Actions/Users/IndexUsersAction';
import StoreUsersAction from '../../API/Http/Actions/Users/StoreUsersAction';
import ShowUsersAction from '../../API/Http/Actions/Users/ShowUsersAction';
import UpdateUsersAction from '../../API/Http/Actions/Users/UpdateUsersAction';
import DisableUsersAction from '../../API/Http/Actions/Users/DisableUsersAction';
import EnableUsersAction from '../../API/Http/Actions/Users/EnableUsersAction';
import DestroyUserAction from '../../API/Http/Actions/Users/DestroyUserAction';
import DestroyUserAdapter from '../../API/Http/Adapters/Users/DestroyUserAdapter';
import DestroyUserHandler from '../../Application/Handlers/Users/DestroyUserHandler';

import LoginAdapter from '../../API/Http/Adapters/Auth/LoginAdapter';
import LoginHandler from '../../Application/Handlers/Auth/LoginHandler';
import StoreUserAdapter from '../../API/Http/Adapters/Users/StoreUserAdapter';
import StoreUserHandler from '../../Application/Handlers/Users/StoreUserHandler';
import ShowUserAdapter from '../../API/Http/Adapters/Users/ShowUserAdapter';
import ShowUserHandler from '../../Application/Handlers/Users/ShowUserHandler';
import UpdateUserAdapter from '../../API/Http/Adapters/Users/UpdateUserAdapter';
import UpdateUserHandler from '../../Application/Handlers/Users/UpdateUserHandler';
import DisableUserAdapter from '../../API/Http/Adapters/Users/DisableUserAdapter';
import DisableUserHandler from '../../Application/Handlers/Users/DisableUserHandler';
import EnableUserAdapter from '../../API/Http/Adapters/Users/EnableUserAdapter';
import EnableUserHandler from '../../Application/Handlers/Users/EnableUserHandler';

import UserRoleService from '../../Domain/Services/UserRoleService';
import IRooftopperProfileRepository from '../../Domain/Interfaces/IRooftopperProfileRepository';
import TypeRooftopperProfileRepository from '../../Persistence/TypeORM/Repositories/TypeRooftopperProfileRepository';
import StoreRooftopperAdapter from '../../API/Http/Adapters/Rooftoppers/StoreRooftopperAdapter';
import StoreRooftopperHandler from '../../Application/Handlers/Rooftoppers/StoreRooftopperHandler';
import ShowRooftoppersByIdHandler from '../../Application/Handlers/Rooftoppers/ShowRooftoppersByIdHandler';
import ShowRooftoppersByIdAdapter from '../../API/Http/Adapters/Rooftoppers/ShowRooftoppersByIdAdapter';
import ShowRooftopperByIdAction from '../../API/Http/Actions/Rooftoppers/showRooftopperByIdAction';
import ShowRooftopperBySlugAction from '../../API/Http/Actions/Rooftoppers/showRooftopperBySlugAction';
import ShowRooftopperBySlugAdapter from '../../API/Http/Adapters/Rooftoppers/showRooftopperBySlugAdapter';
import ShowRooftopperBySlugHandler from '../../Application/Handlers/Rooftoppers/showRooftopperBySlugHandler';
import IndexRooftoppersAction from '../../API/Http/Actions/Rooftoppers/IndexRooftoppersAction';
import RooftopperProfileService from '../../Domain/Services/RooftopperProfileService';
import UpdateRooftopperAction from '../../API/Http/Actions/Rooftoppers/UpdateRooftopperAction';
import UpdateRooftopperAdapter from '../../API/Http/Adapters/Rooftoppers/UpdateRooftopperAdapter';
import UpdateRooftopperHandler from '../../Application/Handlers/Rooftoppers/UpdateRooftopperHandler';
import EnableRooftopperByIdAction from '../../API/Http/Actions/Rooftoppers/EnableRooftopperByIdAction';
import DisableRooftopperByIdAction from '../../API/Http/Actions/Rooftoppers/DisableRooftopperByIdAction';
import EnableRooftopperByIdAdapter from '../../API/Http/Adapters/Rooftoppers/EnableRooftopperByIdAdapter';
import DisableRooftopperByIdAdapter from '../../API/Http/Adapters/Rooftoppers/DisableRooftopperByIdAdapter';
import DisableRooftopperByIdHandler from '../../Application/Handlers/Rooftoppers/DisableRooftopperByIdHandler';
import EnableRooftopperByIdHandler from '../../Application/Handlers/Rooftoppers/EnableRooftopperByIdHandler';
import DestroyRooftopperAction from '../../API/Http/Actions/Rooftoppers/DestroyRooftopperAction';
import DestroyRooftopperAdapter from '../../API/Http/Adapters/Rooftoppers/DestroyRooftopperAdapter';
import DestroyRooftopperHandler from '../../Application/Handlers/Rooftoppers/DestroyRooftopperHandler';
import UserService from '../../Domain/Services/UserService';
import { ILoggerService } from '../../Domain/Services/Logger/ILoggerService';
import { WinstonLogger } from '../../Domain/Services/Logger/WinstonLogger';
import ProductService from '../../Domain/Services/ProductService';
import ShowProductAdapter from '../../API/Http/Adapters/Product/ShowProductAdapter';
import TypeStockRepository from '../../Persistence/TypeORM/Repositories/TypeStockRepository';
import IStockEntryRepository from '../../Domain/Interfaces/IStockEntryRepository';
import StoreEntryAction from '../../API/Http/Actions/Entry/StoreEntryAction';
import StoreEntryAdapter from '../../API/Http/Adapters/Entry/StoreEntryAdapter';
import StoreEntryHandler from '../../Application/Handlers/Entry/StoreEntryHandler';
import PurchaseService from '../../Domain/Services/PurchaseService';
import IEntryRepository from '../../Domain/Interfaces/IEntryRepository';
import TypeEntryRepository from '../../Persistence/TypeORM/Repositories/TypeEntryRepository';
import IPurchaseRepository from '../../Domain/Interfaces/IPurchaseRepository';
import TypePurchaseRepository from '../../Persistence/TypeORM/Repositories/TypePurchaseRepository';
import IndexStockAction from '../../API/Http/Actions/Stock/IndexStockAction';
import StockService from '../../Domain/Services/StockService';
import DestroyEntryAction from '../../API/Http/Actions/Entry/DestroyEntryAction';
import DestroyEntryAdapter from '../../API/Http/Adapters/Entry/DestroyEntryAdapter';
import DestroyEntryHandler from '../../Application/Handlers/Entry/DestroyEntryHandler';
import IndexEntryAction from '../../API/Http/Actions/Entry/IndexEntryAction';
import EntryService from '../../Domain/Services/EntryService';
import ShowEntryAction from '../../API/Http/Actions/Entry/ShowEntryAction';
import ShowEntryAdapter from '../../API/Http/Adapters/Entry/ShowEntryAdapter';
import ShowEntryHandler from '../../Application/Handlers/Entry/ShowEntryHandler';
import UpdateStockAction from '../../API/Http/Actions/Stock/UpdateStockAction';
import UpdateStockAdapter from '../../API/Http/Adapters/Stock/UpdateStockAdapter';
import UpdateStockHandler from '../../Application/Handlers/Stock/UpdateStockHandler';
import ISectorRepository from '../../Domain/Interfaces/ISectorRepository';
import TypeSectorRepository from '../../Persistence/TypeORM/Repositories/TypeSectorRepository';
import IAreaRepository from '../../Domain/Interfaces/IAreaRepository';
import IServiceRepository from '../../Domain/Interfaces/IServiceRepository';
import IElementRepository from '../../Domain/Interfaces/IElementRepository';
import IAssetRepository from '../../Domain/Interfaces/IAssetRepository';
import TypeAreaRepository from '../../Persistence/TypeORM/Repositories/TypeAreaRepository';
import TypeServiceRepository from '../../Persistence/TypeORM/Repositories/TypeServiceRepository';
import TypeElementRepository from '../../Persistence/TypeORM/Repositories/TypeElementRepository';
import TypeAssetRepository from '../../Persistence/TypeORM/Repositories/TypeAssetRepository';
import StoreSectorAction from '../../API/Http/Actions/Sector/StoreSectorAction';
import StoreSectorAdapter from '../../API/Http/Adapters/Sector/StoreSectorAdapter';
import StoreSectorHandler from '../../Application/Handlers/Sector/StoreSectorHandler';
import StoreAreaHandler from '../../Application/Handlers/Area/StoreAreaHandler';
import StoreAreaAdapter from '../../API/Http/Adapters/Area/StoreAreaAdapter';
import StoreAreaAction from '../../API/Http/Actions/Area/StoreAreaAction';
import StoreServiceAction from '../../API/Http/Actions/Service/StoreServiceAction';
import StoreServiceAdapter from '../../API/Http/Adapters/Service/StoreServiceAdapter';
import StoreServiceHandler from '../../Application/Handlers/Service/StoreServiceHandler';
import AreaServiceService from '../../Domain/Services/AreaServiceService';
import IAreaServiceRepository from '../../Domain/Interfaces/IAreaServiceRepository';
import TypeAreaServiceRepository from '../../Persistence/TypeORM/Repositories/TypeAreaServiceRepository';
import StoreElementAction from '../../API/Http/Actions/Element/StoreElementAction';
import StoreElementAdapter from '../../API/Http/Adapters/Element/StoreElementAdapter';
import StoreElementHandler from '../../Application/Handlers/Element/StoreElementHandler';
import StoreAssetAction from '../../API/Http/Actions/Asset/StoreAssetAction';
import StoreAssetAdapter from '../../API/Http/Adapters/Asset/StoreAssetAdapter';
import StoreAssetHandler from '../../Application/Handlers/Asset/StoreAssetHandler';
import AssetService from '../../Domain/Services/AssetService';

const DIContainer = new Container();

/**
 * Controllers
 */
DIContainer.bind<LoginAction>(LoginAction).toSelf();

DIContainer.bind<StoreRooftopperAction>(StoreRooftopperAction).toSelf();
DIContainer.bind<ShowRooftopperByIdAction>(ShowRooftopperByIdAction).toSelf();
DIContainer.bind<ShowRooftopperBySlugAction>(ShowRooftopperBySlugAction).toSelf();
DIContainer.bind<IndexRooftoppersAction>(IndexRooftoppersAction).toSelf();
DIContainer.bind<UpdateRooftopperAction>(UpdateRooftopperAction).toSelf();
DIContainer.bind<EnableRooftopperByIdAction>(EnableRooftopperByIdAction).toSelf();
DIContainer.bind<DisableRooftopperByIdAction>(DisableRooftopperByIdAction).toSelf();
DIContainer.bind<DestroyRooftopperAction>(DestroyRooftopperAction).toSelf();

DIContainer.bind<IndexUsersAction>(IndexUsersAction).toSelf();
DIContainer.bind<StoreUsersAction>(StoreUsersAction).toSelf();
DIContainer.bind<ShowUsersAction>(ShowUsersAction).toSelf();
DIContainer.bind<UpdateUsersAction>(UpdateUsersAction).toSelf();
DIContainer.bind<DisableUsersAction>(DisableUsersAction).toSelf();
DIContainer.bind<EnableUsersAction>(EnableUsersAction).toSelf();
DIContainer.bind<DestroyUserAction>(DestroyUserAction).toSelf();

DIContainer.bind<StoreProductAction>(StoreProductAction).toSelf();
DIContainer.bind<UpdateProductAction>(UpdateProductAction).toSelf();
DIContainer.bind<IndexProductAction>(IndexProductAction).toSelf();
DIContainer.bind<DestroyProductAction>(DestroyProductAction).toSelf();
DIContainer.bind<ShowProductByNameAction>(ShowProductByNameAction).toSelf();

DIContainer.bind<StoreEntryAction>(StoreEntryAction).toSelf();
DIContainer.bind<DestroyEntryAction>(DestroyEntryAction).toSelf();
DIContainer.bind<IndexEntryAction>(IndexEntryAction).toSelf();
DIContainer.bind<ShowEntryAction>(ShowEntryAction).toSelf();

DIContainer.bind<UpdateStockAction>(UpdateStockAction).toSelf();
DIContainer.bind<IndexStockAction>(IndexStockAction).toSelf();

DIContainer.bind<StoreSectorAction>(StoreSectorAction).toSelf();

DIContainer.bind<StoreAreaAction>(StoreAreaAction).toSelf();

DIContainer.bind<StoreServiceAction>(StoreServiceAction).toSelf();

DIContainer.bind<StoreElementAction>(StoreElementAction).toSelf();

DIContainer.bind<StoreAssetAction>(StoreAssetAction).toSelf();



/**
 * Adapters
 */
DIContainer.bind<LoginAdapter>(LoginAdapter).toSelf();

DIContainer.bind<StoreRooftopperAdapter>(StoreRooftopperAdapter).toSelf();
DIContainer.bind<ShowRooftoppersByIdAdapter>(ShowRooftoppersByIdAdapter).toSelf();
DIContainer.bind<ShowRooftopperBySlugAdapter>(ShowRooftopperBySlugAdapter).toSelf();
DIContainer.bind<UpdateRooftopperAdapter>(UpdateRooftopperAdapter).toSelf();
DIContainer.bind<EnableRooftopperByIdAdapter>(EnableRooftopperByIdAdapter).toSelf();
DIContainer.bind<DisableRooftopperByIdAdapter>(DisableRooftopperByIdAdapter).toSelf();
DIContainer.bind<DestroyRooftopperAdapter>(DestroyRooftopperAdapter).toSelf();

DIContainer.bind<StoreUserAdapter>(StoreUserAdapter).toSelf();
DIContainer.bind<ShowUserAdapter>(ShowUserAdapter).toSelf();
DIContainer.bind<UpdateUserAdapter>(UpdateUserAdapter).toSelf();
DIContainer.bind<DisableUserAdapter>(DisableUserAdapter).toSelf();
DIContainer.bind<EnableUserAdapter>(EnableUserAdapter).toSelf();
DIContainer.bind<DestroyUserAdapter>(DestroyUserAdapter).toSelf();

DIContainer.bind<StoreProductAdapter>(StoreProductAdapter).toSelf();
DIContainer.bind<UpdateProductAdapter>(UpdateProductAdapter).toSelf();
DIContainer.bind<ShowProductAdapter>(ShowProductAdapter).toSelf();
DIContainer.bind<DestroyProductAdapter>(DestroyProductAdapter).toSelf();
DIContainer.bind<ShowProductByNameAdapter>(ShowProductByNameAdapter).toSelf();

DIContainer.bind<StoreStockAdapter>(StoreStockAdapter).toSelf();
DIContainer.bind<UpdateStockAdapter>(UpdateStockAdapter).toSelf();

DIContainer.bind<DestroyEntryAdapter>(DestroyEntryAdapter).toSelf();
DIContainer.bind<ShowEntryAdapter>(ShowEntryAdapter).toSelf();
DIContainer.bind<StoreEntryAdapter>(StoreEntryAdapter).toSelf();

DIContainer.bind<StoreSectorAdapter>(StoreSectorAdapter).toSelf();

DIContainer.bind<StoreAreaAdapter>(StoreAreaAdapter).toSelf();

DIContainer.bind<StoreServiceAdapter>(StoreServiceAdapter).toSelf();

DIContainer.bind<StoreElementAdapter>(StoreElementAdapter).toSelf();

DIContainer.bind<StoreAssetAdapter>(StoreAssetAdapter).toSelf();



/**
 * Handlers
 */
DIContainer.bind<LoginHandler>(LoginHandler).toSelf();

DIContainer.bind<StoreRooftopperHandler>(StoreRooftopperHandler).toSelf();
DIContainer.bind<ShowRooftoppersByIdHandler>(ShowRooftoppersByIdHandler).toSelf();
DIContainer.bind<ShowRooftopperBySlugHandler>(ShowRooftopperBySlugHandler).toSelf();
DIContainer.bind<UpdateRooftopperHandler>(UpdateRooftopperHandler).toSelf();
DIContainer.bind<EnableRooftopperByIdHandler>(EnableRooftopperByIdHandler).toSelf();
DIContainer.bind<DisableRooftopperByIdHandler>(DisableRooftopperByIdHandler).toSelf();
DIContainer.bind<DestroyRooftopperHandler>(DestroyRooftopperHandler).toSelf();

DIContainer.bind<StoreUserHandler>(StoreUserHandler).toSelf();
DIContainer.bind<ShowUserHandler>(ShowUserHandler).toSelf();
DIContainer.bind<UpdateUserHandler>(UpdateUserHandler).toSelf();
DIContainer.bind<DisableUserHandler>(DisableUserHandler).toSelf();
DIContainer.bind<EnableUserHandler>(EnableUserHandler).toSelf();
DIContainer.bind<DestroyUserHandler>(DestroyUserHandler).toSelf();

DIContainer.bind<StoreProductHandler>(StoreProductHandler).toSelf();
DIContainer.bind<UpdateProductHandler>(UpdateProductHandler).toSelf();
DIContainer.bind<ShowProductHandler>(ShowProductHandler).toSelf();
DIContainer.bind<DestroyProductHandler>(DestroyProductHandler).toSelf();
DIContainer.bind<ShowProductByNameHandler>(ShowProductByNameHandler).toSelf();

DIContainer.bind<StoreEntryHandler>(StoreEntryHandler).toSelf();
DIContainer.bind<DestroyEntryHandler>(DestroyEntryHandler).toSelf();
DIContainer.bind<ShowEntryHandler>(ShowEntryHandler).toSelf();

DIContainer.bind<StoreStockHandler>(StoreStockHandler).toSelf();
DIContainer.bind<UpdateStockHandler>(UpdateStockHandler).toSelf();

DIContainer.bind<StoreSectorHandler>(StoreSectorHandler).toSelf();

DIContainer.bind<StoreAreaHandler>(StoreAreaHandler).toSelf();

DIContainer.bind<StoreServiceHandler>(StoreServiceHandler).toSelf();

DIContainer.bind<StoreElementHandler>(StoreElementHandler).toSelf();

DIContainer.bind<StoreAssetHandler>(StoreAssetHandler).toSelf();


/*
 * Services
 */
DIContainer.bind<UserService>(UserService).toSelf();
DIContainer.bind<UserRoleService>(UserRoleService).toSelf();
DIContainer.bind<RooftopperProfileService>(RooftopperProfileService).toSelf();
DIContainer.bind<ProductService>(ProductService).toSelf();
DIContainer.bind<StockEntryService>(StockEntryService).toSelf();
DIContainer.bind<PurchaseService>(PurchaseService).toSelf();
DIContainer.bind<StockService>(StockService).toSelf();
DIContainer.bind<EntryService>(EntryService).toSelf();
DIContainer.bind<AreaServiceService>(AreaServiceService).toSelf();
DIContainer.bind<AssetService>(AssetService).toSelf();


DIContainer.bind<ILoggerService>(INTERFACES.ILoggerService).to(WinstonLogger);

/**
 * Repository Interfaces
 */
DIContainer.bind<IUserRepository>(INTERFACES.IUserRepository).to(TypeUserRepository);
DIContainer.bind<IUserRoleRepository>(INTERFACES.IUserRoleRepository).to(TypeUserRoleRepository);
DIContainer.bind<IRoleRepository>(INTERFACES.IRoleRepository).to(TypeRoleRepository);
DIContainer.bind<IPurchaseRepository>(INTERFACES.IPurchaseRepository).to(TypePurchaseRepository);

DIContainer.bind<IStockRepository>(INTERFACES.IStockRepository).to(TypeStockRepository);
DIContainer.bind<IEntryRepository>(INTERFACES.IEntryRepository).to(TypeEntryRepository);
DIContainer.bind<IStockEntryRepository>(INTERFACES.IStockEntryRepository).to(TypeStockEntryRepository);
DIContainer.bind<IRooftopperProfileRepository>(INTERFACES.IRooftopperProfileRepository).to(
  TypeRooftopperProfileRepository,
);
DIContainer.bind<IProductRepository>(INTERFACES.IProductRepository).to(TypeProductRepository);
DIContainer.bind<ISectorRepository>(INTERFACES.ISectorRepository).to(TypeSectorRepository);
DIContainer.bind<IAreaRepository>(INTERFACES.IAreaRepository).to(TypeAreaRepository);
DIContainer.bind<IAreaServiceRepository>(INTERFACES.IAreaServiceRepository).to(TypeAreaServiceRepository);
DIContainer.bind<IServiceRepository>(INTERFACES.IServiceRepository).to(TypeServiceRepository);
DIContainer.bind<IElementRepository>(INTERFACES.IElementRepository).to(TypeElementRepository);
DIContainer.bind<IAssetRepository>(INTERFACES.IAssetRepository).to(TypeAssetRepository);

export default DIContainer;
