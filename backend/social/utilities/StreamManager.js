require('../database/DatabaseConfig');
const mongoose = require("mongoose")
const tenantModel = mongoose.model("Tenant_Profile")
const userModel = mongoose.model("User_Profile")

const processMessage = async (kafkaMessage) => {

	//Start working here
	console.log("\n\n\n\n\n\n\n\n\n\n\n");
	console.log(kafkaMessage);

	if (kafkaMessage.event_name == "tenant_created") {
		try {
			await tenantModel.insertMany(kafkaMessage.properties);
			console.log("Record Inserted");
		}
		catch (err) {
			console.log(err);
		}
	}
	else {
		try {
            const data = await tenantModel.findById(kafkaMessage.properties.tenant_id);

            await userModel.insertMany(kafkaMessage.properties);
            return {
                result: {
                    status: 400,
                    data: "Record Inserted"
                }
            }
        }
        catch (err) {
            return { error: err }
        }
	}

};

module.exports = { processMessage };

