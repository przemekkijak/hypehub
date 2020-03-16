import React, { useEffect } from 'react';
import Chart from 'chart.js';


function MoneyStats(props) {


    useEffect(() => {

        new Chart(document.getElementById('moneyStats'), {
            type: 'line',
            data: {
                labels: getDates("short"),
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
                    text: 'Zarobki z ostatnich 7 dni'
                }
            }
        })
    });

    function getDates(type) {
        const today = new Date();
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        let arrDates = [];
        if(type === "short") {
            arrDates[0] = today.toISOString().slice(8,10);
        } else {
            arrDates[0] = today.toISOString().slice(0,10);
        }

        for(let i = 1; i<=6; i++) {
            today.setDate(today.getDate() - 1);
            if(type === "short") {
                arrDates.push(today.toISOString().slice(8,10));
            } else {
            arrDates.push(today.toISOString().slice(0,10));
            }
        }
        return arrDates;
    }

    function getItems() {
        let dates = getDates();
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
        <canvas id="moneyStats"></canvas>
    )

}

export default MoneyStats;