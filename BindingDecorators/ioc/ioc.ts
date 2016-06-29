import 'reflect-metadata';
import { Kernel, inject } from 'inversify';
import { autoProvide, makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';

let kernel = new Kernel();

if (process.env.NODE_ENV === 'development') {
    let logger = makeLoggerMiddleware();
    kernel.applyMiddleware(logger);
}

let provide = makeProvideDecorator(kernel);
let fluentProvider = makeFluentProvideDecorator(kernel);

let provideNamed = function(identifier, name) {
    return fluentProvider(identifier)
              .whenTargetNamed(name)
              .done();
};

export { kernel, autoProvide, provide, provideNamed, inject };
