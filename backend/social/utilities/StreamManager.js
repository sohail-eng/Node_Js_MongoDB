require('../database/DatabaseConfig');
const mongoose = require("mongoose")
const tenantModel = mongoose.model("Tenant_Profile")
const userModel = mongoose.model("User_Profile")

const processMessage = async (kafkaMessage) => {

	//Start working here
	console.log("\n\n\n\n\n\n\n\n\n\n\n");
	console.log(kafkaMessage);

	if (kafkaMessage.event_name == "tenant_created") {
		var _user = new tenantModel()
		_user.tenant_name = kafkaMessage.properties.tenant_name
		_user.address = kafkaMessage.properties.address
		_user.city = kafkaMessage.properties.city
		_user.state = kafkaMessage.properties.state
		_user.country = kafkaMessage.properties.country
		_user.zip_code = kafkaMessage.properties.zip_code
		_user.phone = kafkaMessage.properties.phone
		_user.web_url = kafkaMessage.properties.web_url

		_user.save((err, doc) => {
			if (!err) {
				console.log("Tenant Record Inserted")
			}
			else {
				console.log(err)
			}
		})
	}
	else {
		tenantModel.findById(kafkaMessage.properties.tenant_id, (err1, doc1) => {
			if (!err1) {
				var _user = new userModel()
				_user.first_name = kafkaMessage.properties.first_name
				_user.last_name = kafkaMessage.properties.last_name
				_user.department = kafkaMessage.properties.department
				_user.designation = kafkaMessage.properties.designation
				_user.tenant_id = kafkaMessage.properties.tenant_id
				_user.image_url = kafkaMessage.properties.image_url
				_user.city = kafkaMessage.properties.city
				_user.country = kafkaMessage.properties.country
				_user.bio = kafkaMessage.properties.bio
				_user.social_links = kafkaMessage.properties.social_links
				_user.employee_id = kafkaMessage.properties.employee_id
	
				_user.save((err, doc) => {
					if (!err) {
						console.log("User Record Inserted")
					}
					else {
						console.log(err)
					}
				})
			}
			else {
				console.log(err1)
			}
		})
	}

};

module.exports = { processMessage };

