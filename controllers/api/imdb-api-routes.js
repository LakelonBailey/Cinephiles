const router = require('express').Router();


router.get('/', (req, res) => {
    res.json({
        message: 'message'
    })
})

module.exports = router