import { FastifyInstance } from 'fastify';
import fastifyCompress from '@fastify/compress';
import { TFnApplyToFastify } from '@/types/types';

const callable: TFnApplyToFastify = async (app: FastifyInstance) => {
	app.register(fastifyCompress, { global: true });
};

export default callable;
