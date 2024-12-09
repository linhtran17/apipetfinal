const express = require("express")
const router = express.Router();
let PETS = require("../products.json")


router.get('/pets', (req, res) => {

    if (req.query?.cat) {
        res.json(PETS.filter(({ cat }) => `${cat}`.split(",").includes(req.query?.cat) > 0))
    } else {
        res.json(PETS)
    }
})

router.get('/our-pet', (req, res) => {
    res.json(PETS.filter(({ sale }) => !sale || sale === 0).slice(0, 2) )

})

router.get('/hots', (req, res) => {
    res.json(PETS.filter(({ sale }) => sale && sale > 0).slice(0, 0) )

})



router.get('/pet/:id', (req, res) => {
    let item;
    for (const t of PETS) {
        if (`${t.id}` === `${req.params.id}`) {
            item = t;
            break
        }
    }
    res.json(item)
})

router.post("/pet", (req, res) => {
    let id = 0;
    for (let index = 0; index < PETS.length; index++) {
        if (id < PETS[index].id) {
            id = PETS[index].id;
        }
    }
    PETS.push({ ...req.body, id: id + 1 })
    res.json({ status: true })
})
//cap nhat danh sach 
router.put("/pet/:id", (req, res) => {
    const id = req.params.id
    for (let index = 0; index < PETS.length; index++) {
        if (`${PETS[index].id}` === `${id}`) {
            const data = { ...req.body, id: parseInt(id) }
            PETS[index] = data
        }
    }
    res.json({ status: true })
})

router.delete("/pet/:id", (req, res) => {
    let status = true;
    PETS = PETS.filter(({ id }) => id !== parseInt(req.params.id))
    res.json({ status })
})

module.exports = router