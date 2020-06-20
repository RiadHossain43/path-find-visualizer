import * as Util from './util.js'
import {START , DESTINATION} from './app.js'
function generateGrid(container,NODE_SIZE){
    // let c = 0
    let NODE = []
    for(var row = 0;row<container.height/NODE_SIZE;row++){
        for(var col = 0;col<container.width/NODE_SIZE;col++ ){
            let node = Util.crtEle('div')
            {node.row = row ,node.col = col,node.relaxed=false,node.dist=Infinity,node.id= row*container.width/NODE_SIZE+col}
            Util.addStyel(node,'node')
            container.append(node)
            NODE.push(node)
        }
    }
    return NODE
}
function handleDraw(NODES) {
    let mouse = {
        ispressed: false,
    }
    window.addEventListener('mousedown', e => {
        mouse.ispressed = true
        console.log(mouse.ispressed)
         
    })
    window.addEventListener('mouseup', e => {
        mouse.ispressed = false
        console.log(mouse.ispressed)
    })
    for(var i = 0; i<NODES.length; i++){
        let node = NODES[i]
        node.addEventListener('mouseover',()=>{
            if(mouse.ispressed){
                Util.set_style(node, { backgroundColor: 'black' })
            }
        })
        // console.log(node) 
    }
}
export{generateGrid,handleDraw}