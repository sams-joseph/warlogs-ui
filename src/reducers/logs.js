import {
  LOGS_UPLOAD_STARTED,
  LOGS_UPLOAD_SUCCESS,
  LOGS_UPLOAD_FAILURE,
  LOGS_PARSED_STARTED
} from "../types";

export default function logs(
  state = { fileName: "", success: false, data: { damage: [], healing: [] } },
  action = {}
) {
  switch (action.type) {
    case LOGS_UPLOAD_STARTED:
      return { ...state, ...action.data };

    case LOGS_PARSED_STARTED:
      return { ...state, ...action.data };
    case LOGS_UPLOAD_SUCCESS:
    case LOGS_UPLOAD_FAILURE:
    default:
      return state;
  }
}
