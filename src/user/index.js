import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

export default ({ config, db }) => {
	let userApi = Router();

	// mount the facets resource
	userApi.use('/', facets({ config, db }));

	return userApi;
}
