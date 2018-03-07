import { AsyncContainerModule } from "inversify";
import { Repository, Connection } from "typeorm";
import { Movie } from "./entities/movie";
import { getDbConnection } from "./db";
import { getRepository } from "./repositories/movie_repository";
import { TYPE } from "./constants/types";

export const bindings = new AsyncContainerModule(async (bind) => {

    await getDbConnection();
    await require("./controllers/movie_controller");

    bind<Repository<Movie>>(TYPE.MovieRepository).toDynamicValue(() => {
        return getRepository();
    }).inRequestScope();

});
