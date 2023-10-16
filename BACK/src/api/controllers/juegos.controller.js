const Juegos = require('../models/juegos.model');

//Post
const newGame = async (req, res) => {
    try {
        const body = req.body
        const game = new Juegos(body);
        if (req.file.path) {
            game.image = req.file.path;
        }
        const createdGame = await game.save();
        return res.status(201).json(createdGame);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Get
const getGames = async (req, res) => {
    try {
        const allGames = await Juegos.find();
        return res.status(200).json(allGames)
    } catch (error) {
        return res.json(error)
}
}

//Put
const updateGame = async (req, res) => {
    try {
        const { id } = req.params;
        const gameBody = {...req.body};
        gameBody._id = id;

        if (req.file && req.file.path) {
            gameBody.image = req.file.path;
        } 

        const updateGame = await Juegos.findByIdAndUpdate(id, gameBody, { new: true });
           
    if (!updateGame) {
        return res.status(404).json({ message: "Game does not exist" })
    }
    return res.status(200).json(updateGame)
} catch (error) {
    console.error(error); // Log the error for debugging.
    return res.status(500).json({ message: "Internal Server Error" });
}
}

//Delete
const deleteGame = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteGame = await Juegos.findByIdAndDelete(id);
        if (!deleteGame) {
            return res.status(404).json({ message: "Game does not exist" })
        }
        return res.status(200).json(deleteGame)

    } catch (error) {

    }
}

//Get by title
const getGameByTitle = async (req, res) => {
    try {
        const { title } = req.params
        const titleGames = await Juegos.find({ title: title });
        return res.status(200).json(titleGames);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Get by ID
const getGameByID = async (req, res) => {
    try {
        const { id } = req.params
        const idGames = await Juegos.findById(id);
        return res.status(200).json(idGames);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Get by Genre
const getGameByGenre = async (req, res) => {
    try {
        const { genre } = req.params
        const genreGames = await Juegos.find({ genre: { $regex: new RegExp(genre, 'i') } });
        return res.status(200).json(genreGames);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//Get by Category
const getGameByCategory = async (req, res) => {
    try {
        const { category } = req.params
        const categoryGames = await Juegos.find({ category: category });
        return res.status(200).json(categoryGames);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//Get by Price
const getUnderFive = async (req, res) => {
    try {
        const allGames = await Juegos.find();
        const priceUnderFive = [];

        for (const game of allGames) {
            if (game.price < 5)
            priceUnderFive.push(game);
        }
        return res.status(200).json(priceUnderFive);

    } catch (error) {

        return res.status(500).json(error);
    }
}

const getUnderTen = async (req, res) => {
    try {
        const allGames = await Juegos.find();
        const priceUnderTen = [];

        for (const game of allGames) {
            if (game.price < 10)
            priceUnderTen.push(game);
        }
        return res.status(200).json(priceUnderTen);

    } catch (error) {

        return res.status(500).json(error);
    }
}

const getUnderTwenty = async (req, res) => {
    try {
        const allGames = await Juegos.find();
        const priceUnderTwenty = [];

        for (const game of allGames) {
            if (game.price < 20)
            priceUnderTwenty.push(game);
        }
        return res.status(200).json(priceUnderTwenty);

    } catch (error) {

        return res.status(500).json(error);
    }
}


module.exports = { newGame, getGames, getGameByID, updateGame, deleteGame, getGameByTitle, getGameByGenre, getGameByCategory, getUnderFive, getUnderTen, getUnderTwenty };
