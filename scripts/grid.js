import * as Util from './util.js'
import { START, DESTINATION } from './app.js'
function generateGrid(container, NODE_SIZE) {
    let NODE = []
    let t
    for (var row = 0; row < container.height / NODE_SIZE; row++) {
        for (var col = 0; col < container.width / NODE_SIZE; col++) {
            let node = Util.crtEle('div')
            node.setAttribute('draggable', false)
            {
                node.row = row, node.col = col,
                    node.relaxed = false, node.dist = Infinity,
                    node.id = row * container.width / NODE_SIZE + col,
                    node.iswall = false
            }
            Util.addStyel(node, 'node')
            // setTimeout(()=>{
            //     // Util.set_style(node,{ animation:'grid .3s ease'})
            // },t+100)
            t+=node.id
            container.append(node)
            NODE.push(node)
        }
    }
    return NODE
}

// function drawAble(container, NODES, mouse) {
//     if (window.innerWidth > 768) {

//         container.addEventListener('mouseover', (e) => {
//             let ele
//             ele = document.elementFromPoint(e.clientX, e.clientY)
//             if ((mouse.ispressed) && ele != NODES[START] && ele != NODES[DESTINATION] && ele.classList.contains('node')) {
//                 Util.set_style(ele, { backgroundColor: 'black',border:'1px solid black',animation:'wall .5s ease'})
//                 ele.iswall = true
//             }
//             // makeWall(e,mouse,NODES)
//         })

//     } else {
//         container.addEventListener('touchmove', (e) => {
//             let ele
//             ele = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
//             if ((mouse.ispressed) && ele != NODES[START] && ele != NODES[DESTINATION] && ele.classList.contains('node')) {
//                 Util.set_style(ele, { backgroundColor: 'black',border:'1px solid black',animation:'wall .5s ease'})
//                 ele.iswall = true
//             }
//             // makeWall(e,mouse,NODES)
//         })
//     }
// }
// function makeWall(e,mouse,NODES){
//     let ele
//     ele = document.elementFromPoint(e.clientX, e.clientY)
//         if ((mouse.ispressed) && (ele != NODES[START] && ele != NODES[DESTINATION]) && ele.classList.contains('node')) {
//             Util.set_style(ele, { backgroundColor: 'black' })
//             ele.iswall = true
//         }
// }


function handleDraw(container, NODES) {
    let mouse = {
        ispressed: false,
    }

    function wall1(e){
            let ele
            ele = document.elementFromPoint(e.clientX, e.clientY)
            if ((mouse.ispressed) && ele != NODES[START] && ele != NODES[DESTINATION] && ele.classList.contains('node')) {
                Util.set_style(ele, { backgroundColor: 'black',border:'1px solid black',animation:'wall .5s ease'})
                ele.iswall = true
            }
    }
    function wall2(e){
            let ele
            ele = document.elementFromPoint(e.clientX, e.clientY)
            if ((mouse.ispressed) && ele != NODES[START] && ele != NODES[DESTINATION] && ele.classList.contains('node')) {
                Util.set_style(ele, { backgroundColor: 'black',border:'1px solid black',animation:'wall .5s ease'})
                ele.iswall = true
            }
    }
    function wall3(e){
        mouse.ispressed = true
        console.log("MuseDown:", mouse.ispressed)
        let ele
        ele = document.elementFromPoint(e.clientX, e.clientY)
        if ((mouse.ispressed) && (ele != NODES[START] && ele != NODES[DESTINATION]) && ele.classList.contains('node')) {
            Util.set_style(ele, { backgroundColor: 'black',border:'1px solid black',animation:'wall .5s ease'})
            ele.iswall = true
        }
    }

    function drawAble(container, NODES, mouse) {
        if (window.innerWidth > 768) {
            container.addEventListener('mouseover',wall1)
        } else {
            container.addEventListener('touchmove', wall2)
        }
    }
    window.addEventListener('mousedown',wall3)
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
    return {wall1,wall2,wall3}
}
export { generateGrid, handleDraw}