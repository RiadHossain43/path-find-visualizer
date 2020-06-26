import * as Util from './util.js'

const how = Util.eleQRY('.how')
const instructions = Util.eleQRY('.instructions')
const helpback = Util.eleQRY('.helpback')
const info = Util.eleQRY('.info')
const infoback = Util.eleQRY('.infoback')
const showinfo = Util.eleQRY('.showinfo')
let click = new Util.sound('./sounds/fire.mp3')
function help() {
    how.addEventListener('click', () => {
        click.play()
        Util.set_style(instructions, { display: 'block', opacity: 0 })
        setTimeout(() => {
            Util.set_style(instructions, { opacity: 1, height: '80%' })
        }, 10)
    })
    helpback.addEventListener('click', () => {
        click.play()
        Util.set_style(instructions, { height: '0%', opacity: 0 })
        setTimeout(() => {
            Util.set_style(instructions, { display: 'none' })
        }, 200)
    })
}

function showinformation() {
    info.addEventListener('click', () => {
        click.play()
        Util.set_style(showinfo, { display: 'block', opacity: 0 })
        setTimeout(() => {
            Util.set_style(showinfo, { opacity: 1, height: '80%' })
        }, 10)
    })
    infoback.addEventListener('click', () => {
        click.play()
        Util.set_style(showinfo, { height: '0%', opacity: 0 })
        setTimeout(() => {
            Util.set_style(showinfo, { display: 'none' })
        }, 200)
    })
}


function setwarning() {
    let warning = Util.eleQRY('.warning')
    Util.set_style(warning, { display: 'block', opacity: 0 })
    setTimeout(() => {
        Util.set_style(warning, { opacity: 1})
    }, 10)
    setTimeout(() => {
        Util.set_style(warning, { opacity: 0 })
        setTimeout(() => {
            Util.set_style(warning, { display: 'none' })
        }, 550)
    }, 2500)
}

function resetNotice(){
    let reset_notice = Util.eleQRY('.reset-notice')
    Util.set_style(reset_notice, { display: 'block', opacity: 0 })
    setTimeout(() => {
        Util.set_style(reset_notice, { opacity: 1})
    }, 10)
    setTimeout(() => {
        Util.set_style(reset_notice, { opacity: 0 })
        setTimeout(() => {
            Util.set_style(reset_notice, { display: 'none' })
        }, 550)
    }, 1500)
}

export { help ,showinformation, setwarning,resetNotice}