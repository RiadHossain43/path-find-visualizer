import * as Util from './util.js'
import { START, DESTINATION, NODES } from './app.js'

let found
let FOUND_DEST
let time
let timeouts = []
const output = Util.eleQRY('.output')
// let path = new Util.sound('./sounds/spread.mp3')
let inc

if (window.innerWidth < 768) inc = 20
else inc = 6

function relaxNode(i, neighbours) {
    let tid
    for (let j = 0; j < neighbours.length; j++) {
        if (NODES[i].dist + 1 <= neighbours[j].dist) {
            neighbours[j].dist = NODES[i].dist + 1
        }
    }
    NODES[i].relaxed = true

    if (NODES[i] !== NODES[START]) tid = setTimeout(() => {
        if (NODES[i] == NODES[DESTINATION]) {
            findTrack(found)
            return
        }
        Util.set_style(NODES[i], { backgroundColor:'var(--search-path-color)', //rgba(30,136,229 ,1)
         animation: 'relax var(--ralax-anim-duration) ease', borderLeft: '1px solid var(--search-path-border)',
         borderTop: '1px solid var(--search-path-border)'})

    }, time + 100)
    time += inc
    timeouts.push(tid)
    return neighbours
}

function animreset() {
    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(i)
    }
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
function pathError() {
    if (!FOUND_DEST) {
        setTimeout(() => {
            let patherror = Util.eleQRY('.path-error')
            Util.set_style(patherror, { display: 'block', opacity: 0 })
            setTimeout(() => {
                Util.set_style(patherror, { opacity: 1 })
            }, 10)
            setTimeout(() => {
                Util.set_style(patherror, { opacity: 0 })
                setTimeout(() => {
                    Util.set_style(patherror, { display: 'none' })
                }, 550)
            }, 2500)
        },time+800)
    }
}

function getMin() {
    let MINNODE
    let min = Infinity
    for (let i = 0; i < NODES.length; i++) {
        if (NODES[i].dist <= min && !NODES[i].relaxed) {
            min = NODES[i].dist
            MINNODE = NODES[i]
        }
    }
    if (min === Infinity) MINNODE = undefined
    return MINNODE
}

function getNeighbour(i) {
    let neighbours = []
    for (let j = 0; j < NODES.length; j++) {
        if ((NODES[j].row == NODES[i].row - 1 && NODES[j].col == NODES[i].col - 1) ||
            (NODES[j].row == NODES[i].row + 1 && NODES[j].col == NODES[i].col + 1) ||
            (NODES[j].row == NODES[i].row - 1 && NODES[j].col == NODES[i].col + 1) ||
            (NODES[j].row == NODES[i].row + 1 && NODES[j].col == NODES[i].col - 1) ||
            NODES[j].relaxed || NODES[j].iswall) continue
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
    // Util.set_style(nextNode, { backgroundColor:`var(--path-color)`, border: `1px solid var(--path-color)`,
    //                 animation:`path .5s ease` })
    setTimeout(()=>{
        Util.set_style(nextNode, { backgroundColor:`var(--path-color)`, border: `1px solid var(--path-color)`,
                    animation:`path .5s ease` })
    },nextNode.id)
    if (nextNode.dist == 1) {
        return
    }
    findTrack(nextNode)
}
function setFoundDist(t, bool) {
    time = t
    FOUND_DEST = bool
    // output.innerHTML = `MINIMUM DISTANCE:<span style="
    //                         color:white;
    //                         font-size:1rem;
    //                         background-color:#3F51B5;
    //                         border-radious: 3px;
    //                         padding:.5rem;
    //                         margin:.3rem;
    //                         ">${0}</span>`
}

function apply(inp) {
    // console.log('start')

    let neighbours = getNeighbour(inp)
    neighbours = relaxNode(inp, neighbours)

    let nextNode = getMin()

    if (nextNode == undefined) return
    if (nextNode.id == DESTINATION) {
        neighbours = getNeighbour(nextNode.id)
        neighbours = relaxNode(nextNode.id, neighbours)
        FOUND_DEST = true
        found = nextNode
        console.log("MIN DIST:", found.dist)
        // output.innerHTML = `MINIMUM DISTANCE:<span style="
        //                     color:white;
        //                     font-size:1rem;
        //                     background-color:#3F51B5;
        //                     border-radious: 3px;
        //                     padding:.5rem;
        //                     margin:.3rem;
        //                     ">${found.dist}</span>`
        // found.innerHTML = `${found.dist}`

        return
    }
    if (FOUND_DEST) return
    apply(nextNode.id)
}

function seachPath(inp) {
    apply(inp)
    pathError()
}

export { seachPath, setFoundDist, animreset }
