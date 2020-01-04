import React from 'react'


class ItemInfo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loaded: false,
            }
            const item = {};
        }


  componentDidMount() {
    this.props.socket.emit('getItem', this.props.itemID, data => {
        this.item = data[0];
        this.setState({loaded: true})
    });
}

convertCondition = (cond) => {
    if(cond === 10) {
        return 'DS';
    } else {
        return cond+'/10';
    }

}

    render() {
        return(
        (this.state.loaded) && (
            <div className="itemInfoContainer">
                <div className="itemHeader">
                <p id="itemName">{this.item.name}</p>
                </div>
                <div className="itemOptions">
                    <p><button>Skopiuj opis</button></p>
                    <p><button>Zdjecie z opisem</button></p>
                    <p><button>Zdjecie bez opisu</button></p>
                </div>
                <div className="itemPhotos">
                    <span>zdjecie 1</span>
                    <span> zdjecie2</span>
                    <span> zdjecie3 </span>
                </div>
            </div>
        )
        )
    }
}

export default ItemInfo;