import {FORM_VALIDATOR, FORM_VALIDATOR_MESSAGE} from "./FormValidatorConstants";

const initialState = {validator: [
    {
        errorMessage: "",
        isValid: true,
    }
]};

const ValidatorReducer = (state = initialState, action) => {
    /**
     * Validate Params should contain all parameter that needed to be checked with the input
     * validateParams can be constructed as an array of object containing :
     * input: the input value
     * validateType(required): i.e: [required, numeric, alphanumeric, email, minLength, date]\
     */
    if(action.type === FORM_VALIDATOR.VALIDATE) {
        const input = action.payload;
        const fieldName = (action.fieldName && action.fieldName.length > 0) ? action.fieldName : "";
        const minLength = action.minLength ? action.minLength : FORM_VALIDATOR.MIN_LENGTH;
        const maxLength = action.maxLength ? action.maxLength : FORM_VALIDATOR.MAX_LENGTH;
        let validator = (action.types && action.types.length > 0) ? Array.from(action.types.map(type => {
            let isValid = true;
            let message = "";
            switch (type) {
                case FORM_VALIDATOR.REQUIRED:
                    if (!input) {
                        message = (fieldName.length > 0)
                            ? `Please fill in the ${fieldName}`
                            : FORM_VALIDATOR_MESSAGE.REQUIRED;
                        isValid = false;
                    }
                    break;
                case FORM_VALIDATOR.MIN:
                    if (!(input.length > minLength)) {
                        isValid = false;
                        message = FORM_VALIDATOR_MESSAGE.MIN;
                    }
                    break;
                case FORM_VALIDATOR.MIN_INCLUDED:
                    if (!(input.length >= minLength)) {
                        isValid = false;
                        message = FORM_VALIDATOR_MESSAGE.MIN_INCLUDED;
                    }
                    break;
                case FORM_VALIDATOR.MAX:
                    if (!(input.length < maxLength)) {
                        isValid = false;
                        message = FORM_VALIDATOR_MESSAGE.MAX;
                    }
                    break;
                case FORM_VALIDATOR.MAX_INCLUDED:
                    if (!(input.length <= maxLength)) {
                        isValid = false;
                        message = FORM_VALIDATOR_MESSAGE.MAX_INCLUDED;
                    }
                    break;
                case FORM_VALIDATOR.NUMERIC:
                    const regexNumeric = /^\d+$/;
                    if (regexNumeric.test(input) === false) {
                        isValid = false;
                        message = FORM_VALIDATOR_MESSAGE.NUMERIC;
                    }
                    break;
                case FORM_VALIDATOR.EMAIL:
                    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if (regexEmail.test(input) === false) {
                        isValid = false;
                        message = FORM_VALIDATOR_MESSAGE.EMAIL;
                    }
                    break;
                case FORM_VALIDATOR.ALPHANUMERICS:
                    const regexAlpha = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*#?&{}\[\],.\\\/<>'":;+=\-_^()`~|])([a-zA-Z0-9@$!%*#?&{}\[\],.\\\/<>'":;+=\-_^()`~|]+)$/
                    if (regexAlpha.test(input) === false) {
                        isValid = false;
                        message = FORM_VALIDATOR_MESSAGE.ALPHANUMERICS;
                    }
                    break;
                case FORM_VALIDATOR.DATE:
                    if (isNaN(Date.parse(input)) === true) {
                        isValid = false;
                        message = FORM_VALIDATOR_MESSAGE.DATE;
                    }
                    break;
                default:
                    isValid = true;
                    message = "";
            }
            return {isValid, messageError: message, fieldName};
        })) : "";

        return  {
            ...state,
            validator
        };
    }
    return state;
}

export default ValidatorReducer;