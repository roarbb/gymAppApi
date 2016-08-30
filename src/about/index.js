import { version } from '../../package.json';
import { Router } from 'express';

export default () => {
	let api = Router();

	// mount the facets resource
	api.get('/', (req, res) => res.json({
		name: "Crossfit RJ Gym API",
		author: "Matej Sajgal",
		author_web: "www.sajgal.com",
		version: version
	})
	);

	return api;
}
