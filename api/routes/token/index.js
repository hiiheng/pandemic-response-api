const TokenModel = require('../../models/token')

const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    TokenModel.find()
    .then(data => res.json(data))
    .catch(error => res.send({ message: "Error", error }))
})

router.get('/:user', (req, res) => {
    TokenModel.find({ user: req.params.user })
    .then(data => res.json(data))
    .catch(error => res.send({ message: "Error", error }))
})

module.exports = router
