const express=require("express")
const controller=express.Router()


controller.use('/tenant_profile',require('./Tenant_Profile'))
controller.use('/user_profile',require("./User_Profile"))

module.exports = controller