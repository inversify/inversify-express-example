import { Container, inject } from 'inversify';
import { autoProvide, makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators';
let container = new Container();

let provide = makeProvideDecorator(container);
let fluentProvider = makeFluentProvideDecorator(container);

let provideNamed = function(identifier, name) {
    return fluentProvider(identifier)
              .whenTargetNamed(name)
              .done();
};

export { container, autoProvide, provide, provideNamed, inject };
