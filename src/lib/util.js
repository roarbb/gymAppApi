
/**	Creates a callback that proxies node callback style arguments to an Express Response object.
 *	@param {express.Response} res	Express HTTP Response
 *	@param {number} [status=200]	Status code to send on success
 *
 *	@example
 *		list(req, res) {
 *			collection.find({}, toRes(res));
 *		}
 */
export function toRes(res, status=200) {
	return (err, thing) => {
		if (err) return res.status(500).send(err);

		if (thing && typeof thing.toObject==='function') {
			thing = thing.toObject();
		}
		res.status(status).json(thing);
	};
}

export function decrypt(string) {
	const CryptoJS = require("crypto-js")
	const date = new Date
	const msg = `${date.getDay()}${date.getDay()}${date.getHours()}${date.getFullYear()}`
  const bytes  = CryptoJS.AES.decrypt(string.toString(), msg.toString())

  return bytes.toString(CryptoJS.enc.Utf8)
}

export function generateRandomHash() {
	const CryptoJS = require("crypto-js")

	const current_date = (new Date()).valueOf().toString()
	const random = Math.random().toString()

	return CryptoJS.SHA1(current_date + random).toString(CryptoJS.enc.Hex)
}
