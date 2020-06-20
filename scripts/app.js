import * as Util from './util.js'
import { generateGrid, handleDraw } from './grid.js'

let START = 0
let DESTINATION = 0
let found = null
// initializing....
const container = Util.eleQRY('.container')
const algo_btn = Util.eleQRY('.algo')
const output = Util.eleQRY('.output')

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

function selectStartToEnd() {
    let points = {
        startSelected: false,
        endSelected: false,
        walldrawable: false
    }
    container.addEventListener('mousedown', e => {
        // console.log(points.startSelected,points.endSelected)
        if (!points.startSelected) {
            Util.set_style(e.target, { backgroundColor: 'violet' })
            points.startSelected = true
            START = e.target.id
            return
        }
        if (points.startSelected && !points.endSelected) {
            Util.set_style(e.target, { backgroundColor: 'red' })
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

const RELAXED = []

function sort_by_dist(neighbours){
    for(let i =0 ;i<neighbours.length;i++){
        for(let j=i+1;j<neighbours.length;j++){
            if(neighbours[i].dist>neighbours[j].dist){
                let temp = neighbours[i]
                neighbours[i]=neighbours[j]
                neighbours[j]=temp
            }
        }
    }
    return neighbours
}

function printNeighbours(nei){
    for(let i =0 ;i<nei.length;i++)
        console.log('loop',nei[i].dist)
}

function apply(inp) {
    let neighbours = getNeighbour(inp)
    neighbours = relaxNode(inp, neighbours)
    let neighbours_dist = sort_by_dist(neighbours)
    // console.log(neighbours_dist)
    let nextNode
    while(neighbours_dist.length && !found){
        nextNode = neighbours_dist.shift()
        if (nextNode.id == DESTINATION) {
            found = nextNode
            console.log(found.dist)
            output.innerHTML = `${found.dist}`
            found.innerHTML = `${found.dist}`
            return found
        }
        if (RELAXED.length >= NODES.length) {
            // console.log('fault')
            return
        }
        apply(nextNode.id)
    }
    return
    // if (neighbours_dist.length) {   
    // }
}


function getNeighbour(i) {
    let neighbours = []
    for (let j = 0; j < NODES.length; j++) {
        if ((NODES[j].row == NODES[i].row && NODES[j].col == NODES[i].col) || NODES[j].relaxed) continue
        if (NODES[j].row >= NODES[i].row - 1 &&
            NODES[j].row <= NODES[i].row + 1 &&
            NODES[j].col >= NODES[i].col - 1 &&
            NODES[j].col <= NODES[i].col + 1
        ) {
            neighbours.push(NODES[j])
        }
    }
    return neighbours
}


function relaxNode(i, neighbours) {

    for (let j = 0; j < neighbours.length; j++) {
        if (NODES[i].dist + 1 < neighbours[j].dist) {
            neighbours[j].dist = NODES[i].dist + 1
            // neighbours[j].innerHTML =`${neighbours[j].dist}`
            if (j == neighbours.length - 1) continue

        }
    }
    NODES[i].relaxed = true
    if(NODES[i]!==NODES[START])Util.set_style(NODES[i],{backgroundColor:'blue'})
    RELAXED.push(NODES[i])
    return neighbours
}
algo_btn.addEventListener('click', () => {
    console.log(START, DESTINATION)
    NODES[START].dist = 0
    apply(START)
})
export { START, DESTINATION }

