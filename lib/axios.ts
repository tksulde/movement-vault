/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axios from "axios";

const _axios: any = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
  timeout: 50 * 1000,
});

export default _axios;
