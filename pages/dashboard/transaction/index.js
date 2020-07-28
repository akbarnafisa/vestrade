import React from "react";
import axios from "axios";

import DashboardLayout from "@/components/Layout/dashboard";
import Header from "@/components/Dashboard/Common/Header";
import Table from "@/components/Dashboard/Transaction/Table";

export async function getServerSideProps() {
  const res = await axios.get(`http://api.vestrade.io/transactions`);
  const transactions = await res.data.data;
  return {
    props: {
      transactions,
    },
  };
}

export default function Transaction({ transactions }) {
  return (
    <DashboardLayout>
      <Header title="Transaction" />
      <Table transactions={transactions} />
    </DashboardLayout>
  );
}
