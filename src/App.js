import React, { useEffect, useState } from "react";
import axios from "axios";
import { ICA } from "@carbon/ibm-security";
import { ArrowUp } from "@carbon/icons-react";
import { ExternalLink } from "@carbon/ibm-security";
import "./App.css";
import { ICASkeleton } from "@carbon/ibm-security";

function App() {
  let [apiRes, setApiRes] = useState();

  let data = {
    id: 1,
    devices: {
      totalDevices: 2100,
      devicesRegInLastWeek: 223,
    },
    users: {
      totalUsers: 4100,
      usersWithNoDevice: 1400,
    },
    apps: 234,
    documents: 234,
    riskScore: {
      totalRiskScore: 2300,
      riskPercentThanLastWeek: 15,
    },
  };

  function callAPI() {
    axios
      .get("https://017krgrqec.api.quickmocker.com/home/organizationBase")
      .then((response) => {
        // handle success
        console.log("inside get");
        setApiRes(response.data);
      })
      .catch((error) => {
        // handle error
        console.log("Inside catch");
      });
  }

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div
      style={{
        marginLeft: "15%",
        marginTop: "10%",
        marginRight: "5%",
        border: "black 2px solid",
      }}
    >
      <div style={{ backgroundColor: "gray", padding: "10px" }}>
        Organization Overview
      </div>
      <div style={{ width: "100%", display: "flex", padding: "10px" }}>
        <div style={{ width: "20%", border: "white 2px solid" }}>
          <ICA
            value={
              apiRes ? apiRes.devices.totalDevices : data.devices.totalDevices
            }
            label={" Devices"}
            sizes={"lg"}
          ></ICA>

          <ExternalLink href="www.google.com">
            {apiRes
              ? apiRes.devices.devicesRegInLastWeek
              : data.devices.devicesRegInLastWeek}{" "}
            enrolled in last week
          </ExternalLink>
        </div>
        <div style={{ width: "20%", border: "white 2px solid" }}>
          <ICA
            value={apiRes ? apiRes.users.totalUsers : data.users.totalUsers}
            label={"Users"}
          ></ICA>
          <ExternalLink href="www.google.com">
            {apiRes
              ? apiRes.users.usersWithNoDevice
              : data.users.usersWithNoDevice}{" "}
            with no device
          </ExternalLink>
        </div>
        <div style={{ width: "20%", border: "white 2px solid" }}>
          <ICA value={apiRes ? apiRes.apps : data.apps} label={"Apps"}></ICA>
        </div>
        <div style={{ width: "20%", border: "white 2px solid" }}>
          <ICA
            value={apiRes ? apiRes.documents : data.documents}
            label={"Documents"}
          ></ICA>
        </div>
        <div style={{ width: "20%", border: "white 2px solid" }}>
          <ICA
            value={
              apiRes
                ? apiRes.riskScore.totalRiskScore
                : data.riskScore.totalRiskScore
            }
            label={" Risk Score"}
            trending={"true"}
          ></ICA>
          {/* <ArrowUp color="Red"></ArrowUp> */}
          <section>
            {apiRes
              ? apiRes.riskScore.riskPercentThanLastWeek
              : data.riskScore.riskPercentThanLastWeek}
            % more than last week
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
