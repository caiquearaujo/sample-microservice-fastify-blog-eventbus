import fastify, { FastifyInstance } from 'fastify';
import path from 'path';

import { IApiServer, IHttpServer } from '@/types/classes';
import { IApplyToFastify } from '@/types/interfaces';
import { TAvailableEnvs, TEnvVariables } from '@/types/types';
import { ENVIRONMENT, HOST, NAME, PORT, VERSION } from '@/env/config';
import Logger from '@/utils/Logger';

import HttpServer from './HttpServer';

export default class ApiServer implements IApiServer {
	app: FastifyInstance;

	routes: IApplyToFastify;

	plugins: IApplyToFastify;

	env: TEnvVariables;

	constructor(options: {
		routes: IApplyToFastify;
		plugins: IApplyToFastify;
	}) {
		this.env = {
			name: NAME ?? 'api-server',
			version: VERSION ?? '0.1.0',
			port: parseInt(PORT ?? '80', 10),
			host: HOST ?? '0.0.0.0',
			environment: ENVIRONMENT as TAvailableEnvs,
		};

		this.app = fastify({
			logger: {
				file: path.resolve(
					__dirname,
					'..',
					'..',
					'logs',
					'server.log'
				),
			},
			trustProxy: true,
		});

		this.routes = options.routes;
		this.plugins = options.plugins;
	}

	public async bootstrap(): Promise<IHttpServer> {
		await this.init();
		return new HttpServer(this);
	}

	protected async init(): Promise<void> {
		// Prepare application logger
		Logger.prepareInstance(this.app.log);

		// Plugins
		await this.plugins.apply(this.app, this.env);

		// Routes
		await this.routes.apply(this.app, this.env);

		// Captura rotas inexistentes
		this.app.setNotFoundHandler((request, reply) => {
			reply.status(404).send({
				status: 404,
				name: 'NotFound',
				message: 'The resource you are looking for is not found.',
			});
		});

		// Captura qualquer erro da aplicação
		this.app.setErrorHandler((error, request, reply) => {
			const { name = 'UnknownError', message = 'Error is unknown' } =
				error;

			this.app.log.error(error);

			reply.status(parseInt(error.code ?? '500', 10)).send({
				status: error.code ?? 500,
				name,
				message,
			});
		});
	}
}
