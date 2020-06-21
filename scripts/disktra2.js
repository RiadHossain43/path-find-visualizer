import * as Util from './util.js'
import { START, DESTINATION,NODES } from './app.js'

let found
let FOUND_DEST = false
let t = 0
let RELAXED = []
const output = Util.eleQRY('.output')


function apply(inp) {
    let neighbours = getNeighbour(inp)
    neighbours = relaxNode(inp, neighbours)
    let neighbours_dist = sort_by_dist(neighbours)

    let nextNode
    while (neighbours_dist.length && !found) {
        nextNode = neighbours_dist.shift()
        if (nextNode.id == DESTINATION) {
            FOUND_DEST = true
            found = nextNode
            console.log(found.dist)
            output.innerHTML = `${found.dist}`
            found.innerHTML = `${found.dist}`
            findTrack(found)
            return found
        }
        if (RELAXED.length >= NODES.length) {
            return
        }
        // if(FOUND_DEST) return
        apply(nextNode.id)
    }
}


function relaxNode(i, neighbours) {
    for (let j = 0; j < neighbours.length; j++) {
        if (NODES[i].dist + 1 <= neighbours[j].dist) {
            neighbours[j].dist = NODES[i].dist + 1
            neighbours[j].innerHTML = `${neighbours[j].dist}`
    
        }
    }
    
    NODES[i].relaxed = true
    // if (NODES[i] !== NODES[START] && NODES[i] !== NODES[DESTINATION]) Util.set_style(NODES[i], { backgroundColor: 'rgba(30,136,229 ,1)' })
    if (NODES[i] !== NODES[START] && NODES[i] !== NODES[DESTINATION]) setTimeout(()=>{
        Util.set_style(NODES[i], { backgroundColor: 'blue' })
        
    },t+1000) 
    t+=40
    RELAXED.push(NODES[i])
    console.log(RELAXED.length)
    return neighbours
}

function sort_by_dist(neighbours) {
    for (let i = 0; i < neighbours.length; i++) {
        for (let j = i + 1; j < neighbours.length; j++) {
            if (neighbours[i].dist > neighbours[j].dist) {
                let temp = neighbours[i]
                neighbours[i] = neighbours[j]
                neighbours[j] = temp
            }
        }
    }
    return neighbours
}


function getNeighbour(i) {
    let neighbours = []
    for (let j = 0; j < NODES.length; j++) {
        if ((NODES[j].row == NODES[i].row && NODES[j].col == NODES[i].col) || NODES[j].relaxed || NODES[j].iswall) continue
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
function findTrack(node) {
    let neighbours = getNeighbourAll(node.id)

    let neighbours_dist = sort_by_dist(neighbours)

    let nextNode = neighbours_dist.shift()
    
    Util.set_style(nextNode, { backgroundColor: 'yellow' })
    if (nextNode.dist == 1) {
        return
    }
    findTrack(nextNode)
}
function getNeighbourAll(i) {
    let neighbours = []
    for (let j = 0; j < NODES.length; j++) {
        if ((NODES[j].row == NODES[i].row && NODES[j].col == NODES[i].col) || NODES[j].iswall) continue
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


export {apply}