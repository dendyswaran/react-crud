import DropdownBar from "./DropdownBar";
import {classNames} from "primereact/utils";

const DropdownBarWithValidator = ({...attr}) => {
    const className = attr.className ?? "";
    const newAttr = Object.keys(attr)
        .filter((key) => key !== "className")
        .reduce((obj, key) =>{
            return Object.assign(obj, {
                [key]:attr[key]
            })
        }, {})
    return(
        <>
            <DropdownBar
                className={classNames(className, attr.validator ? "p-invalid" : "")}
                {...newAttr}
            />
            {attr.validator &&
                <p className="mt-2 text-pink-600 text-sm">
                    {attr.validator}
                </p>
            }
        </>
    );
}

export default DropdownBarWithValidator;