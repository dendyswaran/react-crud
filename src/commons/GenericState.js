import { useSelector } from "react-redux";

export default function useGenAction() {
    return useSelector(state => state.genReducer)
}