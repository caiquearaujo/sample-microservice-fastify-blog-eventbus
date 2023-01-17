import { IApplyToFastify } from '@/types/interfaces';
import { TEnvVariables, TFnApplyToFastify } from '@/types/types';
import { FastifyInstance } from 'fastify';

export default class FastifyApplierGroup implements IApplyToFastify {
	protected callables: Array<TFnApplyToFastify> = [];

	constructor(...args: Array<TFnApplyToFastify>) {
		this.callables = args;
	}

	async apply(app: FastifyInstance, env: TEnvVariables): Promise<void> {
		await Promise.all(
			this.callables.map(async callable => {
				await callable(app, env);
			})
		);
	}
}
