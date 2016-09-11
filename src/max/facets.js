import resource from 'resource-router-middleware';
import facets from '../models/facets';
import MaxRepsModel from '../models/maxRepsModel'

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'max',

	mergeParams: true,

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	// load(req, id, callback) {
	// 	let facet = facets.find( facet => facet.id===id ),
	// 		err = facet ? null : 'Not found';
	// 	callback(err, facet);
	// },

	/** GET / - List all entities */
	index(req, res) {
		MaxRepsModel.getAll(db, req.params.userHash)
		  .then(response => res.json(response))
			.catch(error => res.json(error))
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		MaxRepsModel.insert(db, body)
		.then(response => res.json(response))
		.catch(error => res.json(error))
	},

	/** GET /:id - Return a given entity */
	read({ facet }, res) {
		res.json(facet);
	},

	/** PUT /:id - Update a given entity */
	update({ facet, body }, res) {
		MaxRepsModel.update(db, body)
		.then(response => res.sendStatus(204))
		.catch(error => res.json(error))
	},

	/** DELETE /:id - Delete a given entity */
	delete({ facet }, res) {
		facets.splice(facets.indexOf(facet), 1);
		res.sendStatus(204);
	}
});
