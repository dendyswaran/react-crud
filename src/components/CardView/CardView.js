import { Link } from "react-router-dom";
import UserInfoCardView from "./UserInfoCardView";
import IconCardHeader from "../UI/IconCardHeader";

const CardView = (props) => {
  console.log(props.item.siteId);
  return (
    <div className="pb-3">
      <div className="rounded-lg container bg-white w-full p-2 sm:p-4 grid gap-4 lg:grid-cols-2 grid-cols-3">
        <div className="col-span-1">
          <span>SITE ID</span>
          <br />
          {/* TODO: to be changed to Link and change "Google" to the correct link*/}
          <a
            href="https://www.google.com"
            className="text-lg hover:text-red-800 text-red-400"
          >
            {props.item.siteId}
          </a>

          {/* TODO: Change to this color scheme, but stick to above padding style and hover--> change color or something liddat. */}
          {/* <IconCardHeader>
            {" "}
            <a href="https://www.google.com">{props.item.siteId}</a>
          </IconCardHeader> */}
        </div>
        <div className="lg:col-span-1 inline-flex flex-row flex-wrap text-sm  col-span-2">
          {/* <MiniCardView stringContent={props.item.equipment + " Equipments"} />
          <MiniCardView stringContent={props.item.vendor} />
          <MiniCardView stringContent={"To Decom " + props.item.decom} /> */}
          <UserInfoCardView>
            {props.item.equipment + " Equipments"}
          </UserInfoCardView>
          <UserInfoCardView>{props.item.vendor}</UserInfoCardView>
          <UserInfoCardView>{"To Decom " + props.item.decom}</UserInfoCardView>
        </div>
      </div>
    </div>
  );
};

export default CardView;
