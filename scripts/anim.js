import * as Util from './util.js'
const buttons = Util.eleQRYAll('button')
// console.log(buttons)

buttons.forEach(btn => {
    btn.addEventListener('click',function(e){
        let X = e.clientX - e.target.offsetLeft
        let Y = e.clientY - e.target.offsetTop
        // console.log(X,Y)
        let ripples = Util.crtEle('span')
        Util.addStyel(ripples,'ripple')
        Util.set_style(ripples,{left:`${X}px`,top:`${Y}px`})
        this.appendChild(ripples)
        setTimeout(()=>{
            ripples.remove()
        },500)
    })
});