import { useSelector } from "react-redux";

const useMenuAction = () => {
  return useSelector((state) => state.menuReducer);
};

export default useMenuAction;
