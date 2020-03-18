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

            <div id="earnings">
                <MoneyStats soldItems={props.soldItems} period="days" cnvID="week"/>
            </div>

        </div>
    )
}

export default Stats;
