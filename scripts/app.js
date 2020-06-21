import * as Util from './util.js'
import { generateGrid, handleDraw } from './grid.js'
import {apply} from './disktra.js'
// import {apply} from './disktra2.js'


let START = 0
let DESTINATION = 0

// initializing....
const container = Util.eleQRY('.container')
const algo_btn = Util.eleQRY('.algo')

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

let NODES = generateGrid(container, NODE_SIZE)
console.log(NODES.length)

function selectStartToEnd() {
    let points = {
        startSelected: false,
        endSelected: false,
        walldrawable: false
    }
    container.addEventListener('mousedown', e => {
        // console.log(points.startSelected,points.endSelected)
        if (!points.startSelected) {
            Util.set_style(e.target, { backgroundColor: 'rgba(40,53,147 ,1)' })
            points.startSelected = true
            START = e.target.id
            return
        }
        if (points.startSelected && !points.endSelected) {
            Util.set_style(e.target, { backgroundColor: 'rgba(67,160,71 ,1)' })
            points.endSelected = true
            points.walldrawable = true
            DESTINATION = e.target.id
            console.log(NODES[START].id, NODES[DESTINATION].id)
            return
        }
        if (points.walldrawable) handleDraw(NODES)
    })
}
selectStartToEnd()


algo_btn.addEventListener('click', () => {
    console.log(START, DESTINATION)
    NODES[START].dist = 0
    apply(START)
})



















export { START, DESTINATION ,NODES}




