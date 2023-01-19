import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import { TFnApplyToFastify } from '@/types/types';

const callable: TFnApplyToFastify = async (app: FastifyInstance) => {
	await app.register(fastifyCors, {
		origin: true,
	});
};

export default callable;
