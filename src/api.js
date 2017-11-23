import axios from 'axios';

export default {
  logs: {
    upload: formData =>
      axios
        .post(`${process.env.REACT_APP_API_HOST}/api/logs/upload`, formData)
        .then(res => res.data),
    parse: fileName =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/logs/parse`, {
          params: { fileName },
        })
        .then(res => res.data),
    getAllLogs: () =>
      axios.get(`${process.env.REACT_APP_API_HOST}/api/logs/`).then(res => res.data),
    getLogByID: id =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/logs/${id}`)
        .then(res => res.data),
    getLogFilterUnit: (id, unit) =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/logs/filter/${id}?unit=${unit}`)
        .then(res => res.data),
  },
};
