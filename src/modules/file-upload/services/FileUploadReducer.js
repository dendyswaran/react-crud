import { FILE_UPLOAD_ACTION } from "../../../configs/constant"

const initialState = {
    datatable: {},
    action: ""
}

const FileUploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILE_UPLOAD_ACTION.FILE_UPLOAD_DATATABLE_SUCCESS:
            return {
                ...state,
                datatable: action.payload,
                action: action.type
            }
        default:
            return state
    }
}

export default FileUploadReducer