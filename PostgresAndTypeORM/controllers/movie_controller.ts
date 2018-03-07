import express from "express";
import { inject } from "inversify";
import {
    controller,
    httpGet,
    httpPost,
    response,
    requestParam,
    requestBody
} from "inversify-express-utils";
import { Repository } from "typeorm";
import { Movie } from "../entities/movie";
import { TYPE } from "../constants/types";

@controller("/api/v1/movies")
export class MovieController {
    private readonly _movieRepository: Repository<Movie>;
    public constructor(
        @inject(TYPE.MovieRepository)movieRepository: Repository<Movie>
    ) {
        this._movieRepository = movieRepository;
    }
    @httpGet("/")
    public async get(
        @response() res: express.Response
    ) {
        try {
            return await this._movieRepository.find();
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }
    @httpGet("/:year")
    public async getByYear(
        @response() res: express.Response,
        @requestParam("year") yearParam: string
    ) {
        try {
            const year = parseInt(yearParam);
            return await this._movieRepository.find({
                year
            });
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }
    @httpPost("/")
    public async post(
        @response() res: express.Response,
        @requestBody() newMovie: Movie
    ) {
        if (
            !(typeof newMovie.title === "string") || isNaN(newMovie.year)
        ) {
            res.status(400);
            res.send(`Invalid Movie!`);
        }
        try {
            return await this._movieRepository.save(newMovie);
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }
}
