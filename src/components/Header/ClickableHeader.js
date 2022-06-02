import { Fragment } from "react";
import { Link } from "react-router-dom";


// const ClickableHeader = ({header, href, secondary=""}) => {
//   return (
//       <Fragment>
//           <span className="uppercase">{secondary}</span>
//           <br />
//           {/* TODO: to be changed to Link and change "Google" to the correct link*/}
//           <Link
//             to={{pathname: href}}
//             className="text-lg hover:text-red-800 text-red-400"
//           >
//             {header}
//           </Link>
//       </Fragment>
//   );
// };

// TODO: make clickable link easily distinguishable from non clickable counterparts (i.e. apply different styling.)
const ClickableHeader = ({header, href, secondary=""}) => {
  return (
    <Fragment>
      <Link
        to={{ pathname: href }}
        // className="font-normal capitalize text-secondary hover:text-red-400 text-2xl"
        className="font-normal capitalize text-blue-900 text-2xl hover:font-semibold hover:border-blue-900 border-b-2 border-blue-100 "
      >
        {header}
      </Link>
      <br />
      <span className="font-light capitalize text-black text-2sm">
        { secondary }
      </span>
    </Fragment>
  );
};

export default ClickableHeader;