/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import _axios from "@/lib/axios";

export const _depositEthereum = async ({
  address,
  amount,
  transactionHash,
}: {
  address: string;
  amount: number;
  transactionHash: string;
}) => {
  try {
    const { data, message } = await _axios.post(`deposit`, {
      address,
      amount,
      transactionHash,
    });

    return { data, message, status: 200 };
  } catch (e) {
    return { data: null, message: null, status: 400 };
  }
};

export const _withdrawEthereum = async ({
  address,
  amount,
}: {
  address: string;
  amount: number;
}) => {
  try {
    const { data, message } = await _axios.post(`withdraw`, {
      address,
      amount,
    });

    return { data, message, status: 200 };
  } catch (e) {
    return { data: null, message: null, status: 400 };
  }
};
