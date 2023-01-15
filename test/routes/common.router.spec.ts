import { FastifyInstance } from 'fastify';
import ApiServer from '@/server/ApiServer';
import FastifyApplierGroup from '@/server/FastifyApplierGroup';
import commomRouter from '@/routes/common.router';

let app: FastifyInstance;

beforeAll(async () => {
	const api = new ApiServer({
		routes: new FastifyApplierGroup(commomRouter),
		plugins: new FastifyApplierGroup(),
	});

	await api.bootstrap();
	app = api.app;
});

describe('Common Routes', () => {
	it('GET /status', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/status',
		});

		expect(response.statusCode).toBe(200);
		expect(JSON.parse(response.body)).toStrictEqual({
			running: true,
		});
	});
});
