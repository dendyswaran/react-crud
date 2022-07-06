import { useState } from "react";
import CheckboxMain from "./FormComponents/CheckboxMain";
import InputLabel from "./FormComponents/InputLabel";

const SelectAllCheckbox = ({ items, href }) => {
  //All Site Selection Checkbox
  const [site, setSite] = useState(items);
  const handleSiteSelection = (e) => {
    const { name, checked } = e.target;

    if (name === "allSelect") {
      let tempItem = site.map((props) => {
        return { ...props, isChecked: checked };
      });
      setSite(tempItem);
    } else {
      let tempItem = site.map((props) =>
        props.siteId === name ? { ...props, isChecked: checked } : props
      );
      setSite(tempItem);
    }
  };

  return (
    <div>
      <CheckboxMain
        name="allSelect"
        binary
        className="pb-3"
        onChange={handleSiteSelection}
      />
      <InputLabel>Select All</InputLabel>
    </div>
  );
}

export default SelectAllCheckbox;
/*
        <div>
        <CheckboxMain
        name="allSelect"
        binary
        className="pb-3"
        checked={!!item.some((props) => props?.isChecked !== false)}
        onChange={handleSiteSelection}
      />
      <InputLabel>Select All</InputLabel>
        <div key={index} className="flex in-line">
        <CheckboxMain
            className="mr-2 pt-5"
            name={properties.siteId}
            checked={properties?.isChecked || false}
            onChange={handleSiteSelection}
          />
          </div>

*/
