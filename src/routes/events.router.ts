import { FastifyInstance } from 'fastify';
import { TFnApplyToFastify } from '@/types/types';
import EventBus from '@/events/EventBus';

const emit: TFnApplyToFastify = async (app: FastifyInstance) => {
	app.post('/events/emit', (request, reply) => {
		const { event, payload } = request.body as any;
		EventBus.emit(event, payload);

		reply.send({
			status: 'OK',
		});
	});
};

const subscribe: TFnApplyToFastify = async (app: FastifyInstance) => {
	app.post('/events/subscribe', (request, reply) => {
		const { events, webhook } = request.body as any;

		events.forEach((event: string) => {
			EventBus.subscribe(event, webhook);
		});

		reply.send({
			status: 'OK',
		});
	});
};

const uncaught: TFnApplyToFastify = async (app: FastifyInstance) => {
	app.post('/events/uncaught', (request, reply) => {
		const { events, webhook } = request.body as any;
		reply.send(EventBus.uncaughtEvents(events, webhook));
	});
};
export { emit, subscribe, uncaught };
