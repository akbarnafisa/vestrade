import React, { useState } from "react";

import axios from "axios";

import DashboardLayout from "@/components/Layout/dashboard";
import ModalEdit from "@/components/Dashboard/Token/ModalEdit";
import ModalToken from "@/components/Dashboard/Token/ModalToken";
import Table from "@/components/Dashboard/Token/Table";
import Header from "@/components/Dashboard/Common/Header";

import { lockScroll } from "@/utils/index";
import { ToastContainer } from "react-toastify";

export async function getServerSideProps() {
  const res = await axios.get(`http://api.vestrade.io/tokens`);
  const tokens = await res.data.data;
  return {
    props: {
      tokens,
    },
  };
}

export default function Dashboard({ tokens }) {
  const [modalToken, setModalToken] = useState(false);
  const [modalEditToken, setModalEditToken] = useState(false);

  const [initTokens, setInitTokens] = useState(tokens);

  const updateTokens = (val) => {
    const result = initTokens.map((x) => {
      const item = val.tokenAddr === x.tokenAddr;
      return item ? val : x;
    });
    setInitTokens(result);
  };
  return (
    <DashboardLayout>
      <ToastContainer
        autoClose={2500}
        closeOnClick={false}
        draggable={false}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        position="top-right"
        rtl={false}
      />
      <Header
        btn="Add new Token"
        desc="Description about token"
        openModal={() => {
          setModalToken(true);
          lockScroll(true);
        }}
        title="Token"
      />
      <Table
        setModalEditToken={(val) => {
          setModalEditToken(val);
          lockScroll(true);
        }}
        tokens={initTokens}
      />
      {modalToken ? (
        <ModalToken
          closeModalToken={() => {
            setModalToken(false);
            lockScroll(false);
          }}
          setInitTokens={(val) => setInitTokens(initTokens.concat(val))}
        />
      ) : null}

      {modalEditToken ? (
        <ModalEdit
          closeModalEditToken={() => {
            setModalEditToken(false);
            lockScroll(false);
          }}
          token={modalEditToken}
          updateTokens={(val) => updateTokens(val)}
        />
      ) : null}
    </DashboardLayout>
  );
}
