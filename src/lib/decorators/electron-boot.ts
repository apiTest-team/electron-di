import { ServiceOptions } from "../interfaces/service-options.interface";
import { ServiceMetadata } from "../interfaces/service-metadata.interface";
import { Constructable } from "../types/constructable.type";
import { ContainerRegistry } from "../container-registry.class";
import { EMPTY_VALUE } from "../empty.const";
import { Token } from "../token.class";

const electronBootToken = new Token("electron-boot")
export function ElectronBoot<T = unknown>(): Function;
export function ElectronBoot<T = unknown>(options: ServiceOptions<T>): Function;
export function ElectronBoot<T>(): ClassDecorator {
  return targetConstructor => {
    const serviceMetadata: ServiceMetadata<T> = {
      id: electronBootToken,
      type: targetConstructor as unknown as Constructable<T>,
      factory: undefined,
      multiple: false,
      eager: false,
      scope: 'singleton', // 保证electron是单例
      referencedBy: new Map().set(ContainerRegistry.defaultContainer.id, ContainerRegistry.defaultContainer),
      value: EMPTY_VALUE,
    };
    ContainerRegistry.defaultContainer.set(serviceMetadata);
  };
}
