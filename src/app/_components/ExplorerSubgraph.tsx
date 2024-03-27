"use client";
import { useQuery } from "@apollo/client";
import { getAirSwapLights } from "../utility/graph/query";
import styles from "./ExplorerSubgraph.module.scss";
import { useEffect, useState } from "react";

const ExplorerSubgraph = () => {
  const { data, loading, error } = useQuery(getAirSwapLights);
  const [subgraphData, setSubgrapData] = useState<Array<Object>>([]);
  const [columns, setColumns] = useState<string[]>();

  useEffect(() => {
    if (data?.swapLights?.length) {
      setSubgrapData(data.swapLights);

      let cols = Object.keys(data.swapLights[0]);
      setColumns(cols);
    }
  }, [data]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  console.log("data", data);

  return (
    <div className={styles.explorerSubgraphContainer}>
      <h1 className={styles.tableTitle}>Subgraphn Data</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns!?.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subgraphData.map((row: any, index) => (
              <tr key={index}>
                {columns!?.map((column) => (
                  <td key={column}>{row[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExplorerSubgraph;
