import * as Util from './util.js'
import { generateGrid,handleDraw } from './grid.js'

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


let NODES = generateGrid(container, NODE_SIZE)
handleDraw(NODES)