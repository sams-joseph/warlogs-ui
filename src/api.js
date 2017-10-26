import axios from "axios";

export default {
  logs: {
    upload: formData =>
      axios.post("/api/logs/upload", formData).then(res => res.data),
    parse: fileName =>
      axios
        .get("/api/logs/parse", { params: { fileName: fileName } })
        .then(res => res.data)
  }
};
