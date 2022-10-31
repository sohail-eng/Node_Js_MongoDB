
const { json } = require('express');
const mongoose = require('mongoose');





const Schema = mongoose.Schema;


const tenant_schema = new Schema(
  {
    tenant_name: {
      type: String,
      required: "This Filed Is Required"
    },
    address: {
      type: Object,
      required: "This Filed Is Required"
    },
    city: {
      type: String,
      required: "This Filed Is Required"
    },
    state: {
      type: String,
      required: "This Filed Is Required"
    },
    country: {
      type: String,
      required: "This Filed Is Required"
    },
    zip_code: {
      type: String,
      required: "This Filed Is Required"
    },
    phone: {
      type: String,
      required: "This Filed Is Required"
    },
    web_url: {
      type: String,
      required: "This Filed Is Required"
    }
  },
  {
    timestamps: true,
    versionKey: false,
    tenant_id: true,
    toJSON: {
      transform(doc, ret) {
        ret.tenant_id = ret._id
        delete ret._id
      }
    }
  }
);

const user_schema = new Schema(
  {
    first_name: {
      type: String,
      required: "This Filed Is Required"
    },
    last_name: {
      type: String,
      required: "This Filed Is Required"
    },
    department: {
      type: String,
      required: "This Filed Is Required"
    },
    designation: {
      type: String,
      required: "This Filed Is Required"
    },
    tenant_id: {
      type: Object,
      required: "This Filed Is Required"
    },
    image_url: {
      type: String,
      required: "This Filed Is Required"
    },
    city: {
      type: String,
      required: "This Filed Is Required"
    },
    country: {
      type: String,
      required: "This Filed Is Required"
    },
    bio: {
      type: String,
      required: "This Filed Is Required"
    },
    social_links: {
      type: Object,
      required: "This Filed Is Required"
    },
    employee_id: {
      type: Number,
      required: "This Filed Is Required"
    }
  },
  {
    timestamps: true,
    versionKey: false,
    user_id: true,
    toJSON: {
      transform(doc, ret) {
        ret.user_id = ret._id
        delete ret._id
      }
    }
  }
);

mongoose.model("Tenant_Profile", tenant_schema);
mongoose.model("User_Profile", user_schema);