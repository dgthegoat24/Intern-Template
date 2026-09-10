import Axios from '../utils/http.config';

export class AssessmentService {
  static submit(assessment) {
    try {
       return Axios.post("/assessments", assessment)
       .then((response) => response.data);
    } catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  static getList() {
  try {
    return Axios.get('/assessments')
      .then((response) => response.data);
  } catch (err) {
    throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
  }
}
}
