const HomeController = {
    index: async (req, res) => {
        return res.send('Welcome to Grebban!');
    }
};

module.exports = HomeController;