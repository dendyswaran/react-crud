import SiteIdSearchBar from "../../../components/SiteIdSearchBar";
import Layout from "../../../components/Layout";
import TeamAssignmentCardView from "../../../components/CardView/TeamAssignmentCardView";
import PostCodeSearchBar from "../../../components/PostCodeSearchBar";
import { Dropdown } from "primereact/dropdown";
import InputLabel from "../../../components/FormComponents/InputLabel";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import CheckboxMain from "../../../components/FormComponents/CheckboxMain";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { genGetDataById } from "../../../commons/GenericAction";

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
  const dispatch = useDispatch();
  const [sites, setSite] = useState([]);

  useEffect(() => {
    dispatch(
      genGetDataById(`/api/tasklist/get`, (_respData) => {
        /** on success */
        setSite(_respData);
      })
    );
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;

    if (name === "allSelect") {
      let tempItem = sites.map((props) => {
        return { ...props, isChecked: checked };
      });
      setSite(tempItem);
    } else {
      let tempItem = sites.map((props) =>
        props.cd === name ? { ...props, isChecked: checked } : props
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
      const itemName = site.cd.toLowerCase();

      return itemName.startsWith(siteQuery.toLowerCase());
    });
  };

  const filteredSites = filterSites(sites, searchSiteQuery);

  return (
    <Layout>
      <div className="pb-3">
        <div>
          <SiteIdSearchBar
            searchSiteQuery={searchSiteQuery}
            setSearchSiteQuery={setSearchSiteQuery}
          />
          <PostCodeSearchBar
            searchPostCodeQuery={searchPostCodeQuery}
            setSearchPostCodeQuery={setSearchPostCodeQuery}
          />
        </div>
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
              name={props.cd}
              value={props.cd}
              checked={props?.isChecked || false}
              onChange={handleChange}
            />
            <TeamAssignmentCardView key={props.key} item={props} />
          </div>
        ))}
        <br />
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
