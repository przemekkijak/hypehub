import React from 'react'

function Tools(props) {
    const item = props.item;

function copyDesc() {
    let description;
    if(item.type === 1) {
        description = `${item.name}\n${item.cond}/10 \n${item.size} (${item.length}/${item.width})\n${item.buyPrice}PLN`;
    } else {
        description = `${item.name}\n${item.cond}/10 \n${item.size}\n${item.buyPrice}PLN`;
    }
    const area = document.createElement('textarea');
    area.value = description;
    area.setAttribute('readonly','');
    area.style.position = 'absolute';
    area.style.left = '-999999px';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
}

return(

    <div className="itemOptions">
        <p><button onClick={() => copyDesc()}>Skopiuj opis</button></p>
        <p><button>Zdjecie z opisem</button></p>
        <p><button>Zdjecie bez opisu</button></p>
    </div>
    // <div className="itemPhotos">
    //     <img
    //     src="https://hypehub.s3.eu-central-1.amazonaws.com/items_img/252/1.jpg"
    //     alt="item"
    //     className="itemPhoto"/>
    //     <img
    //     src="https://hypehub.s3.eu-central-1.amazonaws.com/items_img/252/2.jpg"
    //     alt="item"
    //     className="itemPhoto"/>
    //     <img
    //     src="https://hypehub.s3.eu-central-1.amazonaws.com/items_img/252/3.jpg"
    //     alt="item"
    //     className="itemPhoto"/>
    //     <img
    //     src="https://hypehub.s3.eu-central-1.amazonaws.com/items_img/252/4.jpg"
    //     alt="item"
    //     className="itemPhoto"/>
    // </div>
)
}

export default Tools;