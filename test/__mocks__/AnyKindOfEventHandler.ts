import { IEventHandler } from '@/types/classes';

export default class AnyKinfOfEventHandler
	implements IEventHandler<object>
{
	compatible = jest.fn();
	incompatible = jest.fn();
	event = jest.fn(() => 'any.kindofevent');
	handle = jest.fn((event: string, payload: object) => {
		if (event === this.event()) {
			this.compatible();
			return Promise.resolve(true);
		} else {
			this.incompatible();
			return Promise.resolve(false);
		}
	});
}
