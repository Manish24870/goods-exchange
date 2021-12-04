const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        lowwercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        select: false,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: true,
        default: "user",
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare input password with database password
userSchema.methods.comparePassword = async function (inputPassword, dbPassword) {
    return await bcrypt.compare(inputPassword, dbPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
