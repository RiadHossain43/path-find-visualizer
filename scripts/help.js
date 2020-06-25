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
            Util.set_style(instructions, { opacity: 1, height: '85%' })
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
export { help }