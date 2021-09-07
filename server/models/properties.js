const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency

const featureSchema = new Schema({
    feat: {
        type: String,
        required: true
    }
})

const stationSchema = new Schema({
    stationName: {
        type: String,
        required: true
    }
})

const pictureSchema = new Schema({
    picture: {
        type: String,
    }
})

const floorplanSchema = new Schema({
    floorImg: {
        type: String,
    }
})

const propertySchema = new Schema({
    propertyName: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    pricePw: {
        type: Number,
    },
    pricePcm: {
        type: Number,
    },
    salePrice: {
        type: Number,
    },
    propertyInfo: {
        type: String,
        required: true
    },
    locationArea: {
        type: String,
        required: true
    },
    lat: { type: Number },
    lng: { type: Number },
    bedNum: {
        type: Number,
        required: true
    },
    bathNum: {
        type: Number,
        required: true
    },
    pet: {
        type: String
    },
    school: {
        type: Number,
        required: true
    },
    crimeRate: {
        type: Number,
        required: true
    },
    train: {
        type: Number,
        required: true
    },
    features: [ featureSchema ],
    stations: [ stationSchema ],
    floorplan: [ floorplanSchema ],
    pictures: [ pictureSchema ],
    deposit: {
        type: String
    },
    councilTax: {
        type: Currency,
        required: true
    },
    localAuthority: {
        type: String,
        required: true
    },
    squares: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Landlord'
    },
    status: {
        type: String
    }
}, {
    timestamps: true
})

var Properties = mongoose.model('Property', propertySchema)

module.exports = Properties