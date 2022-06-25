import "reflect-metadata"
import { Constructable, Container, Service, ServiceMetadata, ServiceOptions, Token } from "../lib";
import { ContainerRegistry } from "../lib/container-registry.class";
import { EMPTY_VALUE } from "../lib/empty.const";

abstract class Controller {
    protected constructor() {
        console.log("进来了");
    }
}

@ElectrionBoot()
class Application {

}



let controllerToken = new Token<Controller>("controller")
export function Windows<T = unknown>():Function
export function Windows<T = unknown>(options: ServiceOptions<T>): Function;
export function Windows<T>():ClassDecorator{
    return targetConstructor => {
        const serviceMetadata:ServiceMetadata<T> = {
            id:controllerToken,
            type:targetConstructor as unknown as Constructable<T>,
            factory:undefined,
            multiple:true,
            eager:true,
            scope:'container',
            referencedBy:new Map().set(ContainerRegistry.defaultContainer.id, ContainerRegistry.defaultContainer),
            value: EMPTY_VALUE,
        }
        ContainerRegistry.defaultContainer.set(serviceMetadata);
    };
}




@Service()
class Main {
    constructor() {
        console.log("我票了");
    }
}



@Windows()
class MainWindows extends Controller{
    constructor() {
        super();
    }
}

@Windows()
class LoginWindows extends Controller{

}

// let controllers = Container.getMany(controllerToken)
// console.log(controllers)