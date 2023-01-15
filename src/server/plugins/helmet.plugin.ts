import { FastifyInstance } from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import { TFnApplyToFastify } from '@/types/types';

const callable: TFnApplyToFastify = async (app: FastifyInstance) => {
	app.register(fastifyHelmet);
};

export default callable;
