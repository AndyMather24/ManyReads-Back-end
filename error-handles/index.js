exports.handle404 = (err, req, res, next) => {
	const { status, msg } = err;
	if (status === 404) res.status(status).send({ msg });
	else next({ status, msg });
};
exports.handle400 = (err, req, res, next) => {
	const { status, msg } = err;
	if (err.name === 'ValidationError' || err.name === 'CastError') res.status(400).send({ msg: 'Bad Request' });
	else if (status === 400) res.status(status).send({ msg });
	else next(err);
};

exports.handle500 = (err, req, res, next) => {
	const { status, msg } = err;
	res.status(500).send({ msg: 'internal server error' });
};
