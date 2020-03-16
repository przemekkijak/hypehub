import React, { useEffect } from 'react';
import './styles/stats.css';
import PlatformStats from './stats/platformStats';


function Stats(props) {



    return(
        <div id="statsContainer">

            <div id="soldItemsStats">
                <PlatformStats soldItems={props.soldItems}/>
            </div>

        </div>
    )
}

export default Stats;
