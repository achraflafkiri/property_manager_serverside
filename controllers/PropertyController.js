const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Property = require("../models/Property");

const getAllProperties = catchAsync(async (req, res, next) => {
    const properties = await Property.find();
    res.status(200).json({
        status: 'success',
        properties
    });
});

const getPropertyByID = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const property = await Property.findById(id);

    res.status(200).json({
        status: 'success',
        property
    });
});

const addNewProperty = catchAsync(async (req, res, next) => {
    try {
        const { address, rentalCost, propertyName, tag, contractStartDate, contractEndDate, directCost, group, city, fixedCost } = req.body;

        const property = await Property.create({ address, rentalCost, propertyName, tag, contractStartDate, contractEndDate, directCost, group, city, fixedCost });

        res.status(201).json({
            status: 'success',
            message: "Property created successfully!",
            property
        });
    } catch (error) {
        console.error(error);
    }
});

const updateProperty = catchAsync(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { group } = req.body;

        const property = await Property.findByIdAndUpdate(id, { group }, { new: true, runValidators: true });

        if (!property) {
            return next(new AppError(404, "Property not found"));
        }

        res.status(200).json({
            status: 'success',
            message: "Property group updated successfully!",
            property
        });
    } catch (error) {
        console.error("Error updating property:", error);
        return next(error);
    }
});


const deleteProperty = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const property = await Property.findByIdAndDelete(id);

    if (!property) {
        return next(new AppError(404, "Property not found"));
    }

    res.status(204).json({
        status: 'success',
        message: "Property deleted successfully!",
        data: null
    });
});

module.exports = {
    addNewProperty,
    getAllProperties,
    getPropertyByID,
    updateProperty,
    deleteProperty
};
