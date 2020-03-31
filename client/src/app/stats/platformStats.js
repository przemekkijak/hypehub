import React, { useEffect } from "react";
import Chart from "chart.js";
import store from "../redux/store/index";

function PlatformStats(props) {
  useEffect(() => {
    const { facebook, vinted, grailed, depop, other } = getPlatformData();
    new Chart(document.getElementById("platformStats"), {
      type: "bar",
      data: {
        labels: ["Facebook", "Vinted", "Grailed", "Depop", "Inne"],
        datasets: [
          {
            data: [
              facebook.length,
              vinted.length,
              grailed.length,
              depop.length,
              other.length,
            ],
            backgroundColor: [
              "rgba(18,23,26, 0.0)",
              "rgba(18,23,26, 0.0)",
              "rgba(18,23,26, 0.0)",
              "rgba(18,23,26, 0.0)",
              "rgba(18,23,26, 0.0)",
            ],
            borderColor: [
              "rgba(49,109,253, 1)",
              "rgba(29, 198, 197, 1)",
              "rgba(255, 255, 255, 1)",
              "rgba(245, 58, 58, 1)",
              "rgba(216, 243, 70, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                precision: 0,
              },
            },
          ],
        },
        tooltips: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Platformy sprzedażowe",
        },
      },
    });
  });

  function getPlatformData() {
    var soldItems = store.getState().soldItems;

    let facebook = soldItems.filter((element) => {
      return element.soldOn === "facebook";
    });
    let vinted = soldItems.filter((element) => {
      return element.soldOn === "vinted";
    });
    let grailed = soldItems.filter((element) => {
      return element.soldOn === "grailed";
    });
    let depop = soldItems.filter((element) => {
      return element.soldOn === "depop";
    });
    let other = soldItems.filter((element) => {
      return element.soldOn === "other";
    });

    let platforms = {
      facebook: facebook,
      vinted: vinted,
      grailed: grailed,
      depop: depop,
      other: other,
    };
    return platforms;
  }

  return <canvas id="platformStats"></canvas>;
}

export default PlatformStats;
