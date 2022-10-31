const router = require("express").Router();

router.use('/tenant_profile', require('./Tenant_Profile_Routes'))
router.use('/user_profile', require('./User_Profile_Routes'))

module.exports = router;