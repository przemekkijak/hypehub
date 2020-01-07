(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{100:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(26),c=a.n(l),o=(a(54),a(1)),u=(a(55),a(7)),m=a.n(u);var s=function(e){for(var t=e.socket,a=Object(n.useRef)(),l=Object(n.useRef)(),c=Object(n.useRef)(),o=[l,c],u=e.items,m=0;m<u.length;m++)if(u[m].id===e.id)var s=u[m].name;return r.a.createElement("div",{className:"itemMenuBox"},r.a.createElement("form",{onSubmit:function(a){a.preventDefault();var n={id:e.id,price:l.current.value,soldFor:c.current.value},r=0,u=!0,m=!1,s=void 0;try{for(var i,d=o[Symbol.iterator]();!(u=(i=d.next()).done);u=!0){var p=i.value;/^[a-zA-Z0-9 ]+$/.test(p.current.value)&&++r===o.length&&(isNaN(n.price)||(t.emit("sellItem",n),e.refreshItems()))}}catch(f){m=!0,s=f}finally{try{u||null==d.return||d.return()}finally{if(m)throw s}}e.handleModal()},ref:a},r.a.createElement("span",null,"Sprzedajesz ",s),r.a.createElement("p",null,r.a.createElement("input",{placeholder:"Cena",ref:l,autoFocus:!0,required:!0})),r.a.createElement("p",null,r.a.createElement("input",{placeholder:"Kupujacy (opcjonalnie)",ref:c})),r.a.createElement("p",null,r.a.createElement("button",{type:"submit",className:"menuButton",value:"Submit"},"Sprzedaj"))))};m.a.setAppElement("#root");var i=function(e){var t=e.socket,a=Object(n.useState)(!1),l=Object(o.a)(a,2),c=l[0],u=l[1],i=Object(n.useState)(0),d=Object(o.a)(i,2),p=d[0],f=d[1];return r.a.createElement("div",{className:"currentContainer"},e.items.map((function(t){return r.a.createElement("div",{className:"itemSlot",id:"currentColumns",key:t.id},r.a.createElement("p",{onClick:function(){return e.itemInfo(t.id)}},t.name),r.a.createElement("p",{onClick:function(){return e.itemInfo(t.id)}},t.size),r.a.createElement("p",{onClick:function(){return e.itemInfo(t.id)}},10===(a=t.cond)?"DS":a+"/10"),r.a.createElement("p",{onClick:function(){return e.itemInfo(t.id)}},t.buyPrice," z\u0142"),r.a.createElement("p",null,r.a.createElement("button",{className:"noteButton sellButton",onClick:function(){return function(e){u(!0),f(e)}(t.id)}},"$")),r.a.createElement("p",null,r.a.createElement("button",{className:"noteButton deleteButton",id:t.id,onClick:function(t){return e.deleteItem(t)}},"x")));var a})),r.a.createElement(m.a,{isOpen:c,className:"modalContent",overlayClassName:"modalOverlay",onRequestClose:function(){return u(!1)}},r.a.createElement(s,{socket:t,id:p,items:e.items,handleModal:function(){u(!c)},refreshItems:e.refreshItems})))};var d=function(e){return r.a.createElement("div",{className:"soldContainer"},e.items.map((function(t){return r.a.createElement("div",{className:"itemSlot",id:"soldColumns",key:t.id},r.a.createElement("p",{onClick:function(){return e.itemInfo(t.id)}},t.name),r.a.createElement("p",{onClick:function(){return e.itemInfo(t.id)}},t.size),r.a.createElement("p",{onClick:function(){return e.itemInfo(t.id)}},10===(a=t.cond)?"DS":a+"/10"),r.a.createElement("p",{onClick:function(){return e.itemInfo(t.id)}},t.buyPrice," z\u0142"),r.a.createElement("p",{id:"earnings",onClick:function(){return e.itemInfo(t.id)}},t.sellPrice-t.buyPrice," z\u0142"),r.a.createElement("p",null,r.a.createElement("button",{className:"noteButton deleteButton",id:t.id,onClick:function(t){return e.deleteItem(t)}},"x")));var a})))};var p=function(e){return r.a.createElement("p",null,"coming soon")};var f=function(e){var t=Object(n.useRef)(),a=Object(n.useRef)(),l=Object(n.useRef)(),c=Object(n.useRef)(),o=Object(n.useRef)(),u=[a,l,c,o];return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{ref:t,onSubmit:function(t){t.preventDefault();var n={name:a.current.value,price:c.current.value,size:l.current.value,cond:o.current.value,type:e.itemType,ownerID:e.userID},r=0,m=!0,s=!1,i=void 0;try{for(var d,p=u[Symbol.iterator]();!(m=(d=p.next()).done);m=!0){var f=d.value;/^[a-zA-Z0-9 / ,.-]+$/.test(f.current.value)&&++r===u.length&&(isNaN(n.price)||isNaN(n.cond)||(e.socket.emit("addItem",n),e.refreshItems(),console.log("Doda\u0142em buta - socket poszedl")))}}catch(E){s=!0,i=E}finally{try{m||null==p.return||p.return()}finally{if(s)throw i}}e.handleModal("add")},className:"addItemForm"},r.a.createElement("p",null,r.a.createElement("input",{placeholder:"Nazwa",ref:a,autoFocus:!0,required:!0})),r.a.createElement("p",null,r.a.createElement("input",{placeholder:"Rozmiar",ref:l,required:!0})),r.a.createElement("p",null,r.a.createElement("input",{placeholder:"Cena",ref:c,required:!0})),r.a.createElement("p",null,r.a.createElement("input",{placeholder:"Stan",ref:o,required:!0})),r.a.createElement("p",null,r.a.createElement("button",{type:"submit",className:"addButton",value:"Submit"},"Dodaj"))))};var E=function(e){var t=Object(n.useRef)(),a=Object(n.useRef)(),l=Object(n.useRef)(),c=Object(n.useRef)(),o=Object(n.useRef)(),u=Object(n.useRef)(),m=Object(n.useRef)(),s=[a,l,c,o,u,m];return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{ref:t,onSubmit:function(t){t.preventDefault();var n={name:a.current.value,price:c.current.value,size:l.current.value,length:u.current.value,width:m.current.value,cond:o.current.value,type:e.itemType,ownerID:e.userID},r=0,i=!0,d=!1,p=void 0;try{for(var f,E=s[Symbol.iterator]();!(i=(f=E.next()).done);i=!0){var h=f.value;/^[a-zA-Z0-9 / ,.-]+$/.test(h.current.value)&&++r===s.length&&(isNaN(n.price)||isNaN(n.cond)||isNaN(n.length)||isNaN(n.width)||(e.socket.emit("addItem",n),e.refreshItems(),console.log("Doda\u0142em ciuch - socket poszedl")))}}catch(v){d=!0,p=v}finally{try{i||null==E.return||E.return()}finally{if(d)throw p}}e.handleModal("add")},className:"addItemForm"},r.a.createElement("p",null,r.a.createElement("input",{placeholder:"Nazwa",ref:a,autoFocus:!0,required:!0})),r.a.createElement("p",null,r.a.createElement("input",{placeholder:"Rozmiar",ref:l,required:!0})),r.a.createElement("p",null,r.a.createElement("input",{placeholder:"Dlugosc",ref:u,required:!0})),r.a.createElement("p",null,r.a.createElement("input",{placeholder:"Szerokosc",ref:m,required:!0})),r.a.createElement("p",null,r.a.createElement("input",{placeholder:"Cena",ref:c,required:!0})),r.a.createElement("p",null,r.a.createElement("input",{placeholder:"Stan",ref:o,required:!0})),r.a.createElement("p",null,r.a.createElement("button",{type:"submit",className:"addButton",value:"Submit"},"Dodaj"))))};var h=function(e){var t=Object(n.useRef)(),a=Object(n.useRef)(),l=Object(n.useRef)(),c=Object(n.useRef)(),o=Object(n.useRef)(),u=[a,l,c,o];return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{ref:t,onSubmit:function(t){t.preventDefault();var n={name:a.current.value,price:c.current.value,size:l.current.value,cond:o.current.value,type:e.itemType,ownerID:e.userID},r=0,m=!0,s=!1,i=void 0;try{for(var d,p=u[Symbol.iterator]();!(m=(d=p.next()).done);m=!0){var f=d.value;/^[a-zA-Z0-9 / ,.-]+$/.test(f.current.value)&&++r===u.length&&(isNaN(n.price)||isNaN(n.cond)||(e.socket.emit("addItem",n),e.refreshItems(),console.log("Doda\u0142em akcesoria - socket poszedl")))}}catch(E){s=!0,i=E}finally{try{m||null==p.return||p.return()}finally{if(s)throw i}}e.handleModal("add")},className:"addItemForm"},r.a.createElement("p",null,r.a.createElement("input",{placeholder:"Nazwa",ref:a,autoFocus:!0,required:!0})),r.a.createElement("p",null,r.a.createElement("input",{placeholder:"Rozmiar",ref:l,required:!0})),r.a.createElement("p",null,r.a.createElement("input",{placeholder:"Cena",ref:c,required:!0})),r.a.createElement("p",null,r.a.createElement("input",{placeholder:"Stan",ref:o,required:!0})),r.a.createElement("p",null,r.a.createElement("button",{type:"submit",className:"addButton",value:"Submit"},"Dodaj"))))};var v=function(e){var t=Object(n.useState)(1),a=Object(o.a)(t,2),l=a[0],c=a[1];return r.a.createElement("div",{className:"addItemContainer"},r.a.createElement("div",{className:"itemType"},r.a.createElement("input",{type:"radio",name:"itemTypeRadio",id:"clothes",value:"clothes",onChange:function(){return c(1)},defaultChecked:!0}),r.a.createElement("label",{htmlFor:"clothes"},r.a.createElement("img",{src:"https://hypehub.s3.eu-central-1.amazonaws.com/img/shirt.png",alt:"Item clothes",className:"itemIcon",id:"clothesIcon"})),r.a.createElement("input",{type:"radio",name:"itemTypeRadio",id:"shoes",value:"shoes",onChange:function(){return c(2)}}),r.a.createElement("label",{htmlFor:"shoes"},r.a.createElement("img",{src:"https://hypehub.s3.eu-central-1.amazonaws.com/img/shoe.png",alt:"Item shoes",className:"itemIcon",id:"shoeIcon"})),r.a.createElement("input",{type:"radio",name:"itemTypeRadio",id:"accessories",value:"3",onChange:function(){return c(3)}}),r.a.createElement("label",{htmlFor:"accessories"},r.a.createElement("img",{src:"https://hypehub.s3.eu-central-1.amazonaws.com/img/accessories.png",alt:"Item Accessories",className:"itemIcon",id:"hatIcon"}))),function(t){switch(t){case 1:return r.a.createElement(E,{userID:e.userID,itemType:t,socket:e.socket,refreshItems:e.refreshItems,handleModal:function(){return e.handleModal("add")}});case 2:return r.a.createElement(f,{userID:e.userID,itemType:t,socket:e.socket,refreshItems:e.refreshItems,handleModal:function(){return e.handleModal("add")}});case 3:return r.a.createElement(h,{userID:e.userID,itemType:t,socket:e.socket,refreshItems:e.refreshItems,handleModal:function(){return e.handleModal("add")}});default:return r.a.createElement(E,{userID:e.userID,itemType:t,socket:e.socket,refreshItems:e.refreshItems,handleModal:function(){return e.handleModal("add")}})}}(l))};m.a.setAppElement("#root");var b=function(e){var t=Object(n.useState)(!1),a=Object(o.a)(t,2),l=a[0],c=a[1],u=Object(n.useState)(!1),s=Object(o.a)(u,2),i=s[0],d=s[1],p=e.socket;function f(e){"add"===e?c(!l):d(!i)}return r.a.createElement("div",{className:"noteMenu"},r.a.createElement("button",{className:"noteButton",id:"noteMenuButton",onClick:function(){return f("add")}},"Dodaj"),r.a.createElement("button",{className:"noteButton",id:"noteMenuButton",onClick:e.deleteMode},"Usun"),r.a.createElement("button",{className:"noteButton",id:"noteMenuButton"},"Modyfikuj"),r.a.createElement(m.a,{isOpen:l,className:"modalContent",overlayClassName:"modalOverlay",onRequestClose:function(){return f("add")}},r.a.createElement(v,{socket:p,userID:e.userID,refreshItems:e.refreshItems,handleModal:f})))};var I=function(e){var t=e.socket,a=Object(n.useState)(!1),l=Object(o.a)(a,2),c=l[0],u=l[1],m=Object(n.useState)(),s=Object(o.a)(m,2),i=s[0],d=s[1];return Object(n.useEffect)((function(){!c&&t.emit("getItem",e.itemID,(function(e){d(e[0]),u(!0)}))})),c&&r.a.createElement("div",{className:"itemInfoContainer"},r.a.createElement("div",{className:"itemHeader"},r.a.createElement("p",{id:"itemName"},i.name)),r.a.createElement("div",{className:"itemOptions"},r.a.createElement("p",null,r.a.createElement("button",null,"Skopiuj opis")),r.a.createElement("p",null,r.a.createElement("button",null,"Zdjecie z opisem")),r.a.createElement("p",null,r.a.createElement("button",null,"Zdjecie bez opisu"))),r.a.createElement("div",{className:"itemPhotos"},r.a.createElement("img",{src:"https://hypehub.s3.eu-central-1.amazonaws.com/items_img/252/1.jpg",alt:"item",className:"itemPhoto"}),r.a.createElement("img",{src:"https://hypehub.s3.eu-central-1.amazonaws.com/items_img/252/2.jpg",alt:"item",className:"itemPhoto"}),r.a.createElement("img",{src:"https://hypehub.s3.eu-central-1.amazonaws.com/items_img/252/3.jpg",alt:"item",className:"itemPhoto"}),r.a.createElement("img",{src:"https://hypehub.s3.eu-central-1.amazonaws.com/items_img/252/4.jpg",alt:"item",className:"itemPhoto"})))},N=a(13),y=a.n(N),j=a(6),g=a(8);var k={Render:function(e){var t=Object(n.useState)(!1),a=Object(o.a)(t,2),l=a[0],c=a[1],u=Object(n.useState)(!1),s=Object(o.a)(u,2),f=s[0],E=s[1],h=Object(n.useState)(0),v=Object(o.a)(h,2),N=v[0],k=v[1],O=e.socket;function S(){c(!l),0==y()(".deleteButton").css("opacity")?(y()(".deleteButton").css("opacity",1),y()(".deleteButton").css("visibility","visible")):(y()(".deleteButton").css("opacity",0),y()("deleteButton").css("visibility","hidden"))}function C(t){O.emit("deleteItem",t.target.id),e.refreshItems(),S()}function z(e){k(e),E(!0)}return r.a.createElement(j.a,null,r.a.createElement("div",{className:"tableContainer"},r.a.createElement("div",{className:"noteTableNavi"},r.a.createElement(j.c,{className:"link naviButton",activeClassName:"active",to:"/note/current"},"Aktualne"),r.a.createElement(j.c,{className:"link naviButton",to:"/note/sold"},"Sprzedane"),r.a.createElement(j.c,{className:"link naviButton",to:"/note/pending"},"Zamowione")),r.a.createElement(g.d,null,r.a.createElement(g.b,{path:"/note/sold"},r.a.createElement("div",{className:"itemsInfo",id:"soldColumns"},r.a.createElement("span",null,"Nazwa"),r.a.createElement("span",null,"Rozmiar"),r.a.createElement("span",null,"Stan"),r.a.createElement("span",null,"Cena kupna"),r.a.createElement("span",null,"Profit"))),r.a.createElement(g.b,{path:"/"},r.a.createElement("div",{className:"itemsInfo",id:"currentColumns"},r.a.createElement("span",null,"Nazwa"),r.a.createElement("span",null,"Rozmiar"),r.a.createElement("span",null,"Stan"),r.a.createElement("span",null,"Cena kupna"),r.a.createElement("span",null,"Sprzedaj")))),r.a.createElement("div",{className:"noteContent"},r.a.createElement(g.d,null,r.a.createElement(g.b,{path:"/note/sold"},r.a.createElement(d,{items:e.soldItems,deleteItem:C,itemInfo:function(e){return z(e)}})),r.a.createElement(g.b,{path:"/note/pending"},r.a.createElement(p,null)),r.a.createElement(g.b,{path:"/"},r.a.createElement(i,{socket:O,itemInfo:function(e){return z(e)},items:e.currentItems,deleteItem:C,refreshItems:e.refreshItems})))),r.a.createElement(b,{socket:O,userID:e.userID,deleteMode:S,refreshItems:e.refreshItems}),r.a.createElement(m.a,{isOpen:f,className:"modalContent",overlayClassName:"modalOverlay",onRequestClose:function(){return E(!1)}},r.a.createElement(I,{socket:O,handleModal:function(){E(!f)},itemID:N}))))}};var O=function(){return r.a.createElement("div",{className:"resellContainer"},r.a.createElement("div",{className:"tableContainer"},r.a.createElement("p",null,"jeszcze nie gotowe")))};var S=function(e){var t=Object(n.useState)(!1),a=Object(o.a)(t,2),l=a[0],c=a[1],u=e.socket,m=Object(n.useRef)(),s=Object(n.useRef)(),i=[m,s];return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"loginBox",id:"loginBox",onSubmit:function(t){t.preventDefault();var a={id:null,username:m.current.value,password:s.current.value},n=0,r=!0,l=!1,o=void 0;try{for(var d,p=i[Symbol.iterator]();!(r=(d=p.next()).done);r=!0){var f=d.value;/^[a-zA-Z0-9 ]+$/.test(f.current.value)&&++n===i.length&&u.emit("login",a)}}catch(E){l=!0,o=E}finally{try{r||null==p.return||p.return()}finally{if(l)throw o}}u.on("success",(function(t){e.handleLogin(t),localStorage.setItem("token",t.token),localStorage.setItem("id",t.id)})),u.on("failed",(function(e){c(!0)}))}},r.a.createElement("form",null,l&&r.a.createElement("label",null,"Login lub haslo nieprawidlowe"),r.a.createElement("input",{placeholder:"Login",ref:m,autoFocus:!0,required:!0}),r.a.createElement("input",{type:"password",placeholder:"Haslo",ref:s,required:!0}),r.a.createElement("button",{type:"submit",className:"menuButton"},"Zaloguj"))))},C=(a(68),a(48)),z=a.n(C)()("https://hypehub-js.herokuapp.com"),D={},R=localStorage.getItem("token"),w=localStorage.getItem("id");var B=function(){var e=Object(n.useState)(!1),t=Object(o.a)(e,2),a=(t[0],t[1]),l=Object(n.useState)([]),c=Object(o.a)(l,2),u=c[0],m=c[1],s=Object(n.useState)([]),i=Object(o.a)(s,2),d=i[0],p=i[1],f=Object(n.useState)((function(){z.emit("checkLog",R,w),z.on("success",(function(e){D=e,b(),v(!0)})),z.on("failed",(function(){v(!1)}))})),E=Object(o.a)(f,2),h=E[0],v=E[1];function b(){z.emit("getCurrentItems",(function(e){m(e)})),z.emit("getSoldItems",(function(e){p(e)})),a(!0),console.log("refreshed items")}return r.a.createElement(j.a,null,r.a.createElement("div",{className:"App",id:"root"},r.a.createElement("link",{href:"https://fonts.googleapis.com/css?family=Assistant:400,700&display=swap",rel:"stylesheet"}),h?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"userInfo"},r.a.createElement("p",null,"Zalogowano jako ",D.username),r.a.createElement("p",{className:"naviElement"},"Moje konto"),r.a.createElement("p",{className:"naviElement",onClick:function(){v(!1),localStorage.removeItem("id"),localStorage.removeItem("token")}},"Wyloguj")),r.a.createElement("div",{className:"navigation"},r.a.createElement(j.b,{className:"topMenu link naviElement",to:"/"},"NOTE"),r.a.createElement(j.b,{className:"topMenu link naviElement",to:"bulk"},"BULK")),r.a.createElement(g.d,null,r.a.createElement(g.b,{path:"/bulk"},r.a.createElement(O,null)),r.a.createElement(g.b,{path:"/"},r.a.createElement(k.Render,{socket:z,currentItems:u,soldItems:d,refreshItems:b,userID:D.id})),r.a.createElement(g.a,{to:"/"}))):r.a.createElement(r.a.Fragment,null,r.a.createElement(g.b,{path:"/home"},r.a.createElement(S,{handleLogin:function(e){return function(e){D=e,b(),v(!0)}(e)},socket:z})),r.a.createElement(g.a,{to:"/home"}))))};c.a.render(r.a.createElement(B,null),document.getElementById("root"))},49:function(e,t,a){e.exports=a(100)},54:function(e,t,a){},55:function(e,t,a){},68:function(e,t,a){},97:function(e,t){}},[[49,1,2]]]);
//# sourceMappingURL=main.6b25186b.chunk.js.map