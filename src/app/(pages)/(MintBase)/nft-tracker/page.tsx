"use client";
import { API_KEY } from "@/app/utility/constants";
import styles from "./page.module.scss";
import { DappLookerChartsAPI } from "dapplooker-sdk";
import { useEffect, useState } from "react";
import ChartJSService from "@/app/_components/ChartJSService";
import moment from "moment";
import { ChartData } from "chart.js";

export default function NFTtrackerPage() {
  const [currentListedNFT, setCurrentListedNFT] = useState<number | string>(0);
  const [monthlyBidsChart, setMonthlyBidsChart] = useState();

  const getChartData = async (chartUuid: string) => {
    let chartUUID = chartUuid;
    let apiKey = API_KEY;
    let outputFormat = "json";
    let filterParameter = {
      nft_contract_id: "nft.herewallet.near", //Enter Contract Id of Mintbase store
    };
    let response = await DappLookerChartsAPI.getChartData(chartUUID, apiKey, outputFormat, filterParameter);
    console.log("response", response);
    return response;
  };

  useEffect(() => {
    (async () => {
      await getCurrentListedNFT();
      await getMonthlyBidsChart();
    })();
  }, []);

  const getCurrentListedNFT = async () => {
    let response = await getChartData("57a494d4-f8b3-4228-8793-dcbe0b619540");
    // console.log("response", response);

    if (response && response?.length) {
      let count = response[0]["Count"].toLocaleString();
      setCurrentListedNFT(count);
    }
  };

  const getMonthlyBidsChart = async () => {
    let res: any = await getChartData("48b468e5-2041-453c-9f8d-38707f3c40d2");

    if (res && res?.length) {
      const xAxisValues = res!.map((item: any) => moment(item["Month"]).format("YYYY-MM-DD")) || [];
      const yAxisValues = res!.map((item: any) => item["Bid Count"].toFixed(2));

      // This is the required format for ChartJs Data
      const formattedData: any = {
        labels: xAxisValues,
        datasets: [
          {
            label: "Monthly Bids",
            data: yAxisValues,
            backgroundColor: ["#f268224d"],
            borderColor: ["#f26822"],
            pointBorderColor: "black",
            borderWidth: 1,
            fill: true,
            tension: 0.4,
          },
        ],
      };

      setMonthlyBidsChart(formattedData);
    }
  };

  return (
    <>
      <main className={styles.mainPage}>
        <div className={styles.header}>
          <h1 className={styles.title}>NFT Tracker</h1>
        </div>

        <div className={styles.bannerSection}>
          <h1 className={styles.bannerTitle}>Example Use Cases of Dapplooker NFT APIs</h1>
          <p className={styles.bannerDesc}>
            Dapplooker API SDK provides easy way for mintbase store owners and developers to get advance analytics for
            your project or analysis.
          </p>
        </div>

        <div className={styles.nftTrackersContainer}>
          {/* Current Listed NFT */}
          <div className={styles.analyticsContainer}>
            <h1 className={styles.salesVolumeCount}>{currentListedNFT} NEAR</h1>
            <h5 className={styles.text}>Total Sales Volume</h5>
          </div>

          {/* Creating a Chart of Monthly Bids using Chart Js and Dapplooker API SDK */}
          <div className={styles.analyticsContainer}>
            <ChartJSService
              data={monthlyBidsChart}
              type={"bar"}
            />
          </div>
        </div>
      </main>
    </>
  );
}
