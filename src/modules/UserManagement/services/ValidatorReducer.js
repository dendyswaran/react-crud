import {FORM_VALIDATOR, FORM_VALIDATOR_MESSAGE} from "./FormValidatorConstants";

const ValidatorReducer = (state = {
    fieldName: "",
    input: "",
    errorMessage: [],
    isValidate: [],
    min: FORM_VALIDATOR.MIN,
    max: FORM_VALIDATOR.MAX_LENGTH
}, action = {validators: [{
        type: "",
        customMessage: ""
    }]}) => {
    /**
     * Validate Params should contain all parameter that needed to be checked with the input
     * validateParams can be constructed as an array of object containing :
     * input: the input value
     * validateType(required): i.e: [required, numeric, alphanumeric, email, minLength, date]\
     */
    const input = state.input;

    const isValidateArr = Array.from(action.validators.map(validator => {
        let message = "";
        let isValid = true;
        switch (validator.type) {
            case FORM_VALIDATOR.REQUIRED:
                if (!input) {
                    message = (state.fieldName.length > 0)
                        ? `Please fill in the ${state.fieldName}`
                        :FORM_VALIDATOR_MESSAGE.REQUIRED;
                    isValid = false;
                }
                break;
            case FORM_VALIDATOR.MIN:
                if(!(input.length > state.min)) {
                    isValid = false;
                    message= FORM_VALIDATOR_MESSAGE.MIN;
                }
                break;
            case FORM_VALIDATOR.MIN_INCLUDED:
                if(!(input.length >= state.min)) {
                    isValid = false;
                    message= FORM_VALIDATOR_MESSAGE.MIN_INCLUDED;
                }
                break;
            case FORM_VALIDATOR.MAX:
                if(!(input.length < state.max)) {
                    isValid = false;
                    message= FORM_VALIDATOR_MESSAGE.MAX;
                }
                break;
            case FORM_VALIDATOR.MAX_INCLUDED:
                if(!(input.length <= state.max)) {
                    isValid = false;
                    message= FORM_VALIDATOR_MESSAGE.MAX_INCLUDED;
                }
                break;
            case FORM_VALIDATOR.NUMERIC:
                const regexNumeric = /^\d+$/;
                if(regexNumeric.test(input) === false) {
                    isValid = false;
                    message= FORM_VALIDATOR_MESSAGE.NUMERIC;
                }
                break;
            case FORM_VALIDATOR.EMAIL:
                const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if(regexEmail.test(input) === false) {
                    isValid = false;
                    message= FORM_VALIDATOR_MESSAGE.EMAIL;
                }
                break;
            case FORM_VALIDATOR.ALPHANUMERICS:
                const regexAlpha = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*#?&{}\[\],.\\\/<>'":;+=\-_^()`~|])([a-zA-Z0-9@$!%*#?&{}\[\],.\\\/<>'":;+=\-_^()`~|]+)$/
                if(regexAlpha.test(input) === false) {
                    isValid = false;
                    message= FORM_VALIDATOR_MESSAGE.ALPHANUMERICS;
                }
                break;
            case FORM_VALIDATOR.DATE:
                if(isNaN(Date.parse(input)) === true) {
                    isValid = false;
                    message= FORM_VALIDATOR_MESSAGE.DATE;
                }
                break;
            default:
                isValid =  true;
        }
        return {isValid, message: validator.customMessage ?? message};
    }));

    return {
        ...state,
        isValidate: isValidateArr
    }
}

export default ValidatorReducer;