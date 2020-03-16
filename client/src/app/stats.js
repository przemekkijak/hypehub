import React from 'react';
import './styles/stats.css';
import PlatformStats from './stats/platformStats';


function Stats(props) {



    return(
        <div id="statsContainer">

            <div id="platform">
                <PlatformStats soldItems={props.soldItems}/>
            </div>

        </div>
    )
}

export default Stats;
