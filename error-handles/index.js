exports.handle404 = ({ status, msg }, req, res, next) => {
	if (status === 404) res.status(status).send({ msg });
	else next({ status, msg });
};
exports.handle400 = ({ status, msg }, req, res, next) => {
	if (status === 400 && err.name === 'CastError') res.status(status).send({ msg: `${param} is not a valid id` });
	if (status === 400) res.status(status).send({ msg });
	else next({ status, msg });
};

exports.handle500 = ({ status, msg }, req, res, next) => {
	res.status(500).send({ msg: 'internal server error' });
};
