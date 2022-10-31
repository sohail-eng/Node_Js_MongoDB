const mongoose = require("mongoose")
const tenantModel = mongoose.model("Tenant_Profile")
const userModel = mongoose.model("User_Profile")

module.exports = {
    list: async ({ expand } = {}) => {
        try {
            const data = await userModel.find();

            return {
                result: {
                    status: 400,
                    data: data
                }
            }
        }
        catch (err) {
            return { error: err }
        }
    },
    get: async (id, { expand } = {}) => {
        try {
            const user_data = await userModel.findById(id);
            if (user_data != null) {
                const tenant_data = await tenantModel.findById(user_data.tenant_id)
                return {

                    result: {
                        status: 400,
                        data: {
                            "User_Profile": user_data,
                            "Tenant_Profile": tenant_data
                        }
                    }
                }
            }
            else {
                return {
                    result: "Record Not Found"
                }
            }
        }
        catch (err) {
            return { error: err }
        }
    },
    del: async (id, { expand } = {}) => {

        try {
            const data = await userModel.findByIdAndRemove(id);
            if (data) {
                return {
                    result: {
                        status: 400,
                        data: "Data Deleted"
                    }
                }
            }
            else {
                return {
                    result: {
                        status: 400,
                        data: "Not Found"
                    }
                }
            }
        }
        catch (err) {
            return { error: err }
        }

    },

    insert: async (body, { expand } = {}) => {
        try {
            const data = await tenantModel.findById(body.tenant_id);

            await userModel.insertMany(body);
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
    },
    update: async (id, body, { expand } = {}) => {
        try {
            const data1 = await tenantModel.findById(body.tenant_id);

            const data = await userModel.findOneAndUpdate({
                _id: id
            },
                body,
                {
                    new: true
                }
            );
            if (data) {
                return {
                    result: {
                        status: 400,
                        data: "Record Updated"
                    }
                }
            }
            else {
                return {
                    result: {
                        status: 400,
                        data: "Not Found"
                    }
                }
            }

        }
        catch (err) {
            return { error: err }
        }
    }

}