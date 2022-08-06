import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IAssetRepository from '../../../Domain/Interfaces/IAssetRepository';
import DestroyAssetCommand from '../../Commands/Asset/DestroyAssetCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';

@injectable()
export default class DestroyAssetHandler {
  private assetRepository: IAssetRepository;

  public constructor(@inject(INTERFACES.IAssetRepository) assetRepository: IAssetRepository) {
    this.assetRepository = assetRepository;
  }

  public async execute(command: DestroyAssetCommand): Promise<boolean> {
    const asset = await this.assetRepository.findOneById(command.getId());

    if (!asset) {
      throw new EntityNotFoundException(`No se encontró el activo con id: ${command.getId()}`);
    }
    const assetWasDestroyed = await this.assetRepository.destroy(asset);

    if (!assetWasDestroyed) {
      throw new CannotDeleteEntity(`No se pudo borrar el activo con id: ${command.getId()}`);
    }

    return assetWasDestroyed;
  }
}
