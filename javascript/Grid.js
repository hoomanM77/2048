import {ui} from "./Utilities.js";
let spaces=['11','12','13','14','21','22','23','24','31','32','33','34','41','42','43','44']


class Grid {
    constructor() {
        this.row1=[null,null,null,null]
        this.row2=[null,null,null,null]
        this.row3=[null,null,null,null]
        this.row4=[null,null,null,null]
    }
    restoreGrid(newData){
        this.row1=newData.row1
        this.row2=newData.row2
        this.row3=newData.row3
        this.row4=newData.row4
    }
    column(colNum){
        // 0 => 3
        let col=[]
        Object.entries(this.grid).forEach((item,index)=>{
            col.push(item[1][colNum])
        })
        return col
    }
    get grid(){
        return this
    }
    restart(){
        this.row1=[null,null,null,null]
        this.row2=[null,null,null,null]
        this.row3=[null,null,null,null]
        this.row4=[null,null,null,null]
    }
    updateGrid(x,y,value=2){
        if(this[`row${x}`]){
            this[`row${x}`][y-1]={x,y,value}
        }else{
            ui.winCalculator()
        }
    }

    updateSpace(x,y){
        let idx=spaces.findIndex(space=>{
            return space===`${x}${y}`
        })
        spaces.splice(idx,1)
    }
    updateAllSpace(data=this.grid){
        spaces=[];
        Object.entries(data).forEach((item,index1)=>{
            item[1].forEach((row,index2)=>{
                if(!row){
                    spaces.push(`${index1+1}${index2+1}`)
                }
            })
        })
    }

    mergeHelperRight(which,row){

        for(let index=0;index < this[which].length;index++){
            if(this[which][0]!==undefined && this[which][0]!==null && this[which][1]?.value===this[which][0]?.value){
                let newVal=this[which][1]?.value + this[which][0]?.value
                this[which][0]=null
                this[which][1]={x:row,y:2,value:newVal}
                ui.scoreCalculator(newVal)
                ui.domUpdate(this.grid)
            }

            if(index-1 > -1){
                let lastItem=this[which][index]
                let currentItem=this[which][index+1]
                if(currentItem?.value===lastItem?.value && currentItem!==null && currentItem!==undefined){
                    let newVal=currentItem?.value+lastItem?.value

                    let newY=Math.max(currentItem?.y,lastItem?.y)

                    this[which][lastItem.y-1]=null

                    this[which][newY-1]={x:row,y:newY,value:newVal}

                    ui.scoreCalculator(newVal)
                    ui.domUpdate(this.grid)

                }
            }

        }
    }
    mergeHelperLeft(which,row){
        for(let index=0;index < this[which].length;index++){
            if(this[which][1]!==undefined && this[which][1]!==null && this[which][1]?.value===this[which][0]?.value){
                let newVal=this[which][1]?.value + this[which][0]?.value
                this[which][1]=null
                this[which][0]={x:row,y:1,value:newVal}
                ui.scoreCalculator(newVal)
                ui.domUpdate(this.grid)
            }
            if(index-1 > -1){
                let lastItem=this[which][index]
                let currentItem=this[which][index+1]
                if(currentItem?.value===lastItem?.value && currentItem!==null && currentItem!==undefined){
                    let newVal=currentItem?.value+lastItem?.value
                    let newY=Math.min(currentItem?.y,lastItem?.y)
                    this[which][lastItem.y]=null
                    this[which][newY-1]={x:row,y:newY,value:newVal}
                    ui.scoreCalculator(newVal)
                    ui.domUpdate(this.grid)

                }
            }

        }
    }

    mergeItemOnRightMove() {
        this.mergeHelperRight('row1',1)
        this.mergeHelperRight('row2',2)
        this.mergeHelperRight('row3',3)
        this.mergeHelperRight('row4',4)
        ui.domUpdate(this.grid)
    }
    mergeItemOnLeftMove(){
        this.mergeHelperLeft('row1',1)
        this.mergeHelperLeft('row2',2)
        this.mergeHelperLeft('row3',3)
        this.mergeHelperLeft('row4',4)
        ui.domUpdate(this.grid)
    }
    mergeItemOnTopMove(){
        for(let col=0;col < 4;col++){
            this.column(col).forEach((item,index)=>{
                if(item){
                    let lastItem=this.column(col)[index-1]
                    if(lastItem!==undefined && lastItem!==null && lastItem.value===item.value){
                        let newVal=lastItem.value+item.value
                        let newX=Math.min(lastItem.x,item.x)
                        this[`row${item.x}`][col]=null
                        this[`row${newX}`][col]={x:newX,y:col+1,value:newVal}
                        ui.scoreCalculator(newVal)
                        ui.domUpdate(this.grid)
                    }
                }
            })
        }
    }
    mergeItemOnBottomMove(){
        for(let col=0;col < 4;col++){
            this.column(col).forEach((item,index)=>{
                if(item){
                    let lastItem=this.column(col)[index-1]
                    if(lastItem!==undefined && lastItem!==null && lastItem.value===item.value){
                        let newVal=item.value+lastItem.value
                        let newX=Math.max(item.x,lastItem.x)

                        this[`row${lastItem.x}`][col]=null

                        this[`row${newX}`][col]={x:newX,y:col+1,value:newVal}

                        ui.scoreCalculator(newVal)
                        ui.domUpdate(this.grid)
                    }
                }
            })
        }


    }

}


let grid=new Grid()


export {grid,spaces}