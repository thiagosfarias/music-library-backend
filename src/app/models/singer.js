const { SingerDao } = require('../infra/singer-dao');

const api = {}

api.register = async (req, res) => {
    const singer = req.body;
    const singerId = await new SingerDao(req.db).add(singer);
    res.status(204).end();
};

module.exports = api;