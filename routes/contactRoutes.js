const express= require("express");
const router= express.Router();
const {getContact, getContacts, createContacts, updateContact, deleteContact, } =require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenhandler");

router.use(validateToken);
router.route("/").get(getContacts).post(createContacts);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;


