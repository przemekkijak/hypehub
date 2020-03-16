import React, { useEffect } from 'react';
import Chart from 'chart.js';


function MoneyStats(props) {

    let today = new Date();
    let weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    useEffect(() => {

        let arrDates = [];
        for(let i = 1; i<=7; i++) {
            today.setDate(today.getDate() - 1);
            arrDates.push(today.toISOString().slice(8,10));
        }
        console.log(arrDates);

        new Chart(document.getElementById('moneyStats'), {
            type: 'line',
            data: {
                labels: arrDates,
                datasets: [{
                    data: [0,15,0,2,15,55,70],
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


    return(
        <canvas id="moneyStats"></canvas>
    )

}

export default MoneyStats;