import React, { useEffect, useState } from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import { useSelector } from "react-redux";
import { getStatistics } from "../../apiCalls/post";

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";

const MainChartExample = (attributes) => {
  // const random = (min, max) => {
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // };
  const token = useSelector((state) => state.userInfo.user.token);
  const [data, setData] = useState({ product: {}, productVar: {}, user: {} });

  useEffect(() => {
    const payload = { days: 7, target: ["product", "productVar", "user"] };
    getStatistics(payload, token)
      .then(({ data }) => {
        const [{ product }, { productVar }, { user }] = data.resultList;
        const fetchedData = {
          product,
          productVar,
          user,
        };
        setData(fetchedData);
        console.log("returned data: ", fetchedData);
        console.log("returned data: ", product.values);
      })
      .catch((error) => {
        throw error;
      });
  }, [token]);

  const defaultDatasets = (() => {
    // let elements = 27;
    const data1 = data.product.labels;
    const data2 = data.productVar.labels;
    const data3 = data.user.labels;
    // for (let i = 0; i <= elements; i++) {
    //   data1.push(random(50, 200));
    //   data2.push(random(80, 100));
    //   data3.push(random(40, 110));
    // }

    return [
      {
        label: "Number of products",
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: data1,
      },
      {
        label: "Number of product variants",
        backgroundColor: hexToRgba(brandSuccess, 10),
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: data2,
      },
      {
        label: "Number of users",
        backgroundColor: "transparent",
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5],
        data: data3,
      },
    ];
  })();

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(50 / 10),
              max: 50,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  // render
  return (
    <>
      {data && (
        <CChartLine
          {...attributes}
          datasets={defaultDatasets}
          options={defaultOptions}
          labels={data.product.values || null}
        />
      )}
    </>
  );
};

export default MainChartExample;

// [
//   "Mo",
//   "Tu",
//   "We",
//   "Th",
//   "Fr",
//   "Sa",
//   "Su",
//   "Mo",
//   "Tu",
//   "We",
//   "Th",
//   "Fr",
//   "Sa",
//   "Su",
//   "Mo",
//   "Tu",
//   "We",
//   "Th",
//   "Fr",
//   "Sa",
//   "Su",
//   "Mo",
//   "Tu",
//   "We",
//   "Th",
//   "Fr",
//   "Sa",
//   "Su",
// ]
