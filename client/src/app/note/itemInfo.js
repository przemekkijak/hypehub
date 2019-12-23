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

    render() {
        return(
        (this.state.loaded) && (
            <div className="itemInfoContainer">
                <div className="itemHeader">
                <p id="itemName">{this.item.name}</p>
                </div>
                <div className="itemDetails">
                    <p>cena</p>
                    <p>stan</p>
                    <p>rozmiar</p>
                </div>
                <div clasName="itemOpstion">
                    <button>Skopiuj opis</button>
                    <button>Wygeneruj zdjecie z opisem</button>
                    <button>Wygeneruj zdjecie bez opisu</button>
                </div>
                <div className="itemPhotos">
                    <p>fota 1</p>
                    <p>fota 2</p>
                    <p>fota 3</p>
                </div>
            </div>
        )
        )
    }
}

export default ItemInfo;