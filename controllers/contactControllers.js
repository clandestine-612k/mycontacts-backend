
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactmodel");
// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async(req,res) => {
    const contacts = await Contact.find({user: req.user.id});
    res.status(200).json(contacts);
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// @desc Create new contacts
// @route POST /api/contacts
// @access private
const createContacts = asyncHandler(async (req,res) => {
    console.log("The resquest body is:", req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone)
        {
            res.status(400);
            throw new Error('Please add all fields');
        } 
    const contact = await Contact.create(
        {
            name,
            email,
            phone,
            user:req.user.id
        }
    ); 
    res.status(201).json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user.toString()!=req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permission to contact other user's contacts");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(updatedContact);
});

// @desc Delete contacts
// @route DELETE /api/contacts/:id
// @access private
const deleteContact =  asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user.toString()!=req.user.id)
        {
            res.status(403);
            throw new Error("User don't have permission to contact other user's contacts");
        }
    //await contact.remove();
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

module.exports ={getContacts , getContact, createContacts, updateContact, deleteContact};