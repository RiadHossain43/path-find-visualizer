import * as Util from './util.js'
import { generateGrid, handleDraw } from './grid.js'
import { seachPath, setFoundDist, animreset } from './algorithm.js'
import { help ,showinformation, setwarning, resetNotice} from './help.js'
let START
let DESTINATION
let NODES = []
let listeners
let walls
let FOUND_DEST = false

const container = Util.eleQRY('.container')
const buttons = Util.eleCls('btns')
const algo_btn = buttons[0]
const reset_btn = buttons[1]
const logo = Util.eleQRY('.logo img')

let click = new Util.sound('./sounds/fire.mp3')


window.addEventListener('load',()=>{
    setTimeout(() => {
        Util.set_style(logo,{height:'1.8rem'})
    },800);
})

function setNodeSize() {
    let NODE_SIZE, heightbalance
    if (window.innerWidth < 768) {
        NODE_SIZE = 12
        heightbalance = 110
    }
    else {
        NODE_SIZE = 14
        heightbalance = 100
    }
    {
        container.height = Math.floor((window.innerHeight - heightbalance) / NODE_SIZE) * NODE_SIZE
        container.width = Math.floor((window.innerWidth - 10) / NODE_SIZE) * NODE_SIZE
    }
    Util.set_style(container, {
        height: `${container.height}px`, width: `${container.width}px`,
        gridTemplateColumns: `repeat(${Math.floor(container.width / NODE_SIZE)},${NODE_SIZE}px)`,
        gridTemplateRows: `repeat(${Math.floor(container.height / NODE_SIZE)},${NODE_SIZE}px)`,
    })
    container.setAttribute('draggable', false);
    return NODE_SIZE
}
function selectStartToEnd(startSelected, endSelected, walldrawable) {
    let points = {
        startSelected: startSelected,
        endSelected: endSelected,
        walldrawable: walldrawable
    }
    // console.log(points.walldrawable)
    container.addEventListener('mousedown', selection)


    function selection(e) {
        if (!points.startSelected && !e.target.iswall) {
            Util.set_style(e.target, {border: '1px solid var(--path-color)' })
            e.target.style.backgroundImage = `url('./icons/start.svg')`
            points.startSelected = true
            START = e.target.id
            click.play()
            return
        }
        if (points.startSelected && !points.endSelected && !e.target.iswall && e.target !== NODES[START]) {
                Util.set_style(e.target, {border: '1px solid var(--path-color)' })
                e.target.style.backgroundImage = `url('./icons/destination.svg')`
                points.endSelected = true
                points.walldrawable = true
                DESTINATION = e.target.id
                console.log('START:', NODES[START].id, "END:", NODES[DESTINATION].id)
                click.play()
                return
        }
    }
    walls = handleDraw(container, NODES)

    return { selection, walls }

}

function startAlgorithm() {
    algo_btn.addEventListener('click', algoStart)

    function algoStart() {
        click.play()
        console.log(START, DESTINATION)
        if (START != undefined && DESTINATION != undefined) {
            NODES[START].dist = 0
            clearDraw()
            seachPath(START)
        } else setwarning()
    }
    return algoStart
}

function clearNodes() {
    container.innerHTML = ''
}
function clearDraw() {
    if (listeners != undefined) {
        // console.log(listeners.selection, listeners.walls)
        container.removeEventListener('mousedown', listeners.selection)
        if (listeners.walls != undefined) {
            container.removeEventListener('mouseover', listeners.walls.wall1)
            container.removeEventListener('touchmove', listeners.walls.wall2)
            window.removeEventListener('mousedown', listeners.walls.wall3)
            window.removeEventListener('mouseup', listeners.walls.wall4)
            window.removeEventListener('touchstart', listeners.walls.wall5)
            window.removeEventListener('touchend', listeners.walls.wall4)
        }
    }
}

// initializing....
function start() {

    clearNodes()
    clearDraw()
    setFoundDist(0, false)
    help()
    showinformation()
    let NODE_SIZE = setNodeSize()
    NODES = generateGrid(container, NODE_SIZE)

    listeners = selectStartToEnd(false, false, false)
    startAlgorithm(FOUND_DEST)

}
start()

reset_btn.addEventListener('click', () => {
    click.play()
    animreset()
    resetNotice()
    START = DESTINATION = undefined
    start()
})







export { START, DESTINATION, container, NODES }




