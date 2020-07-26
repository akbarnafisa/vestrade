import React, { useState } from "react";
import DashboardLayout from "@/components/Layout/dashboard";
import axios from "axios";

import Table from "@/components/Dashboard/Offering/Table";
import ModalStep from "@/components/Dashboard/Offering/ModalStep";
import ModalOffering from "@/components/Dashboard/Offering/ModalOffering";
import Header from "@/components/Dashboard/Common/Header";

import { lockScroll } from "@/utils/index";

export async function getStaticProps() {
  const res = await axios.get(`http://api.vestrade.io/offerings`);
  const offering = await res.data.data;
  return {
    props: {
      offering,
    },
  };
}

export default function Offering({ offering }) {
  const [modalStep, setModalStep] = useState(false);
  const [modalOffering, setModalOffering] = useState(false);

  const [initOffering, setInitOffering] = useState(offering);

  return (
    <DashboardLayout>
      <Header
        btn="Add new Offering"
        desc="Description about offering"
        openModal={() => {
          setModalStep(true);
          lockScroll(true);
        }}
        title="Offering"
      />
      <Table offerings={initOffering} />
      {modalStep ? (
        <ModalStep
          closeModal={() => {
            setModalStep(false);
            lockScroll(false);
          }}
        />
      ) : null}
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
