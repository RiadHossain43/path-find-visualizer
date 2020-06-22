import * as Util from './util.js'
import { START, DESTINATION, NODES } from './app.js'

let found
let FOUND_DEST = false
let t = 0
let ANIM_Fineshed = false

const output = Util.eleQRY('.output')

function relaxNode(i, neighbours) {

    for (let j = 0; j < neighbours.length; j++) {
        if (NODES[i].dist + 1 <= neighbours[j].dist) {
            neighbours[j].dist = NODES[i].dist + 1
            // neighbours[j].innerHTML = `${neighbours[j].dist}`
        }
    }
    NODES[i].relaxed = true
    // if (NODES[i] !== NODES[START] && NODES[i] !== NODES[DESTINATION]) Util.set_style(NODES[i], { backgroundColor: 'rgba(30,136,229 ,1)' })
    if (NODES[i] !== NODES[START]) setTimeout(()=>{
        if(NODES[i]== NODES[DESTINATION]){
            findTrack(found)
            return
        }
        Util.set_style(NODES[i], { backgroundColor: 'rgba(30,136,229 ,1)',animation:'relax .35s ease' })

    },t+1000) 
    t+=1
    
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

function sort_by_dist_1() {
    let neighbours = []
        for (let i = 0; i < NODES.length; i++) {
            if(NODES[i].relaxed) continue
            for (let j = i + 1; j < NODES.length; j++) {
                if(NODES[j].relaxed) continue
                if (NODES[i].dist > NODES[j].dist) {
                    neighbours.push(NODES[j])
                }
            }
        }
        return neighbours
}

  
function findTrack(node) {
    let neighbours = getNeighbourAll(node.id)

    let neighbours_dist = sort_by_dist(neighbours)

    let nextNode = neighbours_dist.shift()

    Util.set_style(nextNode, { backgroundColor: 'yellow' })
    // setTimeout(()=>{
    //     Util.set_style(nextNode, { backgroundColor: 'yellow' })   
    // },t+1000)
    // t+=50
    if (nextNode.dist == 1) {
        return
    }
    findTrack(nextNode)
}

function getNeighbour(i) {
    let neighbours = []
    for (let j = 0; j < NODES.length; j++) {
        if ((NODES[j].row == NODES[i].row - 1 && NODES[j].col == NODES[i].col - 1) ||
            (NODES[j].row == NODES[i].row + 1 && NODES[j].col == NODES[i].col + 1) ||
            (NODES[j].row == NODES[i].row - 1 && NODES[j].col == NODES[i].col + 1) ||
            (NODES[j].row == NODES[i].row + 1 && NODES[j].col == NODES[i].col - 1) ||
             NODES[j].relaxed || NODES[j].iswall) //NODES[j].relaxed ||
            continue
        if (NODES[j].row >= NODES[i].row - 1 &&
            NODES[j].row <= NODES[i].row + 1 &&
            NODES[j].col >= NODES[i].col - 1 &&
            NODES[j].col <= NODES[i].col + 1
        ) {
            neighbours.push(NODES[j])
            // setTimeout(()=>{
            //     Util.set_style(NODES[j], { backgroundColor: 'white'})

            // },t+1000) 
            // t+=.4
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



// function apply(inp) {
//     let neighbours = getNeighbour(inp)
//     neighbours = relaxNode(inp, neighbours)
//     // let neighbours_dist = sort_by_dist(neighbours)
//     let neighbours_dist = sort_by_dist_1()
//     let nextNode
//     while (neighbours_dist.length && !FOUND_DEST) {
//         nextNode = neighbours_dist.shift()
//         if (nextNode.id == DESTINATION) {
//             FOUND_DEST = true
//             found = nextNode
//             console.log(found.dist)
//             output.innerHTML = `MINIMUM DISTANCE:${found.dist}`
//             found.innerHTML = `${found.dist}`
//             findTrack(found)
//             return
//         }
//         if(FOUND_DEST) return

//         apply(nextNode.id)

//     }
// }


function apply(inp) {
    let neighbours = getNeighbour(inp)
    neighbours = relaxNode(inp, neighbours)
    
    let nextNode = getMin()
    if(nextNode==undefined) return
    if (nextNode.id == DESTINATION) {
        neighbours = getNeighbour(nextNode.id)
        neighbours = relaxNode(nextNode.id, neighbours)
        FOUND_DEST = true
        found = nextNode
        console.log(found.dist)
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
if(ANIM_Fineshed) findTrack(found)



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



export { apply }
