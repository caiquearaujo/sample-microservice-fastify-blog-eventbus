import 'module-alias/register';

import routes from '@/routes';
import plugins from '@/server/plugins';
import FastifyApplierGroup from '@/server/FastifyApplierGroup';
import ApiServer from './server/ApiServer';

const options = {
	routes: new FastifyApplierGroup(...routes),
	plugins: new FastifyApplierGroup(...plugins),
};

new ApiServer(options)
	.bootstrap()
	.then(server => {
		server
			.start()
			.then(() => console.log(`⚡️ Server is ready and running.`))
			.catch(err => {
				console.error('❌ Server has failed while starting');
				console.error(err);
				process.exit(1);
			});
	})
	.catch(err => {
		console.error('❌ Server has failed while starting');
		console.error(err);
		process.exit(1);
	});
