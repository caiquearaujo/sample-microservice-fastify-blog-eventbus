import { config } from 'dotenv';
import path from 'path';

export const { ENVIRONMENT = 'development' } = process.env;
const DIR = path.resolve(__dirname, '../..');

config({
	path: `${DIR}/.env.${ENVIRONMENT}`,
});

export const {
	NAME = 'blog-moderation-microservice',
	VERSION = '1.0.0',
	PORT = '3000',
	HOST = '0.0.0.0',
} = process.env;
