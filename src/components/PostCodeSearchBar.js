import InputTextBar from "./FormComponents/InputTextBar";
import PrimaryButton from "./Button/PrimaryButton";

const PostCodeSearchBar = ({ searchPostCodeQuery, setSearchPostCodeQuery }) => {
  return (
    <form action="/" method="get">
      <InputTextBar
        type="search"
        placeholder="Enter Post Code"
        name="pcs"
        value={searchPostCodeQuery}
        onInput={(e) => setSearchPostCodeQuery(e.target.value)}
      ></InputTextBar>
    </form>
  );

  //<PrimaryButton type="submit">Search</PrimaryButton>
};
export default PostCodeSearchBar;
