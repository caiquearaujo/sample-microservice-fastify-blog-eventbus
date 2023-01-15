import { FastifyInstance } from 'fastify';
import { TFnApplyToFastify } from '@/types/types';

const callable: TFnApplyToFastify = async (app: FastifyInstance) => {
	app.get('/status', (request, reply) => {
		reply.send({
			running: true,
		});
	});
};

export default callable;
