import { Container } from 'inversify';
import { INTERFACES } from './interfaces.types';

import IUserRepository from '../../Domain/Interfaces/IUserRepository';
import IUserRoleRepository from '../../Domain/Interfaces/IUserRoleRepository';
import IRoleRepository from '../../Domain/Interfaces/IRoleRepository';

import TypeUserRepository from '../../Persistence/TypeORM/Repositories/TypeUserRepository';
import TypeUserRoleRepository from '../../Persistence/TypeORM/Repositories/TypeUserRoleRepository';
import TypeRoleRepository from '../../Persistence/TypeORM/Repositories/TypeRoleRepository';

import LoginAction from '../../API/Http/Actions/Auth/LoginAction';

import StoreRooftopperAction from '../../API/Http/Actions/Rooftoppers/StoreRooftopperAction';

import StoreProductAction from '../../API/Http/Actions/Product/StoreProductAction';
import StoreProductAdapter from '../../API/Http/Adapters/Product/StoreProductAdapter';
import StoreProductHandler from '../../Application/Handlers/Product/StoreProductHandler';
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
import StoreEducationAdapter from '../../API/Http/Adapters/Educations/StoreEducationAdapter';
import StoreEducationHandler from '../../Application/Handlers/Educations/StoreEducationHandler';
import StoreEducationAction from '../../API/Http/Actions/Educations/StoreEducationAction';
import IEducationRepository from '../../Domain/Interfaces/IEducationRepository';
import TypeEducationRepository from '../../Persistence/TypeORM/Repositories/TypeEducationRepository';
import EducationService from '../../Domain/Services/EducationService';
import IndexEducationsAction from '../../API/Http/Actions/Educations/IndexEducationsAction';
import UpdateEducationAdapter from '../../API/Http/Adapters/Educations/updateEducationAdapter';
import UpdateEducationAction from '../../API/Http/Actions/Educations/UpdateEducationAction';
import UpdateEducationHandler from '../../Application/Handlers/Educations/updateEducationHandler';
import ShowEducationAction from '../../API/Http/Actions/Educations/ShowEducationAction';
import ShowEducationAdapter from '../../API/Http/Adapters/Educations/showEducationAdapter';
import ShowEducationHandler from '../../Application/Handlers/Educations/ShowEducationHandler';
import DestroyEducationAction from '../../API/Http/Actions/Educations/DestroyEducationAction';
import DestroyEducationAdapter from '../../API/Http/Adapters/Educations/DestroyEducationAdapter';
import DestroyEducationHandler from '../../Application/Handlers/Educations/DestroyEducationHandler';

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

DIContainer.bind<StoreEducationAction>(StoreEducationAction).toSelf();
DIContainer.bind<IndexEducationsAction>(IndexEducationsAction).toSelf();
DIContainer.bind<UpdateEducationAction>(UpdateEducationAction).toSelf();
DIContainer.bind<ShowEducationAction>(ShowEducationAction).toSelf();
DIContainer.bind<DestroyEducationAction>(DestroyEducationAction).toSelf();

DIContainer.bind<IndexUsersAction>(IndexUsersAction).toSelf();
DIContainer.bind<StoreUsersAction>(StoreUsersAction).toSelf();
DIContainer.bind<ShowUsersAction>(ShowUsersAction).toSelf();
DIContainer.bind<UpdateUsersAction>(UpdateUsersAction).toSelf();
DIContainer.bind<DisableUsersAction>(DisableUsersAction).toSelf();
DIContainer.bind<EnableUsersAction>(EnableUsersAction).toSelf();
DIContainer.bind<DestroyUserAction>(DestroyUserAction).toSelf();

DIContainer.bind<StoreProductAction>(StoreProductAction).toSelf();

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

DIContainer.bind<StoreEducationAdapter>(StoreEducationAdapter).toSelf();
DIContainer.bind<UpdateEducationAdapter>(UpdateEducationAdapter).toSelf();
DIContainer.bind<ShowEducationAdapter>(ShowEducationAdapter).toSelf();
DIContainer.bind<DestroyEducationAdapter>(DestroyEducationAdapter).toSelf();

DIContainer.bind<StoreUserAdapter>(StoreUserAdapter).toSelf();
DIContainer.bind<ShowUserAdapter>(ShowUserAdapter).toSelf();
DIContainer.bind<UpdateUserAdapter>(UpdateUserAdapter).toSelf();
DIContainer.bind<DisableUserAdapter>(DisableUserAdapter).toSelf();
DIContainer.bind<EnableUserAdapter>(EnableUserAdapter).toSelf();
DIContainer.bind<DestroyUserAdapter>(DestroyUserAdapter).toSelf();

DIContainer.bind<StoreProductAdapter>(StoreProductAdapter).toSelf();

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

DIContainer.bind<StoreEducationHandler>(StoreEducationHandler).toSelf();
DIContainer.bind<UpdateEducationHandler>(UpdateEducationHandler).toSelf();
DIContainer.bind<ShowEducationHandler>(ShowEducationHandler).toSelf();
DIContainer.bind<DestroyEducationHandler>(DestroyEducationHandler).toSelf();

DIContainer.bind<StoreUserHandler>(StoreUserHandler).toSelf();
DIContainer.bind<ShowUserHandler>(ShowUserHandler).toSelf();
DIContainer.bind<UpdateUserHandler>(UpdateUserHandler).toSelf();
DIContainer.bind<DisableUserHandler>(DisableUserHandler).toSelf();
DIContainer.bind<EnableUserHandler>(EnableUserHandler).toSelf();
DIContainer.bind<DestroyUserHandler>(DestroyUserHandler).toSelf();

DIContainer.bind<StoreProductHandler>(StoreProductHandler).toSelf();

/*
 * Services
 */
DIContainer.bind<UserService>(UserService).toSelf();
DIContainer.bind<UserRoleService>(UserRoleService).toSelf();
DIContainer.bind<RooftopperProfileService>(RooftopperProfileService).toSelf();
DIContainer.bind<EducationService>(EducationService).toSelf();

DIContainer.bind<ILoggerService>(INTERFACES.ILoggerService).to(WinstonLogger);

/**
 * Repository Interfaces
 */
DIContainer.bind<IUserRepository>(INTERFACES.IUserRepository).to(TypeUserRepository);
DIContainer.bind<IUserRoleRepository>(INTERFACES.IUserRoleRepository).to(TypeUserRoleRepository);
DIContainer.bind<IRoleRepository>(INTERFACES.IRoleRepository).to(TypeRoleRepository);
DIContainer.bind<IEducationRepository>(INTERFACES.IEducationRepository).to(TypeEducationRepository);
DIContainer.bind<IRooftopperProfileRepository>(INTERFACES.IRooftopperProfileRepository).to(
  TypeRooftopperProfileRepository,
);
DIContainer.bind<IProductRepository>(INTERFACES.IProductRepository).to(TypeProductRepository);

export default DIContainer;
