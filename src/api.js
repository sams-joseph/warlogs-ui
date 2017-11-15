import axios from "axios";

export default {
  logs: {
    upload: formData =>
      axios
        .post("http://localhost:5000/api/logs/upload", formData)
        .then(res => res.data),
    parse: fileName =>
      axios
        .get("http://localhost:5000/api/logs/parse", {
          params: { fileName: fileName }
        })
        .then(res => res.data),
    getAllLogs: () =>
      axios.get("http://localhost:5000/api/logs/").then(res => res.data),
    getLogByID: id =>
      axios.get(`http://localhost:5000/api/logs/${id}`).then(res => res.data)
  }
};
