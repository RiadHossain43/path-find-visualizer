import * as Util from './util.js'
import { START, DESTINATION, NODES} from './app.js'

let found
let FOUND_DEST 
let time 

const output = Util.eleQRY('.output')
let click = new Util.sound('./sounds/fire.mp3')

function relaxNode(i, neighbours) {

    for (let j = 0; j < neighbours.length; j++) {
        if (NODES[i].dist + 1 <= neighbours[j].dist) {
            neighbours[j].dist = NODES[i].dist + 1
        }
    }
    NODES[i].relaxed = true
    
    if (NODES[i] !== NODES[START]) setTimeout(()=>{
        if(NODES[i]== NODES[DESTINATION]){
            findTrack(found)
            return
        }
        Util.set_style(NODES[i], { backgroundColor: 'rgba(30,136,229 ,1)',animation:'relax .35s ease',border:'1px solid #3F51B5'})

    },time+1000) 
    time+=1

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
function getMin(){
    let MINNODE
    let min = Infinity
    for(let i = 0 ;i<NODES.length;i++){
        if(NODES[i].dist <= min && !NODES[i].relaxed){
            min = NODES[i].dist
            MINNODE = NODES[i]
        }
    }
    if(min===Infinity) MINNODE = undefined
    return MINNODE
}

function getNeighbour(i) {
    let neighbours = []
    for (let j = 0; j < NODES.length; j++) {
        if ((NODES[j].row == NODES[i].row - 1 && NODES[j].col == NODES[i].col - 1) ||
            (NODES[j].row == NODES[i].row + 1 && NODES[j].col == NODES[i].col + 1) ||
            (NODES[j].row == NODES[i].row - 1 && NODES[j].col == NODES[i].col + 1) ||
            (NODES[j].row == NODES[i].row + 1 && NODES[j].col == NODES[i].col - 1) ||
             NODES[j].relaxed || NODES[j].iswall)  continue
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
function getNeighbourAll(i) {
    let neighbours = []
    for (let j = 0; j < NODES.length; j++) {
        if ((NODES[j].row == NODES[i].row - 1 && NODES[j].col == NODES[i].col - 1) ||
            (NODES[j].row == NODES[i].row + 1 && NODES[j].col == NODES[i].col + 1) ||
            (NODES[j].row == NODES[i].row - 1 && NODES[j].col == NODES[i].col + 1) ||
            (NODES[j].row == NODES[i].row + 1 && NODES[j].col == NODES[i].col - 1) ||
            NODES[j].iswall) continue
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
    neighbours = sort_by_dist(neighbours)
    let nextNode = neighbours.shift()
    Util.set_style(nextNode, { backgroundColor: '#283593',border:'1px solid #283593' })
    if (nextNode.dist == 1) {
        return
    }
    findTrack(nextNode)
}
function setFoundDist(t,bool){
    time = t
    FOUND_DEST = bool
}

function apply(inp) {
    // console.log('start')
    click.play()
    let neighbours = getNeighbour(inp)
    neighbours = relaxNode(inp, neighbours)
    
    let nextNode = getMin()
    
    if(nextNode==undefined) return
    if (nextNode.id == DESTINATION) {
        neighbours = getNeighbour(nextNode.id)
        neighbours = relaxNode(nextNode.id, neighbours)
        FOUND_DEST = true
        found = nextNode
        console.log("MIN DIST:",found.dist)
        output.innerHTML = `MINIMUM DISTANCE:<span style="
                            color:white;
                            font-size:1rem;
                            background-color:#3F51B5;
                            border-radious: 3px;
                            padding:.5rem;
                            margin:.3rem;
                            ">${found.dist}</span>`
        // found.innerHTML = `${found.dist}`
        return
    }
    if(FOUND_DEST) return 
    apply(nextNode.id)
}


export { apply ,setFoundDist}
