import type { DefaultSharedModuleContext, LangiumServices, LangiumSharedServices, Module, PartialLangiumServices } from 'langium';
import { createDefaultModule, createDefaultSharedModule, inject } from 'langium';
import { RobbotMlGeneratedModule, RobbotMlGeneratedSharedModule } from './generated/module.js';
import { RobbotMlValidator, registerValidationChecks } from './robbot-ml-validator.js';
import { weaveAcceptMethods } from '../semantics/accept-weaver.js';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type RobbotMlAddedServices = {
    validation: {
        RobbotMlValidator: RobbotMlValidator
    }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type RobbotMlServices = LangiumServices & RobbotMlAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const RobbotMlModule: Module<RobbotMlServices, PartialLangiumServices & RobbotMlAddedServices> = {
    validation: {
        RobbotMlValidator: () => new RobbotMlValidator()
    }
};

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createRobbotMlServices(context: DefaultSharedModuleContext): {
    shared: LangiumSharedServices,
    RobbotMl: RobbotMlServices
} {
    const shared = inject(
        createDefaultSharedModule(context),
        RobbotMlGeneratedSharedModule
    );
    const RobbotMl = inject(
        createDefaultModule({ shared }),
        RobbotMlGeneratedModule,
        RobbotMlModule
    );
    shared.ServiceRegistry.register(RobbotMl);
    registerValidationChecks(RobbotMl);
    
    weaveAcceptMethods(RobbotMl) ; //

    return { shared, RobbotMl };
}
