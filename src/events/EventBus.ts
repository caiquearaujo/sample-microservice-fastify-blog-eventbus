import axios from 'axios';
import Logger from '@/utils/Logger';

const subscribers: Record<string, string[]> = {};

export default class EventBus {
	public static subscribers() {
		return subscribers;
	}

	public static subscribe(event: string, webhook: string) {
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

		await Promise.all(
			subscribers[event].map(async webhook => {
				try {
					await axios.post(webhook, {
						event,
						payload,
					});
				} catch (err) {
					Logger.getInstance().logger.error(err);
				}
			})
		);

		return true;
	}
}
