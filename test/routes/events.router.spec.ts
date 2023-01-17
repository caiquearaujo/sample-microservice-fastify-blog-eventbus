import { FastifyInstance } from 'fastify';
import ApiServer from '@/server/ApiServer';
import FastifyApplierGroup from '@/server/FastifyApplierGroup';
import routes from '@/routes';
import EventBus from '@/events/EventBus';

let app: FastifyInstance;
const mockedEventBus = EventBus as jest.Mocked<typeof EventBus>;

beforeAll(async () => {
	const api = new ApiServer({
		routes: new FastifyApplierGroup(...routes),
		plugins: new FastifyApplierGroup(),
	});

	await api.bootstrap();
	app = api.app;

	EventBus.emit = jest.fn();
	EventBus.subscribe = jest.fn();
	EventBus.uncaughtEvents = jest.fn();
});

describe('Events Routes', () => {
	it('POST /events/emit -> shoud emit an event', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/events/emit',
			payload: {
				event: 'test.event',
				payload: {
					test: 'test',
				},
			},
		});

		expect(response.statusCode).toBe(200);
		expect(JSON.parse(response.body)).toStrictEqual({
			status: 'OK',
		});

		expect(mockedEventBus.emit).toHaveBeenCalledWith('test.event', {
			test: 'test',
		});
		expect(mockedEventBus.emit).toHaveBeenCalledTimes(1);
	});

	it('POST /events/subscribe -> should subscribe to an event', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/events/subscribe',
			payload: {
				events: ['test.event', 'test.event2'],
				webhook: 'http://localhost:3000',
			},
		});

		expect(response.statusCode).toBe(200);
		expect(JSON.parse(response.body)).toStrictEqual({
			status: 'OK',
		});

		expect(mockedEventBus.subscribe).toHaveBeenCalledWith(
			'test.event',
			'http://localhost:3000'
		);

		expect(mockedEventBus.subscribe).toHaveBeenCalledWith(
			'test.event2',
			'http://localhost:3000'
		);

		expect(mockedEventBus.subscribe).toHaveBeenCalledTimes(2);
	});

	it('POST /events/uncaught -> should return uncaught events', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/events/uncaught',
			payload: {
				events: ['test.event'],
				webhook: 'http://localhost:3003',
			},
		});

		expect(response.statusCode).toBe(200);

		expect(mockedEventBus.uncaughtEvents).toHaveBeenCalledWith(
			['test.event'],
			'http://localhost:3003'
		);
	});
});
