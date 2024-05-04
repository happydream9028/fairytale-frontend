import AxiosMockAdapter from "axios-mock-adapter";

import axios from "../utils/axios";

const axiosMockAdapter = new AxiosMockAdapter(axios, {
  delayResponse: 2000,
});

export default axiosMockAdapter;
