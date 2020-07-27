import * as Util from './util.js'
import { generateGrid, handleDraw } from './grid.js'
import { seachPath, setFoundDist, animreset } from './algorithm.js'
import { help ,showinformation, setwarning, resetNotice} from './help.js'

let START
let DESTINATION
let NODES = []
let listeners
let m_events
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
        Util.set_style(container,{display:'grid'})
        setTimeout(()=>{
            Util.set_style(container,{opacity:1})
        },10)
    },50);
})

function setNodeSize() {
    let NODE_SIZE, heightbalance
    if (window.innerWidth < 768) {
        NODE_SIZE = 12
        heightbalance = 110
    }
    else {
        NODE_SIZE = 17   // lowest  14 heighst 21
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
        walldrawable: walldrawable //currently not used
    }
    // console.log(points.walldrawable)
    container.addEventListener('mousedown', selection)


    function selection(e) {
        if (!points.startSelected && !e.target.iswall) {
            Util.set_style(e.target, {border: '1px solid var(--path-color)',
                backgroundImage:`url('./icons/start.svg')` })
            
            points.startSelected = true
            START = e.target.id
            click.play()
            return
        }
        if (points.startSelected && !points.endSelected && !e.target.iswall && e.target !== NODES[START]) {
                Util.set_style(e.target, {border: '1px solid var(--path-color)',
                    backgroundImage:`url('./icons/destination.svg')`})
               
                points.endSelected = true
                points.walldrawable = true
                DESTINATION = e.target.id
                console.log('START:', NODES[START].id, "END:", NODES[DESTINATION].id)
                click.play()
                return
        }
    }
    m_events = handleDraw(container, NODES)

    return { selection, m_events }

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
        if (listeners.m_events != undefined) {
        
            container.removeEventListener('mouseover', listeners.m_events.mouseHoverDrawWall_Pc)
            container.removeEventListener('touchmove', listeners.m_events.mouseHoverDrawWall_Phn)
            window.removeEventListener('mousedown', listeners.m_events.mousePressDrawWall_Pc_Phn)
            window.removeEventListener('mouseup', listeners.m_events.mouseNotPressed_Pc_Phn)
            window.removeEventListener('touchstart', listeners.m_events.TouchStart_Phn)
            window.removeEventListener('touchend', listeners.m_events.mouseNotPressed_Pc_Phn)
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




