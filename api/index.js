
const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.send('Successfully hit the api')
})

router.use('/token', require('./routes/token'))

module.exports = router
