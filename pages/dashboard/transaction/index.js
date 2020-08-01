import React from "react";
import axios from "axios";

import DashboardLayout from "@/components/Layout/dashboard";
import Header from "@/components/Dashboard/Common/Header";
import Table from "@/components/Dashboard/Transaction/Table";
import { useRouter } from "next/router";


import { get } from "@/utils/index";

export async function getServerSideProps ({ query }) {
  let url = 'https://api.vestrade.io/transactions'
  const tokenAddr = get(query, 'tokenAddr', '')
  if (tokenAddr) {
    url = `${url}?tokenAddr=${tokenAddr}`
  }
  const res = await axios.get(url)
  const transactions = await res.data.data;
  return {
    props: {
      transactions,
    },
  };
}

export default function Transaction ({ transactions }) {
  const router = useRouter()
  const descHeader = () => {
    const tokenAddr = get(router, 'query.tokenAddr', '')
    if (!tokenAddr) return `Transaction for all token`
    return `Transaction for token ${tokenAddr}`
  }
  return (
    <DashboardLayout>
      <Header
        title="Transaction"
        desc={descHeader()}
      />
      <Table transactions={transactions} />
    </DashboardLayout>
  );
}
