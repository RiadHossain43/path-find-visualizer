import * as Util from './util.js'
import { START, DESTINATION } from './app.js'
function generateGrid(container, NODE_SIZE) {
    let NODE = []
    for (var row = 0; row < container.height / NODE_SIZE; row++) {
        for (var col = 0; col < container.width / NODE_SIZE; col++) {
            let node = Util.crtEle('div')

            {
                node.row = row, node.col = col,
                    node.relaxed = false, node.dist = Infinity,
                    node.id = row * container.width / NODE_SIZE + col,
                    node.iswall = false
            }
            Util.addStyel(node, 'node')
            container.append(node)
            NODE.push(node)
        }
    }
    return NODE
}
function drawAble(container, NODES, mouse) {
    if (window.innerWidth > 768) {

        container.addEventListener('mouseover', (e) => {
            let ele
            ele = document.elementFromPoint(e.clientX, e.clientY)
            if ((mouse.ispressed) && ele != NODES[START] && ele != NODES[DESTINATION] && ele.classList.contains('node')) {
                Util.set_style(ele, { backgroundColor: 'black',border:'1px solid black',animation:'wall .5s ease'})
                ele.iswall = true
            }
            // makeWall(e,mouse,NODES)
        })

    } else {
        container.addEventListener('touchmove', (e) => {
            let ele
            ele = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
            if ((mouse.ispressed) && ele != NODES[START] && ele != NODES[DESTINATION] && ele.classList.contains('node')) {
                Util.set_style(ele, { backgroundColor: 'black',border:'1px solid black',animation:'wall .5s ease'})
                ele.iswall = true
            }
            // makeWall(e,mouse,NODES)
        })
    }
}
// function makeWall(e,mouse,NODES){
//     let ele
//     ele = document.elementFromPoint(e.clientX, e.clientY)
//         if ((mouse.ispressed) && (ele != NODES[START] || ele != NODES[DESTINATION]) && ele.classList.contains('node')) {
//             Util.set_style(ele, { backgroundColor: 'black' })
//             ele.iswall = true
//         }
// }
function handleDraw(container, NODES) {
    let mouse = {
        ispressed: false,
    }
    window.addEventListener('mousedown', e => {
        mouse.ispressed = true
        console.log("MuseDown:", mouse.ispressed)

        let ele
        ele = document.elementFromPoint(e.clientX, e.clientY)
        if ((mouse.ispressed) && (ele != NODES[START] || ele != NODES[DESTINATION]) && ele.classList.contains('node')) {
            Util.set_style(ele, { backgroundColor: 'black',border:'1px solid black',animation:'wall .5s ease'})
            ele.iswall = true
        }
        // makeWall(e,mouse,NODES)
    })
    window.addEventListener('mouseup', e => {

        mouse.ispressed = false
        console.log("MuseDown:", mouse.ispressed)

    })
    window.addEventListener('touchstart', e => {

        mouse.ispressed = true
        console.log("MuseDown:", mouse.ispressed)

    })
    window.addEventListener('touchend', e => {

        mouse.ispressed = false
        console.log("MuseDown:", mouse.ispressed)

    })
    drawAble(container, NODES, mouse)
}
export { generateGrid, handleDraw }