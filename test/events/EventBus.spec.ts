import EventBus from '@/events/EventBus';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Event Bus', () => {
	afterEach(jest.clearAllMocks);

	it('should be able to subscribe to an event', () => {
		const response = EventBus.subscribe(
			'test.event',
			'http://localhost:3000'
		);

		expect(response).toBe(true);
		expect(EventBus.subscribers()['test.event']).toHaveLength(1);
		expect(EventBus.subscribers()['test.event'][0]).toBe(
			'http://localhost:3000'
		);
	});

	it('cannot subscribe an existing webhook', () => {
		const response = EventBus.subscribe(
			'test.event',
			'http://localhost:3000'
		);

		expect(response).toBe(false);
	});

	it('should be able to emit an event', async () => {
		EventBus.subscribe('test.event', 'http://localhost:3001');

		const response = await EventBus.emit('test.event', {
			test: 'test',
		});

		expect(response).toBe(true);

		expect(mockedAxios.post).toHaveBeenCalledWith(
			'http://localhost:3000',
			{
				event: 'test.event',
				payload: { test: 'test' },
			}
		);

		expect(mockedAxios.post).toHaveBeenCalledWith(
			'http://localhost:3001',
			{
				event: 'test.event',
				payload: { test: 'test' },
			}
		);

		expect(mockedAxios.post).toHaveBeenCalledTimes(2);
	});

	it('should not emit an event if there are no subscribers', async () => {
		const response = await EventBus.emit('test.unknownevent', {
			test: 'test',
		});

		expect(response).toBe(false);
	});
});
