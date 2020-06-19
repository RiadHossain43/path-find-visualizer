import * as Util from './util.js'
import { generateGrid,handleDraw } from './grid.js'

// initializing....
const container = Util.eleQRY('.container')
const NODE_SIZE = 20
{
    container.height = Math.floor((window.innerHeight - 50) / NODE_SIZE) * NODE_SIZE
    container.width = Math.floor((window.innerWidth - 20) / NODE_SIZE) * NODE_SIZE
}
Util.set_style(container, {
    height: `${container.height}px`, width: `${container.width}px`,
    gridTemplateColumns: `repeat(${Math.floor(container.width / NODE_SIZE)},${NODE_SIZE}px)`,
    gridTemplateRows: `repeat(${Math.floor(container.height / NODE_SIZE)},${NODE_SIZE}px)`,
})



const NODES = generateGrid(container, NODE_SIZE)

function selectStartToEnd(){
    let points = {
        startSelected:false,
        endSelected:false,
        walldrawable:false
    }
    window.addEventListener('mousedown',e=>{
        console.log(points.startSelected,points.endSelected)
        if(!points.startSelected){
            Util.set_style(e.target,{backgroundColor:'violet'})
            points.startSelected = true
            return
        }
        if(points.startSelected && !points.endSelected){
            Util.set_style(e.target,{backgroundColor:'red'})
            points.endSelected = true
            points.walldrawable = true
            return
        }
        if(points.walldrawable) handleDraw(NODES)
    })
}
selectStartToEnd()
