const express = require('express');

const {newGame, getGameByID, getGames, updateGame, deleteGame, getGameByTitle, getGameByGenre, getGameByCategory, getUnderFive, getUnderTen, getUnderTwenty } = require('../controllers/juegos.controller'); 

const router = express.Router();
const upload = require("../../middleware/upload.file");

router.post('/register', upload.single("image"), newGame);
router.delete('/:id', deleteGame);
router.put('/:id', upload.single("image"), updateGame);
router.get('/title/:title', getGameByTitle);
router.get('/genre/:genre', getGameByGenre);
router.get('/category/:category', getGameByCategory);
router.get('/priceUnderFive', getUnderFive);
router.get('/priceUnderTen', getUnderTen);
router.get('/priceUnderTwenty', getUnderTwenty);
router.get('/', getGames);
router.get('/:id', getGameByID);


module.exports = router