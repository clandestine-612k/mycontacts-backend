const mongoose =require("mongoose");
const  contactSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"

        },
        name: {
            type: String,
            require: [true, "Please add the contact name"],
        },
        email:
        {
            type: String,
            require: [true, "Please add the contact Email address"],
        },
        phone :
        {
            type: String,
            require: [true, "Please add the contact phone number"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Contact",contactSchema);