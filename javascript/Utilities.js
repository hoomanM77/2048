import {grid,spaces} from "./Grid.js";
import  {storage} from "./storage_manager.js";

class UI {
    constructor() {
        this.itemContainer=document.querySelector('.item-container')
        this.newGameButton=document.querySelector('.button')
        this.score=document.querySelector('.score')
        this.winStatus=document.querySelector('.win-status')
        this.best=document.querySelector('.best')
        this.totalScore=0
        this.totalBest=0
    }
    addStarterItems(){
        this.itemContainer.innerHTML=''
        let nums=[1,2,3,4]
        let randomContainer=[]

        let randomOne=Math.floor(Math.random()*nums.length)
        randomContainer.push(nums[randomOne])
        nums.splice(randomOne,1)

        let randomTwo=Math.floor(Math.random()*nums.length)
        randomContainer.push(nums[randomTwo])
        nums.splice(randomTwo,1)

        grid.updateGrid(randomContainer[0],randomContainer[1],2)
        grid.updateGrid(nums[0],nums[1],2)

        grid.updateSpace(randomContainer[0],randomContainer[1])
        grid.updateSpace(nums[0],nums[1])

        this.itemContainer.insertAdjacentHTML('beforeend',`<div class="item item-2 position-${randomContainer[0]}-${randomContainer[1]}"><div class="inner ani-scale">2</div></div>`)
        this.itemContainer.insertAdjacentHTML('beforeend',`<div class="item item-2 position-${nums[0]}-${nums[1]}"><div class="inner ani-scale">2</div></div>`)

    }
    addItemOnEachMove(){
        let randomNum=Math.floor(Math.random()*spaces.length)
        let x=Number(spaces[randomNum]?.split('')[0])
        let y=Number(spaces[randomNum]?.split('')[1])
        spaces.length>0 && this.itemContainer.insertAdjacentHTML('beforeend',`<div class="item item-2 position-${x}-${y}"><div class="inner ani-scale">2</div></div>`)
        grid.updateSpace(x,y)
        grid.updateGrid(x,y,2)
    }
    domUpdate(data){
        this.itemContainer.innerHTML=''
        Object.entries(data).forEach(item=>{
            item[1].forEach(row=>{
                if(row!==null){
                    ui.itemContainer.insertAdjacentHTML('beforeend',`<div class="item item-${row.value} position-${row.x}-${row.y}"><div class="inner ani-scale">${row.value}</div></div>`)
                }
            })
        })
    }

    scoreCalculator(newValue){
        let lastValue=Number(this.score.innerHTML)
        this.totalScore=lastValue+newValue
        this.totalBest=lastValue+newValue

        this.score.innerHTML=lastValue+newValue


        if(!storage.isExist){
            this.best.innerHTML=lastValue+newValue
        }else{
            if(this.totalScore > Number(ui.best.innerHTML)){
                this.best.innerHTML=lastValue+newValue
            }
        }





        this.best.classList.add('ani-scale')
        this.score.classList.add('ani-scale')
        this.score.addEventListener('animationend',e=>{
            this.score.classList.remove('ani-scale')
        })
        this.best.addEventListener('animationend',e=>{
            this.best.classList.remove('ani-scale')
        })
    }
    winCalculator(status=true){
        if(status){
           this.winStatus.classList.contains('show') || this.winStatus.classList.add('show')
        }else{
            this.winStatus.classList.contains('show') && this.winStatus.classList.remove('show')
        }
    }
}


let ui=new UI()

export {ui}