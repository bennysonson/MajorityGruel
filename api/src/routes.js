const express = require('express');
const router = express.Router();

const apiRouter = require('./APIRoutes');

//router.use(frontendRouter);
router.use(apiRouter);

module.exports = router;