import { genGetAllData } from "../../../commons/GenericAction";
import { TASKLIST_DETAIL, TASKLIST } from "../../../configs/constant";

// TODO: currently only work for Decom --> make further generalisation to make it also work for decom and ioh.
export function fetchTasklistDetails(id, tasklistData) {
  return async (dispatch) => {
    try {
      // set current state
      await dispatch({ type: TASKLIST_DETAIL.TASKLIST_DETAIL_LOADING });

      // TODO: make href a part of the redux store
      // TODO: when dispatching TASKLIST_DETAIL_LOADING --> dispatch IOH, DECOM OR  SCRAP/OEM to get the api link.

      await dispatch(
        // TODO: clarify whether to use ApiHelper get directly so that we can persist it into session like in MenuAction or what.
        genGetAllData(`/api/decom-tasklist/get-details/${id}`, (_respData) => {
          /** on success */

          // save tasklist and tasklist detail data into redux store.
          dispatch({
            type: TASKLIST_DETAIL.TASKLIST_DETAIL_SUCCESS,
            tasklist: tasklistData,
            details: _respData,
          });

          console.info(`tasklist details load successfully for ${id}`);
        })
      );

      // TODO: set isLoading the false;
    } catch (e) {
      dispatch({ type: TASKLIST_DETAIL.TASKLIST_DETAIL_FAILED });
      console.error(e, e.stack);
    } finally {
    }
  };
}

export function fetchAllEqps(id) {
  return async (dispatch) => {
    try {
      // TODO: check if this is required or is it redundant
      await dispatch({ type: TASKLIST_DETAIL.TASKLIST_DETAIL_LOADING });

      // TODO: make href a part of the redux store
      // TODO: when dispatching TASKLIST_DETAIL_LOADING --> dispatch IOH, DECOM OR  SCRAP/OEM to get the api link.

      await dispatch(
        // TODO: clarify whether to use ApiHelper get directly so that we can persist it into session like in MenuAction or what.
        genGetAllData(`/api/tasklist/get-all/${id}`, (_respData) => {
          /** on success */

          // save tasklist and tasklist detail data into redux store.
          dispatch({
            type: TASKLIST_DETAIL.TASKLIST_DETAIL_SUCCESS,
            tasklist: _respData.tappSite,
            details: _respData.tappSiteEqpList,
          });

          console.info(`tasklist details load successfully for ${id}`);
        })
      );

      // TODO: set isLoading the false;
    } catch (e) {
      dispatch({ type: TASKLIST_DETAIL.TASKLIST_DETAIL_FAILED });
      console.error(e, e.stack);
    } finally {
    }
  };
}

export function fetchAllTAppSites() {
  return async (dispatch) => {
    try {
      await dispatch(
        genGetAllData(`/api/tasklist/get`, (_respData) => {
          // on success
          dispatch({
            type: TASKLIST.TASKLIST_SUCCESS,
            tasklists: _respData,
          });
          console.info(`tasklists have been loaded successfully.`);
        })
      );
    } catch (e) {
      console.error(e, e.stack);
    } finally {
    }
  };
}