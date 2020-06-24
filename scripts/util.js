let eleID = id => document.getElementById(id);

let eleCls = cls => document.getElementsByClassName(cls);

let set_style = (elem, styles) => Object.assign(elem.style, styles);

let crtEle = ele => document.createElement(ele)

let addStyel = (ele,style)=> ele.classList.add(style) 

let eleQRY = qry => document.querySelector(qry)



export{
    eleID,eleCls,set_style,crtEle,addStyel,eleQRY
}