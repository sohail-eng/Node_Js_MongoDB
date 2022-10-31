const express = require("express")
const router = express.Router()
const uuid = require("uuid");

const mongoose = require("mongoose")
const userModel = mongoose.model("User_Profile")
const tenantModel = mongoose.model("Tenant_Profile")

router.post('/', (req, res) => {

	tenantModel.findById(req.body.tenant_id, (err1, doc1) => {
		if (!err1) {
			var _user = new userModel()
			_user.first_name = req.body.first_name
			_user.last_name = req.body.last_name
			_user.department = req.body.department
			_user.designation = req.body.designation
			_user.tenant_id = req.body.tenant_id
			_user.image_url = req.body.image_url
			_user.city = req.body.city
			_user.country = req.body.country
			_user.bio = req.body.bio
			_user.social_links = req.body.social_links
			_user.employee_id = req.body.employee_id

			_user.save((err, doc) => {
				if (!err) {
					res.send("Record Inserted")
				}
				else {
					res.send(err)
				}
			})
		}
		else {
			res.send(err1)
		}
	})
})

router.get('/', (req, res) => {
	userModel.find((err, doc) => {
		if (!err) {
			res.json(doc)
		}
		else {
			res.sendStatus(400)
		}
	})
})

router.get('/:id', (req, res) => {
	userModel.findById(req.params.id, (err, doc) => {
		if (!err) {

			tenantModel.findById(doc.tenant_id,(err1,doc1)=>
			{
				if(!err1)
				{
					doc['tenant_id']=doc1;
					res.json(doc)
				}
				else
				{
					res.json(doc);
				}
			})

		}
		else {
			res.sendStatus(400)
		}
	})
})

router.delete('/:id', (req, res) => {
	userModel.findByIdAndRemove(req.params.id, (err, doc) => {
		if (!err) {
			res.send("User Deleted !")
		}
		else {
			res.sendStatus(400)
		}
	})
})

router.patch('/:id', (req, res) => {


	tenantModel.findById(req.body.tenant_id, (err1, doc1) => {
		if (!err1) {
			userModel.findOneAndUpdate({
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
		}
		else {
			res.send(err1)
		}
	})
})

module.exports = router