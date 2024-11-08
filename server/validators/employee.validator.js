const Joi = require('joi');

const employeeJoiSchema = Joi.object({
    fname: Joi.string().required(),
    lname: Joi.string(),
    email: Joi.string().email().required(),
    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            "string.pattern.base": "Mobile number must be a 10-digit number."
        }),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    course: Joi.array().items(Joi.string().required()).required(),
    profilePic: Joi.string().uri().optional(),
    designation: Joi.string().required()
});

module.exports = employeeJoiSchema;
