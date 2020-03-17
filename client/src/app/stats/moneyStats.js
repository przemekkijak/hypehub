import React, { useEffect } from 'react';
import Chart from 'chart.js';


function MoneyStats(props) {


    useEffect(() => {

        new Chart(document.getElementById(props.cnvID), {
            type: 'line',
            data: {
                labels: getDates("short", props.period),
                datasets: [{
                    data: getItems(),
                    backgroundColor: [
                        'rgba(111, 180, 21, 0.5)'
                    ],
                    borderColor: [
                        'rgba(111, 180, 21, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            precision: 0

                        }
                    }]
                },
                tooltips: {
                    enabled: false
                },
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: `Zarobki z ostatnich ${props.amount} dni`
                }
            }
        })
    });

    function getDates(type, period) {
        const startDate = new Date();
        let arrDates = [];
        startDate.setDate(startDate.getDate() - props.amount);

        if(type === "short") {
            arrDates[0] = startDate.toISOString().slice(8,10);
        } else if(type === "full") {
            arrDates[0] = startDate.toISOString().slice(0,10);
        }

        for(let i = 1; i<props.amount; i++) {
            startDate.setDate(startDate.getDate() + 1);
            if(type === "short") {
                arrDates.push(startDate.toISOString().slice(8,10));
            } else if(type === "full") {
            arrDates.push(startDate.toISOString().slice(0,10));
            }
        }
        console.log(arrDates);
        return arrDates;
    }

    function getItems() {
        let dates = getDates("full", props.period);
        let earnings = [];
        for(let i = 0; i<=dates.length; i++) {
            let money = 0;
            props.soldItems.filter((element) => {
                if(element.soldAt.slice(0,10) === dates[i]) {
                    money += (element.sellPrice - element.buyPrice);
                }
            })
            earnings.push(money);
        }
        return earnings;
    }


    return(
        <canvas id={props.cnvID}></canvas>
    )

}

export default MoneyStats;