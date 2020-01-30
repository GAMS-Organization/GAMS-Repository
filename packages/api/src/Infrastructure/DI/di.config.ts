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

const DIContainer = new Container();

/**
 * Controllers
 */
DIContainer.bind<LoginAction>(LoginAction).toSelf();

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

/**
 * Adapters
 */
DIContainer.bind<LoginAdapter>(LoginAdapter).toSelf();

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

/**
 * Handlers
 */
DIContainer.bind<LoginHandler>(LoginHandler).toSelf();

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

/*
 * Services
 */
DIContainer.bind<UserService>(UserService).toSelf();
DIContainer.bind<UserRoleService>(UserRoleService).toSelf();
DIContainer.bind<ProductService>(ProductService).toSelf();
DIContainer.bind<StockEntryService>(StockEntryService).toSelf();
DIContainer.bind<PurchaseService>(PurchaseService).toSelf();
DIContainer.bind<StockService>(StockService).toSelf();
DIContainer.bind<EntryService>(EntryService).toSelf();
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
DIContainer.bind<IProductRepository>(INTERFACES.IProductRepository).to(TypeProductRepository);

export default DIContainer;
