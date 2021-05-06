import * as Util from './util.js'
import { START, DESTINATION } from './app.js'
let click = new Util.sound('./sounds/fire.mp3')
function generateGrid(container, NODE_SIZE) {
    let NODE = []
    // let gridanim = ['grid1','grid2']
    // let t
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
            container.append(node)
            NODE.push(node)
        }
    }
    return NODE
}






function handleDraw(container, NODES) {
    let mouse = {
        ispressed: false,
    }
    function mouseHoverDrawWall_Pc(e){
        
            let ele
            ele = document.elementFromPoint(e.clientX, e.clientY)
            if ((mouse.ispressed) && ele != NODES[START] && ele != NODES[DESTINATION] && ele.classList.contains('node')) {
                Util.set_style(ele, { backgroundColor: '#5e6c84',border:'1px solid #5e6c84',animation:'wall 1s ease'})
                ele.iswall = true
                // click.play()
            }
    }
    function mouseHoverDrawWall_Phn(e){
       
            let ele
            ele = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
            if ((mouse.ispressed) && ele != NODES[START] && ele != NODES[DESTINATION] && ele.classList.contains('node')) {
                Util.set_style(ele, { backgroundColor: '#5e6c84',border:'1px solid #5e6c84',animation:'wall 1s ease'})
                ele.iswall = true
                // click.play()
            }
    }
    function mousePressDrawWall_Pc_Phn(e){
       
        mouse.ispressed = true
        let ele
        ele = document.elementFromPoint(e.clientX, e.clientY)
        if ((mouse.ispressed) && (ele != NODES[START] && ele != NODES[DESTINATION]) && ele.classList.contains('node')) {
            Util.set_style(ele, { backgroundColor: '#5e6c84',border:'1px solid #5e6c84',animation:'wall 1s ease'})
            ele.iswall = true
        }
    }
    function mouseNotPressed_Pc_Phn(e){
        mouse.ispressed = false
    }
    function TouchStart_Phn(e){
        mouse.ispressed = true
    }

    function drawAble(container, NODES, mouse) {
        if (window.innerWidth > 768) {
            container.addEventListener('mouseover',mouseHoverDrawWall_Pc)
        } else {
            container.addEventListener('touchmove', mouseHoverDrawWall_Phn)
        }
    }
    window.addEventListener('mousedown',mousePressDrawWall_Pc_Phn)
    window.addEventListener('mouseup', mouseNotPressed_Pc_Phn)
    window.addEventListener('touchstart', TouchStart_Phn)
    window.addEventListener('touchend',mouseNotPressed_Pc_Phn)
    drawAble(container, NODES, mouse)

    return {
            mouseHoverDrawWall_Pc,
            mouseHoverDrawWall_Phn,
            mousePressDrawWall_Pc_Phn,
            mouseNotPressed_Pc_Phn,
            TouchStart_Phn
        }
}





























export { generateGrid, handleDraw}