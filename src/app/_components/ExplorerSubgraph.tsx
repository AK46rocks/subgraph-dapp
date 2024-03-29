"use client";
import { useQuery } from "@apollo/client";
import { getCryptoPunksNft } from "../utility/graph/query";
import styles from "./ExplorerSubgraph.module.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExplorerSubgraph = () => {
  const { data, loading, error } = useQuery(getCryptoPunksNft);
  const [subgraphData, setSubgrapData] = useState<Array<Object>>([]);

  useEffect(() => {
    if (data?.punkTransfers?.length) {
      setSubgrapData(data.punkTransfers);
    }
  }, [data]);

  if (loading) {
    return <h2 className={styles.loading}>Loading NFTs...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  console.log("data", data);

  const handleCopyClick = async (text: string | number) => {
    toast("Transaction Hash Copied!");
    console.log("toast shown");
    try {
      await navigator.clipboard.writeText(text.toString());
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleDate = (dateNumber: string) => {
    const unixTimestamp = parseInt(dateNumber);
    const date = moment.unix(unixTimestamp);
    const currentDate = moment();

    const difference = currentDate.diff(date, "seconds");
    const duration = moment.duration(difference, "seconds");

    if (duration.asSeconds() < 60) {
      return "Just now";
    } else if (duration.asMinutes() < 60) {
      return `${Math.floor(duration.asMinutes())} minutes ago`;
    } else if (duration.asHours() < 24) {
      return `${Math.floor(duration.asHours())} hours ago`;
    } else if (duration.asDays() < 30) {
      return `${Math.floor(duration.asDays())} days ago`;
    } else {
      return date.format("YYYY-MM-DD HH:mm:ss");
    }
  };

  const generateRandomNumber = () => {
    let ran = Math.floor(Math.random() * 21);
    return `./images/punk${ran}.webp`;
  };

  return (
    <div className={styles.explorerSubgraphContainer}>
      <ToastContainer />
      <h1 className={styles.tableTitle}>Crypto Punk NFT</h1>

      <div className={styles.nftImagesContainer}>
        {subgraphData!?.map((punk: any, index: number) => (
          <div
            className={styles.cardBox}
            key={punk.id}
          >
            <img
              className={styles.nftImage}
              // src={generateRandomNumber()}
              src={`./images/punk${index}.webp`}
              alt=""
              width={226}
              height={226}
            />

            <div className={styles.contentContainer}>
              <h4 className={styles.punkInfo}>
                Id: <span>{punk.id}</span>{" "}
              </h4>
              <h4 className={styles.punkInfo}>
                Punk Index: <span>{punk.punkIndex}</span>
              </h4>
              <h4 className={styles.punkInfo}>
                From: <span>{punk.from}</span>
              </h4>
              <h4 className={styles.punkInfo}>
                To: <span>{punk.to}</span>
              </h4>
              <h4 className={styles.punkInfo}>
                Tx Hash:{" "}
                <span
                  className={styles.txHash}
                  onClick={() => handleCopyClick(punk.transactionHash)}
                >
                  {punk.transactionHash}
                </span>
              </h4>
              <h4 className={styles.punkInfo}>
                Block Number:<span>{punk.blockNumber} </span>
              </h4>
              <h4 className={styles.punkInfo}>
                Timestamp: <span>{handleDate(punk.blockTimestamp)}</span>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorerSubgraph;
