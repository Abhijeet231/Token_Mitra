import {ApiError} from "../utils/ApiError.js"

const validate = (schema) => {
    return (req,res,next) => {
        const {error,value} = schema.validate (req.body)

        if(error) {
            throw new ApiError(400, "Validation Error Zod")
        };

        req.body = value;
        next();
    };
};

export default validate;