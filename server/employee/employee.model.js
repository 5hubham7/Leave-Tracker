const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    employee_email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    employee_name: { type: String, required: true },
    employee_phone: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
});

schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    },
});

module.exports = mongoose.model("Employee", schema);
