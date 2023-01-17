import { FastifyInstance } from 'fastify';
import fastifyRateLimit from '@fastify/rate-limit';
import { TFnApplyToFastify } from '@/types/types';

const callable: TFnApplyToFastify = async (app: FastifyInstance) => {
	await app.register(fastifyRateLimit, {
		max: 100,
		timeWindow: '1 minute',
	});
};

export default callable;
