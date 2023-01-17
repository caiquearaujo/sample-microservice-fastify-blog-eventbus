import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import { TFnApplyToFastify } from '@/types/types';

const callable: TFnApplyToFastify = async (app: FastifyInstance) => {
	await app.register(fastifyCors, {
		origin: (origin, cb) => {
			const { hostname } = new URL(origin);

			if (hostname === 'localhost') {
				cb(null, true);
				return;
			}

			// Generate an error on other origins, disabling access
			cb(new Error('This connection is not allowed'), false);
		},
	});
};

export default callable;
