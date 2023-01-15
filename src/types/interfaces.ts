import { FastifyInstance } from 'fastify';
import { TEnvVariables } from './types';

export interface IApplyToFastify {
	apply(app: FastifyInstance, env: TEnvVariables): Promise<void>;
}
