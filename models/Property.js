const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    rentalCost: {
        type: Map,
        of: String,
    },
    propertyName: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
    },
    contractStartDate: {
        type: Date,
        required: true,
    },
    contractEndDate: {
        type: Date,
        required: true,
    },
    directCost: {
        type: Map,
        of: String,
    },
    group: {
        type: String,
        enum: ['Exited', 'Cleanings Pending', 'Full Property List'],
        default: 'Full Property List',
    },
    city: {
        type: String,
        required: true,
    },
    fixedCost: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;
