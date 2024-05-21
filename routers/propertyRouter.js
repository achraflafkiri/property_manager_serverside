const express = require("express");
const router = express.Router();
const {
    addNewProperty,
    getAllProperties,
    getPropertyByID,
    updateProperty,
    deleteProperty
} = require('../controllers/PropertyController');

router
    .route("/")
    .get(getAllProperties)
    .post(addNewProperty);

router
    .route("/:id")
    .patch(updateProperty)
    .get(getPropertyByID)
    .delete(deleteProperty);

module.exports = router;
