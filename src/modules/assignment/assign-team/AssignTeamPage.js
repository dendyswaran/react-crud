import { useState } from "react";
import SiteIdSearchBar from "../../../components/SiteIdSearchBar";
import Layout from "../../../components/Layout";
import TeamAssignmentCardView from "../../../components/CardView/TeamAssignmentCardView";
import PostCodeSearchBar from "../../../components/PostCodeSearchBar";
import { Dropdown } from "primereact/dropdown";
import InputLabel from "../../../components/FormComponents/InputLabel";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import CheckboxMain from "../../../components/FormComponents/CheckboxMain";

export default function AssignTeamPage() {
  //Site ID Search Query Logic
  const { searchSite } = window.location;
  const siteQuery = new URLSearchParams(searchSite).get("s");
  const [searchSiteQuery, setSearchSiteQuery] = useState(siteQuery || "");

  //Post Code Search Query Logic
  const { searchPostCode } = window.location;
  const postCodeQuery = new URLSearchParams(searchPostCode).get("pcs");
  const [searchPostCodeQuery, setSearchPostCodeQuery] = useState(
    postCodeQuery || ""
  );

  const items = [
    {
      id: 1,
      siteId: "C008009",
      siteName: "PT Cellsite",
      equipment: 20,
      assignedDate: "6-Jun-22",
      postCode: 60000,
    },
    {
      id: 2,
      siteId: "C008010",
      siteName: "PT Cellsite",
      equipment: 30,
      assignedDate: "10-Jun-22",
      postCode: 52100,
    },
    {
      id: 3,
      siteId: "C008011",
      siteName: "CT Cellsite",
      equipment: 30,
      assignedDate: "15-Jul-22",
      postCode: 63100,
    },
    {
      id: 4,
      siteId: "C008012",
      siteName: "CT Cellsite",
      equipment: 40,
      assignedDate: "12-Jul-22",
      postCode: 44400,
    },
  ];

  const teamItems = [
    { name: "Team 1", value: "1" },
    { name: "Team 2", value: "2" },
    { name: "Team 3", value: "3" },
    { name: "Team 4", value: "4" },
    { name: "Team 5", value: "5" },
    { name: "Team 6", value: "6" },
  ];

  //Assigning Team Logic
  const [selectedTeam, setSelectedTeam] = useState(null);

  const onTeamChange = (e) => {
    setSelectedTeam(e.value);
  };

  //Checkbox handleChange Logic
  const [sites, setSite] = useState(items);

  const handleChange = (e) => {
    const { name, checked } = e.target;

    if (name === "allSelect") {
      let tempItem = sites.map((props) => {
        return { ...props, isChecked: checked };
      });
      setSite(tempItem);
    } else {
      let tempItem = sites.map((props) =>
        props.siteId === name ? { ...props, isChecked: checked } : props
      );
      setSite(tempItem);
    }
  };

  //Site ID Filter Query Logic
  const filterSites = (sites, siteQuery) => {
    if (!siteQuery) {
      return sites;
    }

    return sites.filter((site) => {
      const itemName = site.siteId.toLowerCase();

      return itemName.startsWith(siteQuery.toLowerCase());
    });
  };

  const filteredSites = filterSites(sites, searchSiteQuery);

  //Post Code Filter Query Logic
  const filterPostCode = (items, postCodeQuery) => {
    if (!postCodeQuery) {
      return items;
    }

    return items.filter((item) => {
      const itemPostCode = item.postCode.toString();
      return itemPostCode.startsWith(postCodeQuery);
    });
  };

  const filteredPostCode = filterPostCode(items, searchPostCodeQuery);

  return (
    <Layout>
      <div className="pb-3">
        <SiteIdSearchBar
          searchSiteQuery={searchSiteQuery}
          setSearchSiteQuery={setSearchSiteQuery}
        />
        <div className="flex pt-8">
          <CheckboxMain
            name="allSelect"
            className="mr-2"
            checked={!filteredSites.some((props) => props?.isChecked !== true)}
            onChange={handleChange}
          />
          <label className="pt-1">Select All</label>
        </div>
        <br />
        <label>Site ID Query Results</label>
        {filteredSites.map((props, index) => (
          <div key={index}>
            <CheckboxMain
              className="mr-2 pt-5"
              name={props.siteId}
              checked={props?.isChecked || false}
              onChange={handleChange}
            />
            <TeamAssignmentCardView key={props.key} item={props} />
          </div>
        ))}
        <br />
        <PostCodeSearchBar
          searchPostCodeQuery={searchPostCodeQuery}
          setSearchPostCodeQuery={setSearchPostCodeQuery}
        />
        <div className="flex pt-8">
          <CheckboxMain
            name="allSelect"
            className="mr-2"
            checked={
              !filteredPostCode.some((props) => props?.isChecked !== true)
            }
            onChange={handleChange}
          />
          <label className="pt-1">Select All</label>
        </div>
        <br />
        <label>Post Code Query Results</label>
        {filteredPostCode.map((props, index) => (
          <div key={index}>
            <CheckboxMain
              className="mr-2 pt-5"
              name={props.siteId}
              checked={props?.isChecked || false}
              onChange={handleChange}
            />
            <TeamAssignmentCardView key={props.key} item={props} />
          </div>
        ))}
        <div className="col-span-1">
          <InputLabel>Team</InputLabel>
          <Dropdown
            value={selectedTeam}
            options={teamItems}
            onChange={onTeamChange}
            optionLabel="name"
            placeholder="Select Team"
          />
        </div>
        <div>
          <PrimaryButton>Assign Team</PrimaryButton>
        </div>
      </div>
    </Layout>
  );
}
