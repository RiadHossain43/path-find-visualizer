import * as Util from './util.js'

const how = Util.eleQRY('.how') 
const instructions = Util.eleQRY('.instructions')
const back = Util.eleQRY('.back')
 function help(){
    how.addEventListener('click',()=>{
        Util.set_style(instructions,{display:'block',opacity:0})
        setTimeout(()=>{
            Util.set_style(instructions,{opacity:1,height:'90%'})
        },10)
    })
    back.addEventListener('click',()=>{
        Util.set_style(instructions,{height:'0%',opacity:0})
        setTimeout(()=>{
            Util.set_style(instructions,{display:'none'})
        },200)
    })
}
export {help}