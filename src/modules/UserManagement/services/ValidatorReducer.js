import {FORM_VALIDATOR, FORM_VALIDATOR_MESSAGE} from "./FormValidatorConstants";

const initialState = {validator: [
        {
            isValid: true,
            messageError: undefined,
            fieldName: undefined
        }
    ]};

const ValidatorReducer = (state = initialState, action) => {
    /**
     * Validate Params should contain all parameter that needed to be checked with the input
     * validateParams can be constructed as an array of object containing :
     * input: the input value
     * validateType(required): i.e: [required, numeric, alphanumeric, email, minLength, date]
     * TODO: Make a custom validator
     */
    if(action.type === FORM_VALIDATOR.VALIDATE) {
        const input = action.payload;
        const fieldName = (action.fieldName && action.fieldName.length > 0) ? action.fieldName : "";
        const minLength = action.minLength ? action.minLength : FORM_VALIDATOR.MIN_LENGTH;
        const maxLength = action.maxLength ? action.maxLength : FORM_VALIDATOR.MAX_LENGTH;
        if(action.types && action.types.length > 0) {
            let arr = action.types.map(type => {
                let isValid = true;
                let message = "";
                switch (type) {
                    case FORM_VALIDATOR.REQUIRED:
                        if (!input || input.length <= 0) {
                            message = (fieldName.length > 0)
                              ? `Please fill in the ${fieldName}`
                              : FORM_VALIDATOR_MESSAGE.REQUIRED;
                            isValid = false;
                        }
                        break;
                    case FORM_VALIDATOR.MIN_LENGTH:
                        if ((input) && !(input.length > minLength)) {
                            isValid = false;
                            message = FORM_VALIDATOR_MESSAGE.MIN + minLength;
                        }
                        break;
                    case FORM_VALIDATOR.MIN_INCLUDED:
                        if ((input) && !(input.length >= minLength)) {
                            isValid = false;
                            message = FORM_VALIDATOR_MESSAGE.MIN_INCLUDED;
                        }
                        break;
                    case FORM_VALIDATOR.MAX_LENGTH:
                        if ((input) && !(input.length < maxLength)) {
                            isValid = false;
                            message = FORM_VALIDATOR_MESSAGE.MAX;
                        }
                        break;
                    case FORM_VALIDATOR.MAX_INCLUDED:
                        if ((input) && !(input.length <= maxLength)) {
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
                        const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                        if (regexEmail.test(input) === false) {
                            isValid = false;
                            message = FORM_VALIDATOR_MESSAGE.EMAIL;
                        }
                        break;
                    case FORM_VALIDATOR.ALPHANUMERICS:
                        const regexAlpha = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*#?&{}[\],.\\/<>'":;+=\-_^()`~|])([a-zA-Z0-9@$!%*#?&{}[\],.\\/<>'":;+=\-_^()`~|]+)$/
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
                    case FORM_VALIDATOR.CUSTOM:
                        /**
                         * idea: return either true or false that indicate the isValid
                         */
                        if(typeof (action.custom()) === "boolean") {
                            isValid = action.custom();
                        }else {
                            throw new Error("function custom must return boolean");
                        }
                        break;
                    default:
                        isValid = true;
                        message = "";
                }
                return {
                    isValid, errorMessage: action.customMessage ?? message, fieldName
                };
            })
            const newState = {
                ...state,
                [arr[0].fieldName]: [arr] // arr.map(({isValid, messageError}) => ({isValid, messageError}))
            }

            return Object.assign(state, newState);
        }
    }
    return state;

}

export default ValidatorReducer;