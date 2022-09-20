import {ui} from "./Utilities.js";
import {moveLeft,moveRight,moveBottom,moveTop} from "./MoveHandler.js";
import {grid, spaces} from "./Grid.js";
import {storage} from "./storage_manager.js";
let isStarted=false
let startX,startY



ui.newGameButton.addEventListener('click',()=>{
    isStarted=true
    ui.score.innerHTML='0'
    ui.totalScore=0
    ui.totalBest=storage.getBestScore()
    ui.winCalculator(false)
    grid.restart()
    grid.updateAllSpace(grid.grid)
    ui.addStarterItems()
    storage.store(grid.grid,ui.totalScore,storage.getBestScore())
})
window.addEventListener('load',()=>{
    storage.restore()
    storage.isExist ? isStarted=true : isStarted=false
})

window.addEventListener('keydown',e=>{
    isStarted && e.preventDefault()
    switch (e.key) {
        case 'ArrowRight':{
             isStarted && moveRight()
        }
        break
        case 'ArrowDown':{
            isStarted && moveBottom()
        }
        break
        case 'ArrowUp':{
            isStarted && moveTop()
        }
        break
        case 'ArrowLeft':{
            isStarted && moveLeft()
        }
        break
    }

})
window.addEventListener('touchstart',e=>{
    document.body.style.touchAction='none'
    isStarted && e.preventDefault()
    startY=e.changedTouches[0].clientY
    startX=e.changedTouches[0].clientX
})
window.addEventListener('touchmove',e=>{
    document.body.style.touchAction='none'
    isStarted && e.preventDefault()
})
window.addEventListener('touchend',e=>{
    document.body.style.touchAction='none'
    isStarted && e.preventDefault()

    let endX=e.changedTouches[0].clientX
    let endY=e.changedTouches[0].clientY

    let dx=endX-startX
    let dy=endY-startY

    let absDx=Math.abs(dx)
    let absDy=Math.abs(dy)

    if (Math.max(absDx, absDy) > 10) {
        let direction=absDx > absDy ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up')
        switch (direction) {
            case 'right':{
                isStarted && moveRight()
            }
                break
            case 'down':{
                isStarted && moveBottom()
            }
                break
            case 'up':{
                isStarted && moveTop()
            }
                break
            case 'left':{
                isStarted && moveLeft()
            }
            break
        }
        console.log(direction)
    }

})