import React from 'react';
import './styles/stats.css';
import PlatformStats from './stats/platformStats';
import MoneyStats from './stats/moneyStats';


function Stats(props) {



    return(
        <div id="statsContainer">

            <div id="platform">
                <PlatformStats soldItems={props.soldItems}/>
            </div>

            <div id="weekEarnings">
                <MoneyStats soldItems={props.soldItems} period="days" amount="7" cnvID="week"/>
            </div>

            <div id="monthEarnings">
                <MoneyStats soldItems={props.soldItems} period="days" amount="30" cnvID="month"/>
            </div>
        </div>
    )
}

export default Stats;
