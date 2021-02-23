const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    group_name: { type: String, unique: true },
    threshold: { type: Number, required: true },
    employees: { type: Object, required: true },
});

schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    },
});

module.exports = mongoose.model("Group", schema);
