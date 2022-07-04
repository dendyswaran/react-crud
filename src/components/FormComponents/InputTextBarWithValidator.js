import InputTextBar from "./InputTextBar";
import {classNames} from "primereact/utils";

/**
 * this component read the attribute of validator in the tag,
 * if the validator have a string value the input bar will be highlighted
 * with red border.
 * @param attr
 * @returns {JSX.Element}
 * @constructor
 */
const InputTextBarWithValidator = ({...attr}) => {
    const className = attr.className ?? "";
    const newAttr = Object.keys(attr)
        .filter((key) => key !== "className")
        .reduce((obj, key) =>{
          return Object.assign(obj, {
            [key]:attr[key]
          })
        }, {})
    return (
        <>
          <InputTextBar className={classNames(className, attr.validator ? "p-invalid" : "")} {...newAttr} />
          {(attr.validator && attr.validator !== "") &&
              <p className="mt-2 text-pink-600 text-sm">
                {attr.validator}
              </p>
          }
        </>
    );
  };

export default InputTextBarWithValidator;