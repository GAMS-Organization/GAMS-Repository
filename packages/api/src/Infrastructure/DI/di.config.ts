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
import EventService from '../../Domain/Services/EventService';
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
import IndexSectorsAction from '../../API/Http/Actions/Sector/IndexSectorsAction';
import IndexAreasAction from '../../API/Http/Actions/Area/IndexAreasAction';
import IndexServicesAction from '../../API/Http/Actions/Service/IndexServicesAction';
import IndexElementsAction from '../../API/Http/Actions/Element/IndexElementsAction';
import SectorService from '../../Domain/Services/SectorService';
import ServiceService from '../../Domain/Services/ServiceService';
import AreaService from '../../Domain/Services/AreaService';
import ElementService from '../../Domain/Services/ElementService';
import DestroySectorAction from '../../API/Http/Actions/Sector/DestroySectorAction';
import DestroyAreaAction from '../../API/Http/Actions/Area/DestroyAreaAction';
import DestroyServiceAction from '../../API/Http/Actions/Service/DestroyServiceAction';
import DestroyElementAction from '../../API/Http/Actions/Element/DestroyElementAction';
import DestroySectorAdapter from '../../API/Http/Adapters/Sector/DestroySectorAdapter';
import DestroyAreaAdapter from '../../API/Http/Adapters/Area/DestroyAreaAdapter';
import DestroyServiceAdapter from '../../API/Http/Adapters/Service/DestroyServiceAdapter';
import DestroyElementAdapter from '../../API/Http/Adapters/Element/DestroyElementAdapter';
import DestroySectorHandler from '../../Application/Handlers/Sector/DestroySectorHandler';
import DestroyAreaHandler from '../../Application/Handlers/Area/DestroyAreaHandler';
import DestroyServiceHandler from '../../Application/Handlers/Service/DestroyServiceHandler';
import DestroyElementHandler from '../../Application/Handlers/Element/DestroyElementHandler';
import IndexAssetsAction from '../../API/Http/Actions/Asset/IndexAssetsAction';
import DestroyAssetAction from '../../API/Http/Actions/Asset/DestroyAssetAction';
import DestroyAssetAdapter from '../../API/Http/Adapters/Asset/DestroyAssetAdapter';
import DestroyAssetHandler from '../../Application/Handlers/Asset/DestroyAssetHandler';
import ShowAreaBySectorAction from '../../API/Http/Actions/Area/ShowAreaBySectorAction';
import ShowAreaBySectorAdapter from '../../API/Http/Adapters/Area/ShowAreaBySectorAdapter';
import ShowAreaBySectorHandler from '../../Application/Handlers/Area/ShowAreaBySectorHandler';
import ShowServiceAction from '../../API/Http/Actions/Service/ShowServiceAction';
import ShowServiceAdapter from '../../API/Http/Adapters/Service/ShowServiceAdapter';
import ShowServiceHandler from '../../Application/Handlers/Service/ShowServiceHandler';
import StoreDepartureAction from '../../API/Http/Actions/Departure/StoreDepartureAction';
import IndexDepartureAction from '../../API/Http/Actions/Departure/IndexDepartureAction';
import DestroyDepartureAction from '../../API/Http/Actions/Departure/DestroyDepartureAction';
import ShowDepartureAction from '../../API/Http/Actions/Departure/ShowDepartureAction';
import DestroyDepartureAdapter from '../../API/Http/Adapters/Departure/DestroyDepartureAdapter';
import ShowDepartureAdapter from '../../API/Http/Adapters/Departure/ShowDepartureAdapter';
import StoreDepartureAdapter from '../../API/Http/Adapters/Departure/StoreDepartureAdapter';
import StoreDepartureHandler from '../../Application/Handlers/Departure/StoreDepartureHandler';
import DestroyDepartureHandler from '../../Application/Handlers/Departure/DestroyDepartureHandler';
import ShowDepartureHandler from '../../Application/Handlers/Departure/ShowDepartureHandler';
import IConsumptionRepository from '../../Domain/Interfaces/IConsumptionRepository';
import IDepartureRepository from '../../Domain/Interfaces/IDepartureRepository';
import IStockDepartureRepository from '../../Domain/Interfaces/IStockDepartureRepository';
import TypeConsumptionRepository from '../../Persistence/TypeORM/Repositories/TypeConsumptionRepository';
import TypeDepartureRepository from '../../Persistence/TypeORM/Repositories/TypeDepartureRepository';
import TypeStockDepartureRepository from '../../Persistence/TypeORM/Repositories/TypeStockDepartureRepository';
import ConsumptionService from '../../Domain/Services/ConsumptionService';
import DepartureService from '../../Domain/Services/DepartureService';
import StockDepartureService from '../../Domain/Services/StockDepartureService';
import UpdateSectorAction from '../../API/Http/Actions/Sector/UpdateSectorAction';
import UpdateSectorAdapter from '../../API/Http/Adapters/Sector/UpdateSectorAdapter';
import UpdateSectorHandler from '../../Application/Handlers/Sector/UpdateSectorHandler';
import { IStorageService } from '../../Domain/Services/Storage/IStorageService';
import StorageService from '../../Domain/Services/Storage/SotarageService';
import UploadImageAction from '../../API/Http/Actions/Sector/UploadMapSectorAction';
import ShowSectorAction from '../../API/Http/Actions/Sector/ShowSectorAction';
import ShowSectorAdapter from '../../API/Http/Adapters/Sector/ShowSectorAdapter';
import ShowSectorHandler from '../../Application/Handlers/Sector/ShowSectorHandler';
import UpdateAreaAction from '../../API/Http/Actions/Area/UpdateAreaAction';
import UpdateAreaAdapter from '../../API/Http/Adapters/Area/UpdateAreaAdapter';
import UpdateAreaHandler from '../../Application/Handlers/Area/UpdateAreaHandler';
import StoreWorkOrderHandler from '../../Application/Handlers/WorkOrder/StoreWorkOrderHandler';
import StoreWorkOrderAdapter from '../../API/Http/Adapters/WorkOrder/StoreWorkOrderAdapter';
import StoreWorkOrderAction from '../../API/Http/Actions/WorkOrder/StoreWorkOrderAction';
import IWorkOrderRepository from '../../Domain/Interfaces/IWorkOrderRepository';
import TypeWorkOrderRepository from '../../Persistence/TypeORM/Repositories/TypeWorkOrderRepository';
import WorkOrderService from '../../Domain/Services/WorkOrderService';
import IndexWorkOrdersAction from '../../API/Http/Actions/WorkOrder/IndexWorkOrdersAction';
import UpdateWorkOrderAction from '../../API/Http/Actions/WorkOrder/UpdateWorkOrderAction';
import UpdateWorkOrderAdapter from '../../API/Http/Adapters/WorkOrder/UpdateWorkOrderAdapter';
import UpdateWorkOrderHandler from '../../Application/Handlers/WorkOrder/UpdateWorkOrderHandler';
import IUserWorkOrderRepository from '../../Domain/Interfaces/IUserWorkOrderRepository';
import TypeUserWorkOrderRepository from '../../Persistence/TypeORM/Repositories/TypeUserWorkOrderRepository';
import AssignWorkOrderHandler from '../../Application/Handlers/WorkOrder/AssignWorkOrderHandler';
import AssignWorkOrderAdapter from '../../API/Http/Adapters/WorkOrder/AssignWorkOrderAdapter';
import AssignWorkOrderAction from '../../API/Http/Actions/WorkOrder/AssignWorkOrderAction';
import TakeWorkOrderAction from '../../API/Http/Actions/WorkOrder/TakeWorkOrderAction';
import TakeWorkOrderAdapter from '../../API/Http/Adapters/WorkOrder/TakeWorkOrderAdapter';
import TakeWorkOrderHandler from '../../Application/Handlers/WorkOrder/TakeWorkOrderHandler';
import CancelWorkOrderHandler from '../../Application/Handlers/WorkOrder/CancelWorkOrderHandler';
import CancelWorkOrderAdapter from '../../API/Http/Adapters/WorkOrder/CancelWorkOrderAdapter';
import CancelWorkOrderAction from '../../API/Http/Actions/WorkOrder/CancelWorkOrderAction';
import CompleteWorkOrderAction from '../../API/Http/Actions/WorkOrder/CompleteWorkOrderAction';
import CompleteWorkOrderAdapter from '../../API/Http/Adapters/WorkOrder/CompleteWorkOrderAdapter';
import CompleteWorkOrderHandler from '../../Application/Handlers/WorkOrder/CompleteWorkOrderHandler';
import ShowAssetAction from '../../API/Http/Actions/Asset/ShowAssetAction';
import ShowAssetAdapter from '../../API/Http/Adapters/Asset/ShowAssetAdapter';
import ShowAssetHandler from '../../Application/Handlers/Asset/ShowAssetHandler';

import UpdateElementAction from '../../API/Http/Actions/Element/UpdateElementAction';
import UpdateElementAdapter from '../../API/Http/Adapters/Element/UpdateElementAdapter';
import UpdateElementHandler from '../../Application/Handlers/Element/UpdateElementHandler';
import IEventRepository from '../../Domain/Interfaces/IEventRepository';
import TypeEventRepository from '../../Persistence/TypeORM/Repositories/TypeEventRepository';
import StoreEventAction from '../../API/Http/Actions/Event/StoreEventAction';
import StoreEventAdapter from '../../API/Http/Adapters/Event/StoreEventAdapter';
import StoreEventHandler from '../../Application/Handlers/Event/StoreEventHandler';
import IUserEventRepository from '../../Domain/Interfaces/IUserEventRepository';
import TypeUserEventRepository from '../../Persistence/TypeORM/Repositories/TypeUserEventRepository';
import IndexEventAction from '../../API/Http/Actions/Event/IndexEventAction';
import UpdateEventAdapter from '../../API/Http/Adapters/Event/UpdateEventAdapter';
import UpdateEventHandler from '../../Application/Handlers/Event/UpdateEventHandler';
import UpdateEventAction from '../../API/Http/Actions/Event/UpdateEventAction';
import IndexEventsByMonthAction from '../../API/Http/Actions/Event/IndexEventsByMonthAction';
import IndexEventsByMonthAdapter from '../../API/Http/Adapters/Event/IndexEventsByMonthAdapter';
import IndexEventsByMonthHandler from '../../Application/Handlers/Event/IndexEventsByMonthHandler';
import DestroyEventHandler from '../../Application/Handlers/Event/DestroyEventHandler';
import DestroyEventAdapter from '../../API/Http/Adapters/Event/DestroyEventAdapter';
import DestroyEventAction from '../../API/Http/Actions/Event/DestroyEventAction';
import IndexWorkOrdersByAuthorAction from '../../API/Http/Actions/WorkOrder/IndexWorkOrdersByAuthorAction';
const DIContainer = new Container();

/**
 * Controllers
 */
DIContainer.bind<UploadImageAction>(UploadImageAction).toSelf();

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

DIContainer.bind<StoreDepartureAction>(StoreDepartureAction).toSelf();
DIContainer.bind<DestroyDepartureAction>(DestroyDepartureAction).toSelf();
DIContainer.bind<IndexDepartureAction>(IndexDepartureAction).toSelf();
DIContainer.bind<ShowDepartureAction>(ShowDepartureAction).toSelf();

DIContainer.bind<UpdateStockAction>(UpdateStockAction).toSelf();
DIContainer.bind<IndexStockAction>(IndexStockAction).toSelf();

DIContainer.bind<StoreSectorAction>(StoreSectorAction).toSelf();
DIContainer.bind<IndexSectorsAction>(IndexSectorsAction).toSelf();
DIContainer.bind<UpdateSectorAction>(UpdateSectorAction).toSelf();
DIContainer.bind<DestroySectorAction>(DestroySectorAction).toSelf();
DIContainer.bind<ShowSectorAction>(ShowSectorAction).toSelf();

DIContainer.bind<StoreAreaAction>(StoreAreaAction).toSelf();
DIContainer.bind<IndexAreasAction>(IndexAreasAction).toSelf();
DIContainer.bind<UpdateAreaAction>(UpdateAreaAction).toSelf();
DIContainer.bind<DestroyAreaAction>(DestroyAreaAction).toSelf();
DIContainer.bind<ShowAreaBySectorAction>(ShowAreaBySectorAction).toSelf();

DIContainer.bind<StoreServiceAction>(StoreServiceAction).toSelf();
DIContainer.bind<IndexServicesAction>(IndexServicesAction).toSelf();
DIContainer.bind<DestroyServiceAction>(DestroyServiceAction).toSelf();
DIContainer.bind<ShowServiceAction>(ShowServiceAction).toSelf();

DIContainer.bind<StoreElementAction>(StoreElementAction).toSelf();
DIContainer.bind<IndexElementsAction>(IndexElementsAction).toSelf();
DIContainer.bind<DestroyElementAction>(DestroyElementAction).toSelf();
DIContainer.bind<UpdateElementAction>(UpdateElementAction).toSelf();

DIContainer.bind<StoreAssetAction>(StoreAssetAction).toSelf();
DIContainer.bind<IndexAssetsAction>(IndexAssetsAction).toSelf();
DIContainer.bind<DestroyAssetAction>(DestroyAssetAction).toSelf();
DIContainer.bind<ShowAssetAction>(ShowAssetAction).toSelf();

DIContainer.bind<StoreWorkOrderAction>(StoreWorkOrderAction).toSelf();
DIContainer.bind<IndexWorkOrdersAction>(IndexWorkOrdersAction).toSelf();
DIContainer.bind<UpdateWorkOrderAction>(UpdateWorkOrderAction).toSelf();
DIContainer.bind<AssignWorkOrderAction>(AssignWorkOrderAction).toSelf();
DIContainer.bind<TakeWorkOrderAction>(TakeWorkOrderAction).toSelf();
DIContainer.bind<CancelWorkOrderAction>(CancelWorkOrderAction).toSelf();
DIContainer.bind<CompleteWorkOrderAction>(CompleteWorkOrderAction).toSelf();
DIContainer.bind<IndexWorkOrdersByAuthorAction>(IndexWorkOrdersByAuthorAction).toSelf();

DIContainer.bind<StoreEventAction>(StoreEventAction).toSelf();
DIContainer.bind<IndexEventAction>(IndexEventAction).toSelf();
DIContainer.bind<IndexEventsByMonthAction>(IndexEventsByMonthAction).toSelf();
DIContainer.bind<UpdateEventAction>(UpdateEventAction).toSelf();
DIContainer.bind<DestroyEventAction>(DestroyEventAction).toSelf();

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

DIContainer.bind<DestroyDepartureAdapter>(DestroyDepartureAdapter).toSelf();
DIContainer.bind<ShowDepartureAdapter>(ShowDepartureAdapter).toSelf();
DIContainer.bind<StoreDepartureAdapter>(StoreDepartureAdapter).toSelf();

DIContainer.bind<StoreSectorAdapter>(StoreSectorAdapter).toSelf();
DIContainer.bind<UpdateSectorAdapter>(UpdateSectorAdapter).toSelf();
DIContainer.bind<DestroySectorAdapter>(DestroySectorAdapter).toSelf();
DIContainer.bind<ShowSectorAdapter>(ShowSectorAdapter).toSelf();

DIContainer.bind<StoreAreaAdapter>(StoreAreaAdapter).toSelf();
DIContainer.bind<DestroyAreaAdapter>(DestroyAreaAdapter).toSelf();
DIContainer.bind<UpdateAreaAdapter>(UpdateAreaAdapter).toSelf();
DIContainer.bind<ShowAreaBySectorAdapter>(ShowAreaBySectorAdapter).toSelf();

DIContainer.bind<StoreServiceAdapter>(StoreServiceAdapter).toSelf();
DIContainer.bind<DestroyServiceAdapter>(DestroyServiceAdapter).toSelf();
DIContainer.bind<ShowServiceAdapter>(ShowServiceAdapter).toSelf();

DIContainer.bind<StoreElementAdapter>(StoreElementAdapter).toSelf();
DIContainer.bind<DestroyElementAdapter>(DestroyElementAdapter).toSelf();
DIContainer.bind<UpdateElementAdapter>(UpdateElementAdapter).toSelf();

DIContainer.bind<StoreAssetAdapter>(StoreAssetAdapter).toSelf();
DIContainer.bind<DestroyAssetAdapter>(DestroyAssetAdapter).toSelf();
DIContainer.bind<ShowAssetAdapter>(ShowAssetAdapter).toSelf();

DIContainer.bind<StoreWorkOrderAdapter>(StoreWorkOrderAdapter).toSelf();
DIContainer.bind<UpdateWorkOrderAdapter>(UpdateWorkOrderAdapter).toSelf();
DIContainer.bind<AssignWorkOrderAdapter>(AssignWorkOrderAdapter).toSelf();
DIContainer.bind<TakeWorkOrderAdapter>(TakeWorkOrderAdapter).toSelf();
DIContainer.bind<CancelWorkOrderAdapter>(CancelWorkOrderAdapter).toSelf();
DIContainer.bind<CompleteWorkOrderAdapter>(CompleteWorkOrderAdapter).toSelf();

DIContainer.bind<StoreEventAdapter>(StoreEventAdapter).toSelf();
DIContainer.bind<IndexEventsByMonthAdapter>(IndexEventsByMonthAdapter).toSelf();
DIContainer.bind<UpdateEventAdapter>(UpdateEventAdapter).toSelf();
DIContainer.bind<DestroyEventAdapter>(DestroyEventAdapter).toSelf();

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

DIContainer.bind<StoreDepartureHandler>(StoreDepartureHandler).toSelf();
DIContainer.bind<DestroyDepartureHandler>(DestroyDepartureHandler).toSelf();
DIContainer.bind<ShowDepartureHandler>(ShowDepartureHandler).toSelf();

DIContainer.bind<StoreStockHandler>(StoreStockHandler).toSelf();
DIContainer.bind<UpdateStockHandler>(UpdateStockHandler).toSelf();

DIContainer.bind<StoreSectorHandler>(StoreSectorHandler).toSelf();
DIContainer.bind<UpdateSectorHandler>(UpdateSectorHandler).toSelf();
DIContainer.bind<DestroySectorHandler>(DestroySectorHandler).toSelf();
DIContainer.bind<ShowSectorHandler>(ShowSectorHandler).toSelf();

DIContainer.bind<StoreAreaHandler>(StoreAreaHandler).toSelf();
DIContainer.bind<UpdateAreaHandler>(UpdateAreaHandler).toSelf();
DIContainer.bind<DestroyAreaHandler>(DestroyAreaHandler).toSelf();
DIContainer.bind<ShowAreaBySectorHandler>(ShowAreaBySectorHandler).toSelf();

DIContainer.bind<StoreServiceHandler>(StoreServiceHandler).toSelf();
DIContainer.bind<DestroyServiceHandler>(DestroyServiceHandler).toSelf();
DIContainer.bind<ShowServiceHandler>(ShowServiceHandler).toSelf();

DIContainer.bind<StoreElementHandler>(StoreElementHandler).toSelf();
DIContainer.bind<DestroyElementHandler>(DestroyElementHandler).toSelf();
DIContainer.bind<UpdateElementHandler>(UpdateElementHandler).toSelf();

DIContainer.bind<StoreAssetHandler>(StoreAssetHandler).toSelf();
DIContainer.bind<DestroyAssetHandler>(DestroyAssetHandler).toSelf();
DIContainer.bind<ShowAssetHandler>(ShowAssetHandler).toSelf();

DIContainer.bind<StoreWorkOrderHandler>(StoreWorkOrderHandler).toSelf();
DIContainer.bind<UpdateWorkOrderHandler>(UpdateWorkOrderHandler).toSelf();
DIContainer.bind<AssignWorkOrderHandler>(AssignWorkOrderHandler).toSelf();
DIContainer.bind<TakeWorkOrderHandler>(TakeWorkOrderHandler).toSelf();
DIContainer.bind<CancelWorkOrderHandler>(CancelWorkOrderHandler).toSelf();
DIContainer.bind<CompleteWorkOrderHandler>(CompleteWorkOrderHandler).toSelf();

DIContainer.bind<StoreEventHandler>(StoreEventHandler).toSelf();
DIContainer.bind<IndexEventsByMonthHandler>(IndexEventsByMonthHandler).toSelf();
DIContainer.bind<UpdateEventHandler>(UpdateEventHandler).toSelf();
DIContainer.bind<DestroyEventHandler>(DestroyEventHandler).toSelf();

/*
 * Services
 */
DIContainer.bind<UserService>(UserService).toSelf();
DIContainer.bind<UserRoleService>(UserRoleService).toSelf();
DIContainer.bind<ProductService>(ProductService).toSelf();
DIContainer.bind<StockEntryService>(StockEntryService).toSelf();
DIContainer.bind<StockDepartureService>(StockDepartureService).toSelf();
DIContainer.bind<PurchaseService>(PurchaseService).toSelf();
DIContainer.bind<ConsumptionService>(ConsumptionService).toSelf();
DIContainer.bind<StockService>(StockService).toSelf();
DIContainer.bind<EntryService>(EntryService).toSelf();
DIContainer.bind<DepartureService>(DepartureService).toSelf();
DIContainer.bind<AreaServiceService>(AreaServiceService).toSelf();
DIContainer.bind<AssetService>(AssetService).toSelf();
DIContainer.bind<SectorService>(SectorService).toSelf();
DIContainer.bind<AreaService>(AreaService).toSelf();
DIContainer.bind<ServiceService>(ServiceService).toSelf();
DIContainer.bind<ElementService>(ElementService).toSelf();
DIContainer.bind<WorkOrderService>(WorkOrderService).toSelf();
DIContainer.bind<EventService>(EventService).toSelf();

DIContainer.bind<ILoggerService>(INTERFACES.ILoggerService).to(WinstonLogger);
DIContainer.bind<IStorageService>(INTERFACES.IStorageService).to(StorageService);

/**
 * Repository Interfaces
 */
DIContainer.bind<IUserRepository>(INTERFACES.IUserRepository).to(TypeUserRepository);
DIContainer.bind<IUserRoleRepository>(INTERFACES.IUserRoleRepository).to(TypeUserRoleRepository);
DIContainer.bind<IRoleRepository>(INTERFACES.IRoleRepository).to(TypeRoleRepository);
DIContainer.bind<IPurchaseRepository>(INTERFACES.IPurchaseRepository).to(TypePurchaseRepository);
DIContainer.bind<IConsumptionRepository>(INTERFACES.IConsumptionRepository).to(TypeConsumptionRepository);
DIContainer.bind<IStockRepository>(INTERFACES.IStockRepository).to(TypeStockRepository);
DIContainer.bind<IEntryRepository>(INTERFACES.IEntryRepository).to(TypeEntryRepository);
DIContainer.bind<IDepartureRepository>(INTERFACES.IDepartureRepository).to(TypeDepartureRepository);
DIContainer.bind<IStockEntryRepository>(INTERFACES.IStockEntryRepository).to(TypeStockEntryRepository);
DIContainer.bind<IStockDepartureRepository>(INTERFACES.IStockDepartureRepository).to(TypeStockDepartureRepository);
DIContainer.bind<IProductRepository>(INTERFACES.IProductRepository).to(TypeProductRepository);
DIContainer.bind<ISectorRepository>(INTERFACES.ISectorRepository).to(TypeSectorRepository);
DIContainer.bind<IAreaRepository>(INTERFACES.IAreaRepository).to(TypeAreaRepository);
DIContainer.bind<IAreaServiceRepository>(INTERFACES.IAreaServiceRepository).to(TypeAreaServiceRepository);
DIContainer.bind<IServiceRepository>(INTERFACES.IServiceRepository).to(TypeServiceRepository);
DIContainer.bind<IElementRepository>(INTERFACES.IElementRepository).to(TypeElementRepository);
DIContainer.bind<IAssetRepository>(INTERFACES.IAssetRepository).to(TypeAssetRepository);
DIContainer.bind<IWorkOrderRepository>(INTERFACES.IWorkOrderRepository).to(TypeWorkOrderRepository);
DIContainer.bind<IUserWorkOrderRepository>(INTERFACES.IUserWorkOrderRepository).to(TypeUserWorkOrderRepository);
DIContainer.bind<IEventRepository>(INTERFACES.IEventRepository).to(TypeEventRepository);
DIContainer.bind<IUserEventRepository>(INTERFACES.IUserEventRepository).to(TypeUserEventRepository);

export default DIContainer;
