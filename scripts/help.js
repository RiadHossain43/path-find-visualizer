import * as Util from './util.js'

const how = Util.eleQRY('.how')
const instructions = Util.eleQRY('.instructions')
const back = Util.eleQRY('.back')
let click = new Util.sound('./sounds/fire.mp3')
function help() {
    how.addEventListener('click', () => {
        click.play()
        Util.set_style(instructions, { display: 'block', opacity: 0 })
        setTimeout(() => {
            Util.set_style(instructions, { opacity: 1, height: '90%' })
        }, 10)
    })
    back.addEventListener('click', () => {
        click.play()
        Util.set_style(instructions, { height: '0%', opacity: 0 })
        setTimeout(() => {
            Util.set_style(instructions, { display: 'none' })
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

export { help , setwarning,resetNotice}