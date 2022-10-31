const mongoose = require("mongoose")
const tenantModel = mongoose.model("Tenant_Profile")
const userModel = mongoose.model("User_Profile")

module.exports = {
    list: async ({ expand } = {}) => {
        try {
            const data = await tenantModel.find();

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
            const tenant_data = await tenantModel.findById(id);
            const user_data = await userModel.find({ tenant_id: id })
            return {
                result: {
                    status: 400,
                    data: {
                        "Tenant_Profile": tenant_data,
                        "User_Profile": user_data
                    }
                }
            }
        }
        catch (err) {
            return { error: err }
        }
    },
    del: async (id, { expand } = {}) => {

        try {
            await userModel.deleteMany({ tenant_id: id })
            const data = await tenantModel.findByIdAndRemove(id);
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
            await tenantModel.insertMany(body);
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
            const data = await tenantModel.findOneAndUpdate({
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