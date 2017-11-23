import {
  LOGS_UPLOAD_STARTED,
  LOGS_UPLOAD_SUCCESS,
  LOGS_UPLOAD_FAILURE,
  LOGS_PARSED_STARTED,
  LOGS_REQUEST_STARTED,
  LOG_REQUEST_STARTED,
} from '../types';

export default function logs(
  state = { success: false, logs: [], log: [] },
  action = {},
) {
  switch (action.type) {
    case LOGS_UPLOAD_STARTED:
      return { ...state, ...action.data };

    case LOGS_PARSED_STARTED:
      return { ...state, ...action.data };
    case LOGS_REQUEST_STARTED:
      return { ...state, ...action.data };
    case LOG_REQUEST_STARTED:
      return { ...state, success: true, ...action.data };
    case LOGS_UPLOAD_SUCCESS:
    case LOGS_UPLOAD_FAILURE:
    default:
      return state;
  }
}
