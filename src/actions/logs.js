import {
  LOGS_UPLOAD_STARTED,
  LOGS_UPLOAD_SUCCESS,
  LOGS_UPLOAD_FAILURE,
  LOGS_PARSED_STARTED
} from "../types";
import api from "../api";

const logsUploaded = data => ({
  type: LOGS_UPLOAD_STARTED,
  data
});

const logsParsed = data => ({
  type: LOGS_PARSED_STARTED,
  data
});

export const uploadLogs = data => dispatch =>
  api.logs.upload(data).then(logs => dispatch(logsUploaded(logs)));

export const parseLogs = data => dispatch =>
  api.logs.parse(data).then(fileName => dispatch(logsParsed(fileName)));
