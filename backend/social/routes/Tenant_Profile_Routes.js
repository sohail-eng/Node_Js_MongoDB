const router = require("express").Router();

const Tenant_Profile_Controller = require('../controller/Tenant_Profile_Controller')

router.post('/', async (req, res) => {
    var data = await Tenant_Profile_Controller.insert(req.body)
    res.send(data)
})

router.get('/', async (req, res) => {
    var data = await Tenant_Profile_Controller.list()
    res.send(data)
})

router.get('/:id', async (req, res) => {
    var data = await Tenant_Profile_Controller.get(req.params.id)
    res.send(data)

})

router.delete('/:id', async (req, res) => {
    var data = await Tenant_Profile_Controller.del(req.params.id);
    res.send(data)
})

router.patch('/:id', async (req, res) => {

    var data = await Tenant_Profile_Controller.update(req.params.id, req.body);
    res.send(data)
})


module.exports = router;