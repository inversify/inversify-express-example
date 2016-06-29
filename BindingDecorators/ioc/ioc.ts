import 'reflect-metadata';
import { Kernel, inject } from 'inversify';
import { autoProvide, makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators';

let kernel = new Kernel();

let provide = makeProvideDecorator(kernel);
let fluentProvider = makeFluentProvideDecorator(kernel);

let provideNamed = function(identifier, name) {
    return fluentProvider(identifier)
              .whenTargetNamed(name)
              .done();
};

export { kernel, autoProvide, provide, provideNamed, inject };
