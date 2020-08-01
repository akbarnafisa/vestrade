import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/Layout/dashboard";
import axios from "axios";
import { useRouter } from "next/router";

import Table from "@/components/Dashboard/Offering/Table";
import ModalStep from "@/components/Dashboard/Offering/ModalStep";
import ModalOffering from "@/components/Dashboard/Offering/ModalOffering";
import Header from "@/components/Dashboard/Common/Header";
import { ToastContainer } from "react-toastify";

import { lockScroll, get } from "@/utils/index";

export async function getServerSideProps ({ query }) {
  let url = 'https://api.vestrade.io/offerings'
  const tokenAddr = get(query, 'tokenAddr', '')
  if (tokenAddr) {
    url = `${url}?tokenAddr=${tokenAddr}`
  }
  const res = await axios.get(url);
  const offering = await res.data.data;
  return {
    props: {
      offering,
    },
  };
}

export default function Offering ({ offering }) {
  const [modalOffering, setModalOffering] = useState(false);

  const [initOffering, setInitOffering] = useState(offering);

  console.log(offering, 123)
  console.log(initOffering, 321)

  const router = useRouter()
  const tokenAddr = get(router, 'query.tokenAddr', '')

  useEffect(() => {
    setInitOffering(offering)
  }, [offering])

  const descHeader = () => {
    if (!tokenAddr) return `Offerings for all token`
    return `Offerings for token ${tokenAddr}`
  }

  const showButton = () => {
    return tokenAddr ? 'Add new Offering' : null
  }

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
        btn={showButton()}
        desc={descHeader()}
        openModal={() => {
          setModalOffering(true);
          lockScroll(true);
        }}
        title="Offering"
      />
      <Table
        offerings={initOffering}
      />
      {modalOffering ? (
        <ModalOffering
          closeModal={() => {
            setModalOffering(false);
            lockScroll(false);
          }}
        />
      ) : null}
    </DashboardLayout>
  );
}
