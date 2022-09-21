import {ui} from "./Utilities.js";
import {grid} from "./Grid.js";

class Storage {
    constructor() {
        this.name='2048_game_status'
        this.isplayed=true
        this.best=0
    }
    get isExist(){
        return this.isplayed
    }
    set isExist(bool){
        this.isplayed=bool
    }
    store(grid,score,best=this.best){
        let gameObj={
            grid,
            score,
            best
        }
        localStorage.setItem(this.name,JSON.stringify(gameObj))
    }
    getBestScore(){
        let storedData=JSON.parse(localStorage.getItem(this.name))
        return storedData && storedData.best
    }

    restore(){
        let storedData=JSON.parse(localStorage.getItem(this.name))
        if(storedData){
            grid.restoreGrid(storedData.grid);
            ui.domUpdate(storedData.grid);
            ui.score.innerHTML=storedData.score;
            ui.best.innerHTML=storedData.best
            grid.updateAllSpace(storedData.grid);
            ui.totalScore=storedData.score
            ui.totalBest=storedData.best
        }else{
            this.isExist=false
        }
    }
}




let storage=new Storage()






export {storage}
