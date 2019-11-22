import React, {Component} from 'react';
import './styles/navi.css';


class Header extends Component {

    render() {
        return (
            <div className="naviContainer">
                <div className="navigation">
                    <span class="naviElement">NOTE</span>
                    <span class="naviElement">RESELL</span>
                    <span class="naviElement">BUMP</span>
                    <span class="naviElement">ACCOUNT</span>
                </div>
            </div>
        )
    }
}


export default Header;