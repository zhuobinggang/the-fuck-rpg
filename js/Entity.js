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
    //meta data
    player.health = 100;
    player.maxHealth = 100;
    player.pysicPower = 1;
    player.magicPower = 1;
    player.pysicDefense = 0;
    player.magicDefense = 0;

    player.itemList = [Items.egg,Items.excalibur,Items.stick];
    player.equipmentList = [];
    player.equipmentMaxNum = 5;//最多五件装备

    player.healthChange = function(damage){
        damage = damage || 0;
        player.health -= damage;
        console.info('player health changed! '+player.health);
        //TODO: 渲染生命值
    }
    player.effectFrom = function (item, src) {
        //计算魔法和物理伤害
        var pysicDamage = item.pysicDamage || 0;
        var magicDamage = item.magicDamage || 0;
        if(pysicDamage > 0){//如果是伤害道具
            pysicDamage -= player.pysicDefense;
            pysicDamage = (pysicDamage < 0) ? 0: pysicDamage;
        }
        if(magicDamage > 0){//如果是伤害道具
            magicDamage -= player.magicDefense;
            magicDamage = (magicDamage < 0) ? 0: magicDamage;
        }

        player.healthChange(pysicDamage + magicDamage);
    }
    player.wearEquipment = function (item, src) {
        //检查装备容量
        if(player.equipmentList.length >= player.equipmentMaxNum){
            console.warn("超出装备容量上限");
            return;
        }
        console.info("装备了道具:"+item.name);

        //从道具列表中删除
        var index = player.itemList.indexOf(item);
        if(index >= 0)player.itemList.splice(index,1);

        //装备到装备列表
        player.equipmentList.push(item);

        //重新计算数值
        var healthMaxUp = item.healthMaxUp || 0;
        var pysicPower = item.pysicPower || 0;
        var magicPower = item.magicPower || 0;
        var pysicDefense = item.pysicDefense || 0;
        var magicDefense = item.magicDefense || 0;
        player.maxHealth += healthMaxUp;
        player.pysicPower += pysicPower;
        player.magicPower += magicPower;
        player.pysicDefense += pysicDefense;
        player.magicDefense += magicDefense;
    }
}