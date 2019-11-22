import React from 'react';


class Current extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentItems: []};
    }

    componentDidMount() {
        fetch('http://localhost:3000/getCurrentItems')
        .then(response => response.json())
        .then(currentItems => (this.setState({currentItems})))
    }


    render() {
        return (
           <div className="itemSlot">
               {
                   this.state.currentItems.map((item) =>
                    <p>{item.item_name}</p>
                   )}
           </div>
        )
    }
}


export default Current;