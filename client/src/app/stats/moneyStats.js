import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';


function MoneyStats(props) {

    const [period,setPeriod] = useState(7);

    useEffect(() => {
        new Chart(document.getElementById("cnvEarnings"), {
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
                    text: `Zarobki z ostatnich ${period} dni`
                    }
            }
        })
    });

    function getDates(type) {
        const startDate = new Date();
        let arrDates = [];
        startDate.setDate(startDate.getDate() - period);

        // For Yearly earnings ->
        if(period > 30) {
            switch(type) {
                //Short is for displaying dates in Chart e.g "19-07", Year+Month
                // Full is to compare dates with items Sold At, "2019-07", Full Year + Month
                default:
                case "short":
                    arrDates[0] = startDate.toISOString().slice(2,7);
                    break;
                case "full":
                    arrDates[0] = startDate.toISOString().slice(0,6);
            }

            for(let i = 1; i<=12; i++) {
                startDate.setMonth(startDate.getMonth() + 1);
                if(type === "short") {
                    arrDates.push(startDate.toISOString().slice(2,7));
                } else if(type === "full") {
                    arrDates.push(startDate.toISOString().slice(0,6));
                }
            }
        } else {
            switch(type) {
                // Short is for displaying dates in Chart e.g "08-20", Month+Day
                // Full is to compare dates with items Sold At, Full Date, Year+Month+Day
                default:
                case "short":
                    arrDates[0] = startDate.toISOString().slice(8,10);
                    break;
                case "full":
                    arrDates[0] = startDate.toISOString().slice(0,10);
            }
            for(let i = 1; i<period; i++) {
                startDate.setDate(startDate.getDate() + 1);
                if(type === "short") {
                    arrDates.push(startDate.toISOString().slice(8,10));
                } else if(type === "full") {
                arrDates.push(startDate.toISOString().slice(0,10));
                }
            }
        }
        return arrDates;
    }

    function getItems() {
        let dates = getDates("full");
        let earnings = [];
        for(let i = 0; i<=dates.length; i++) {
            let money = 0;
            props.soldItems.filter((element) => {
                if(period > 30) {
                    if(element.soldAt.slice(0,6) === dates[i]) {
                        money += (element.sellPrice - element.buyPrice);
                    }
                } else {
                    if(element.soldAt.slice(0,10) === dates[i]) {
                        money += (element.sellPrice - element.buyPrice);
                    }
                }
            })
            earnings.push(money);
        }
        return earnings;
    }


    return(
        <>
        <div id="earningsSwitch">

            <input type="radio"
            name="earnings"
            id="week"
            className="earningsRadio"
            onChange={() => setPeriod(7)}
            defaultChecked/>
            <label htmlFor="week">Tydzień</label>

            <input type="radio"
            name="earnings"
            id="month"
            className="earningsRadio"
            onChange={() => setPeriod(30)}/>
            <label htmlFor="month">Miesiąc</label>

            <input type="radio"
            name="earnings"
            id="year"
            className="earningsRadio"
            onChange={() => setPeriod(365)}/>
            <label htmlFor="year">Rok</label>


        </div>
        <canvas id="cnvEarnings"></canvas>
        </>
    )

}

export default MoneyStats;