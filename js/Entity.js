/**
 * Created by zhuo on 2017/9/11.
 */

class Entity{
    constructor(name){
        name = name || "你爸爸";
        this.name = name;
    }

    effectFrom(item,src){
        console.info(this.name+' effected from item '+item.name+' by '+src.name);
    }

    wearEquipment(item,src){
        console.info(this.name+' wear equipment '+item.name);
    }
}

function playerInteractiveInit() {
    //TODO: 互动初始化
}