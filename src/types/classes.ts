import { FastifyInstance } from 'fastify';
import { IApplyToFastify } from './interfaces';
import { TEnvVariables } from './types';

export interface IApiServer {
	app: FastifyInstance;
	routes: IApplyToFastify;
	plugins: IApplyToFastify;
	env: TEnvVariables;

	bootstrap(): Promise<IHttpServer>;
}

export interface IHttpServer {
	api: IApiServer;
	start(): Promise<boolean>;
	restart(): Promise<boolean>;
	stop(): Promise<boolean>;
	isRunning(): boolean;
}
