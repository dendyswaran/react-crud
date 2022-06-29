import {FORM_VALIDATOR} from "./FormValidatorConstants";

const FormValidator = (types, payload, fieldName = "") => {
    // payload: the input value
    // customErrorMessage: string of message
    return (dispatch) => {
        dispatch({
            type: FORM_VALIDATOR.VALIDATE,
            types,
            payload,
            fieldName
        });
    }
}

export default FormValidator;