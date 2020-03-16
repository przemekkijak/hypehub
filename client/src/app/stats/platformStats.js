import React, {useEffect} from 'react';
import Chart from 'chart.js';
import '../styles/stats.css';


function PlatformStats(props) {


    useEffect(() => {
        const {facebook, vinted, grailed, depop, other} = getPlatformData();
        var ctx = document.getElementById('platformStats');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Facebook', 'Vinted', 'Grailed', 'Depop', 'Inne'],
                datasets: [{
                    label: 'Platforma',
                    data: [facebook.length, vinted.length, grailed.length, depop.length, other.length],
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
                },
                tooltips: {
                    enabled: false
                }
            }
        });

    })

    function getPlatformData() {
        let facebook = props.soldItems.filter((element) => {
            return element.soldOn === "facebook";
        })
        let vinted = props.soldItems.filter((element) => {
            return element.soldOn === "vinted";
        })
        let grailed = props.soldItems.filter((element) => {
            return element.soldOn === "grailed";
        })
        let depop = props.soldItems.filter((element) => {
            return element.soldOn === "depop";
        })
        let other = props.soldItems.filter((element) => {
            return element.soldOn === "other";
        })

        let platforms = {
            facebook: facebook,
            vinted: vinted,
            grailed: grailed,
            depop: depop,
            other: other
        }
        return platforms;
    }

return (
    <canvas id="platformStats"></canvas>
)
}

export default PlatformStats;