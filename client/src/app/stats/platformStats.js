import React, {useEffect} from 'react';
import Chart from 'chart.js';
import '../styles/stats.css';


function PlatformStats(props) {


    useEffect(() => {
        getPlatformData();
        var ctx = document.getElementById('platformStats');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Facebook', 'Vinted', 'Grailed', 'Depop', 'Inne'],
                datasets: [{
                    label: 'Platforma',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(49, 109, 253, 0.3)',
                        'rgba(29, 198, 197, 0.3)',
                        'rgba(255, 255, 255, 0.3)',
                        'rgba(245, 58, 58, 0.3)',
                        'rgba(216, 243, 70, 0.3)',
                    ],
                    borderColor: [
                        'rgba(49, 109, 253, 1)',
                        'rgba(29, 198, 197, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(245, 58, 58, 1)',
                        'rgba(216, 243, 70, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    }, [])

    function getPlatformData() {
        console.log(props.soldItems);
    }

return (
    <canvas id="platformStats"></canvas>
)
}

export default PlatformStats;