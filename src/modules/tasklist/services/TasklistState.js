import { useSelector } from "react-redux";

export default function useTasklistAction() {
  return useSelector((state) => state.tasklistReducer);
}
