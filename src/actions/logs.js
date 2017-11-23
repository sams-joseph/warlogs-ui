import {
  LOGS_UPLOAD_STARTED,
  LOGS_UPLOAD_SUCCESS,
  LOGS_UPLOAD_FAILURE,
  LOGS_PARSED_STARTED,
  LOGS_REQUEST_STARTED,
  LOG_REQUEST_STARTED,
} from '../types';
import api from '../api';

const logsUploaded = data => ({
  type: LOGS_UPLOAD_STARTED,
  data,
});

const logsParsed = data => ({
  type: LOGS_PARSED_STARTED,
  data,
});

const gotAllLogs = data => ({
  type: LOGS_REQUEST_STARTED,
  data,
});

const gotLog = data => ({
  type: LOG_REQUEST_STARTED,
  data,
});

const gotLogFilteredByUnit = data => ({
  type: LOG_REQUEST_STARTED,
  data,
});

export const uploadLogs = data => dispatch =>
  api.logs.upload(data).then(logs => dispatch(logsUploaded(logs)));

export const parseLogs = data => dispatch =>
  api.logs.parse(data).then(fileName => dispatch(logsParsed(fileName)));

export const getAllLogs = () => dispatch =>
  api.logs.getAllLogs().then(logs => dispatch(gotAllLogs(logs)));

export const getLogByID = data => dispatch =>
  api.logs.getLogByID(data).then(log => dispatch(gotLog(log)));

export const getLogFilteredByUnit = (id, unit) => dispatch =>
  api.logs.getLogFilterUnit(id, unit).then(log => dispatch(gotLogFilteredByUnit(log)));
