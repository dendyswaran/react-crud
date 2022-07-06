import InputTextBar from "./FormComponents/InputTextBar";
import PrimaryButton from "./Button/PrimaryButton";

const SiteIdSearchBar = ({ searchSiteQuery, setSearchSiteQuery }) => {
  return (
    <form action="/" method="get">
      <InputTextBar
        type="search"
        placeholder="Enter Site ID"
        name="s"
        value={searchSiteQuery}
        onInput={(e) => setSearchSiteQuery(e.target.value)}
      ></InputTextBar>
    </form>
  );

  //<PrimaryButton type="submit">Search</PrimaryButton>
};
export default SiteIdSearchBar;
