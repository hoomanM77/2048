import { grid, spaces} from "./Grid.js";
import {ui} from "./Utilities.js";
import {storage} from "./storage_manager.js";

const moveRight = () => {
    Object.entries(grid.grid).forEach(item=>{
        for(let index=3;index > -1 ;index--){
            if(item[1][index]){
                let val=item[1][index] && item[1][index].value
                let nullCounter=[...item[1]].slice(index,4).filter(x=> x===null).length
                let newX=Number(item[1][index].x)
                let newY=Number(item[1][index].y + nullCounter)

                grid.grid[`row${newX}`][item[1][index].y -1 ]=null

                grid.updateGrid(newX,newY,val)

                ui.domUpdate(grid.grid)

            }
        }
    })
    grid.mergeItemOnRightMove()
    ui.domUpdate(grid.grid)
    grid.updateAllSpace()
    ui.addItemOnEachMove()
    storage.store(grid.grid,ui.totalScore,ui.totalBest)
}

const moveLeft = () => {
    Object.entries(grid.grid).forEach((item,index1)=>{
        item[1].forEach((row,index2)=>{
            if(row){
                let newY=row.y-[...item[1]].slice(0,index2).filter(x=> x===null).length
                let newX=Number(item[1][index2].x)
                grid.grid[`row${newX}`][(row.y)-1]=null
                grid.updateGrid(newX,newY,row.value)

            }
        })
    })
    grid.mergeItemOnLeftMove()
    ui.domUpdate(grid.grid)
    grid.updateAllSpace()
    ui.addItemOnEachMove()
    storage.store(grid.grid,ui.totalScore,ui.totalBest)
}

const moveTop = () => {
    for(let col=0;col < 4;col++){
        grid.column(col).forEach((item,index)=>{
            if(item){
                let nullCounter=[...grid.column(col)].slice(0,index).filter(x=>x===null).length
                let newX=item.x-nullCounter

                grid.grid[`row${item.x}`][col]=null

                grid.updateGrid(newX,col+1,item.value)

                // console.log(item,newX,nullCounter)

            }
        })
    }
    grid.mergeItemOnTopMove()
    ui.domUpdate(grid.grid)
    grid.updateAllSpace()
    ui.addItemOnEachMove()
    storage.store(grid.grid,ui.totalScore,ui.totalBest)
}

const moveBottom = () => {
    for(let col=0;col < 4;col++){
        for(let index=3;index>-1;index--){
            if(grid.column(col)[index]){
                let val=grid.column(col)[index] && grid.column(col)[index].value
                let nullCounter=grid.column(col).slice(index,4).filter(x=>x===null).length
                let newX=nullCounter+ grid.column(col)[index].x
                grid[`row${grid.column(col)[index].x}`][col]=null
                grid.updateGrid(newX,col+1,val)
            }
        }
    }
    grid.mergeItemOnBottomMove()
    ui.domUpdate(grid.grid)
    grid.updateAllSpace()
    ui.addItemOnEachMove()
    storage.store(grid.grid,ui.totalScore,ui.totalBest)
}

export {moveRight,moveTop,moveBottom,moveLeft}