import {FORM_VALIDATOR} from "./FormValidatorConstants";

/**
 * This validation use the function of reducer in react-redux.
 * The logic of the validation can be found in the file [ValidationReducer.js].
 * The constant use to construct this file can be found in the [FormValidatorConstant.js].
 * To use this validation, must construct these array that consist of objects that contains the below attribute
 * The most important attribute(key/object) that the object in the array must have is:
 * types, payload, fieldName
 * Any additional attribute that you want to include together must be put under object adds
 * i.e. for the usage of FORM_VALIDATOR.MIN_LENGTH, the attribute of minLength can be added to help
 * to manage the minimum length of the value.
 *
 * @param values:[{types: string[], fieldName: string, payload: string}]
 * @param response
 * @returns {(function(*, *): Promise<void>)|*}
 * @constructor
 */
const FormValidator = (values = [{types: [], payload: "", fieldName: ""}], response) => {
    // const [validateError, setValidateError] = useState({});

    return async (dispatch, reducerState) => {
        const currentState = reducerState().ValidatorReducer;
        const setValidateError = {};
        values.forEach(val => {
            // form validator state updated everytime dispatch is done
            // need to check the state of the reducer after dispatch
            let dispatchObj = {
                type: FORM_VALIDATOR.VALIDATE,
                types: val.types,
                payload: val.payload,
                fieldName: val.fieldName,
            };
            if(val.custom) {
                dispatchObj.custom = val.custom;
            }
            if (val.adds) {
                val.adds.forEach((elem => {
                    for (const key in elem) {
                        dispatchObj[key] = elem[key];
                    }
                }));
            }
            dispatch(dispatchObj);
            const fieldName = val.fieldName;
            // console.log(currentState)
            currentState[fieldName].forEach(validators => {
                const temp = validators.find(validator => validator.isValid === false)
                if (temp && !temp.isEmpty) {
                    setValidateError[fieldName] = temp.errorMessage;
                } else {
                    setValidateError[fieldName]= "";
                }
            });
        });
        response(setValidateError);
    }
}

export default FormValidator;