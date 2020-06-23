import * as Util from './util.js'
import { generateGrid, handleDraw } from './grid.js'
import { apply } from './algorithm.js'
import { help } from './help.js'
let START = 0
let DESTINATION = 0
let NODES

const container = Util.eleQRY('.container')
const buttons = Util.eleCls('btns')
const algo_btn = buttons[0]
const reset_btn = buttons[1]

function setNodeSize() {
    let NODE_SIZE
    if (window.innerWidth < 768) NODE_SIZE = 12
    else NODE_SIZE = 15
    {
        container.height = Math.floor((window.innerHeight - 50) / NODE_SIZE) * NODE_SIZE
        container.width = Math.floor((window.innerWidth - 20) / NODE_SIZE) * NODE_SIZE
    }
    Util.set_style(container, {
        height: `${container.height}px`, width: `${container.width}px`,
        gridTemplateColumns: `repeat(${Math.floor(container.width / NODE_SIZE)},${NODE_SIZE}px)`,
        gridTemplateRows: `repeat(${Math.floor(container.height / NODE_SIZE)},${NODE_SIZE}px)`,
    })
    return NODE_SIZE
}
function selectStartToEnd() {
    let points = {
        startSelected: false,
        endSelected: false,
        walldrawable: false
    }
    container.addEventListener('mousedown', e => {
        if (!points.startSelected) {
            Util.set_style(e.target, { backgroundColor: '#E91E63' })
            e.target.innerHTML = 'S'
            points.startSelected = true
            START = e.target.id
            return
        }
        if (points.startSelected && !points.endSelected) {
            if (e.target !== NODES[START]) {
                Util.set_style(e.target, { backgroundColor: '#EF6C00' })
                e.target.innerHTML = 'E'
                points.endSelected = true
                points.walldrawable = true
                DESTINATION = e.target.id
                console.log(NODES[START].id, NODES[DESTINATION].id)
                return
            }
        }
        if (points.walldrawable) handleDraw(container, NODES)
    })
}
function startAlgorithm() {
    algo_btn.addEventListener('click', () => {
        console.log(START, DESTINATION)
        NODES[START].dist = 0
        apply(START)
    })
}

// initializing....
function start() {
    START = 0
    DESTINATION = 0
    help()
    let NODE_SIZE = setNodeSize()
    NODES = generateGrid(container, NODE_SIZE)
    console.log(NODES.length)
    selectStartToEnd()
    startAlgorithm()

}
start()
// reset_btn.addEventListener('click',()=>{
//     start()
// })







export { START, DESTINATION, NODES }




