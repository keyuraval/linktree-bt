const mongoose = require('mongoose');
const { model, Schema } = mongoose

const User = new Schema({
    name: { type: String },
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ['Creator', 'Brand', 'Agency', 'admin'], default: 'Creator' },
    handle: { type: String, required: true, unique: true },
    links: [{
        url: { type: String },
        title: { type: String },
        icon: { type: String },
    }],
    socialMedia: {
        facebook: { type: String },
        linkedIn: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        github: { type: String },
        youtube: { type: String },
    },
    donation: {
        paypal: { type: String },
        venmo: { type: String },
    }
}, { collection: 'user-data-linktree' });

const userModel = model('userData', User);

module.exports = userModel;


