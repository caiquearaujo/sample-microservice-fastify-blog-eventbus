import axios from 'axios';
import Logger from '@/utils/Logger';

const subscribers: Record<string, string[]> = {};
const eventsEmitted: Array<{
	event: string;
	payload: object;
	destination: string[];
	timestamp: number;
}> = [];

export default class EventBus {
	public static subscribers() {
		return subscribers;
	}

	public static eventsEmitted() {
		return eventsEmitted;
	}

	public static uncaughtEvents(
		expectedEvents: string[],
		webhook: string
	) {
		const uncaughtEvents: Array<{
			event: string;
			payload: object;
			timestamp: number;
		}> = [];

		eventsEmitted.forEach(event => {
			if (
				!expectedEvents.includes(event.event) ||
				event.destination.includes(webhook)
			) {
				return;
			}

			uncaughtEvents.push({
				event: event.event,
				payload: event.payload,
				timestamp: event.timestamp,
			});

			event.destination.push(webhook);
		});

		return uncaughtEvents;
	}

	public static subscribe(event: string, webhook: string) {
		console.log(`${webhook} has subscribed to ${event}`);

		if (!subscribers[event]) {
			subscribers[event] = [];
		}

		const found = subscribers[event].find(value => value === webhook);
		if (found) return false;

		subscribers[event].push(webhook);
		return true;
	}

	public static async emit(event: string, payload: object) {
		if (!subscribers[event] || subscribers[event].length === 0) {
			return false;
		}

		const webhooks: string[] = [];

		await Promise.all(
			subscribers[event].map(async webhook => {
				try {
					await axios.post(webhook, {
						event,
						payload,
					});

					webhooks.push(webhook);
				} catch (err) {
					Logger.getInstance().logger.error(err);
				}
			})
		);

		eventsEmitted.push({
			event,
			payload,
			destination: webhooks,
			timestamp: Math.floor(Date.now() / 1000),
		});

		return true;
	}
}
