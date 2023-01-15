import commonRouter from './common.router';
import { emit, subscribe } from './events.router';

export default [commonRouter, emit, subscribe];
