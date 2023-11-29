
const express = require('express');
const router = express.Router();
const {getPlan,createPlan,deletePlan} = require('../Controller/planController')


// Define the route to fetch data
router.get('/getPlan/:userId', getPlan);

router.post('/createPlan',createPlan);

router.delete('/deletePlan/:id',deletePlan);

module.exports = router;
