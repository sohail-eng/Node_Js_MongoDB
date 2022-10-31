const express = require("express")
const router = express.Router()
const uuid = require("uuid")

const mongoose = require("mongoose")
const tenantModel = mongoose.model("Tenant_Profile")
const userModel = mongoose.model("User_Profile")

router.post('/', (req, res) => {
	var _user = new tenantModel()
	_user.tenant_name = req.body.tenant_name
	_user.address = req.body.address
	_user.city = req.body.city
	_user.state = req.body.state
	_user.country = req.body.country
	_user.zip_code = req.body.zip_code
	_user.phone = req.body.phone
	_user.web_url = req.body.web_url

	_user.save((err, doc) => {
		if (!err) {
			res.send("Record Inserted")
		}
		else {
			res.send(err)
		}
	})
})

router.get('/', (req, res) => {
	tenantModel.find((err, doc) => {
		if (!err) {
			res.json(doc)
		}
		else {
			res.sendStatus(400)
		}
	})
})

router.get('/:id', (req, res) => {


	tenantModel.findById(req.params.id, (err, doc) => {
		if (!err) {
			userModel.find({tenant_Id:req.params.id},(err1,doc1)=>{
				if(!err)
				{
					res.json({"Tenant_Profile":doc,"User_Profile":doc1})
				}
				else
				{
					res.json(doc)
				}
			})
		}
		else {
			res.sendStatus(400)
		}
	})
})

router.delete('/:id', (req, res) => {

	userModel.deleteMany({tenant_Id:req.params.id})
	tenantModel.findByIdAndRemove(req.params.id,(err,doc)=>{
		if(!err)
		{
			res.send("deleted");
		}
		else
		{
			res.send(err);
		}
	})
	
})

router.patch('/:id', (req, res) => {
	tenantModel.findOneAndUpdate({
		_id: req.params.id
	},
		req.body,
		{
			new: true
		},
		(err, doc) => {
			if (!err) {
				res.send("Record Updated")
			}
			else {
				res.sendStatus(400)
			}
		}
	)
})


module.exports = router