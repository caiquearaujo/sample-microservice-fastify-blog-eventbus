import commonRouter from './common.router';
import { emit, subscribe, uncaught } from './events.router';

export default [commonRouter, emit, subscribe, uncaught];
