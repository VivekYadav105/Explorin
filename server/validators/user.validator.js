const Joi = require('joi');

const passwordComplexity = (value, helpers) => {
    if (value.length < 6) {
        return helpers.message("Password must be at least six characters long.");
    }
    if (!/[A-Z]/.test(value)) {
        return helpers.message("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(value)) {
        return helpers.message("Password must contain at least one lowercase letter.");
    }
    if (!/[0-9]/.test(value)) {
        return helpers.message("Password must contain at least one digit.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return helpers.message("Password must contain at least one special character.");
    }
    return value;
};

const userJoiSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).custom(passwordComplexity).required(),
    profilePic: Joi.string().uri().optional(),
    role: Joi.string().valid('manager').default('manager').required(),
    token: Joi.string().optional()
});

module.exports = userJoiSchema;
