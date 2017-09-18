/**
 * Created by zhuo on 2017/9/5.
 */
var operItems = {
    confirm: {name: '确认'},
    use: {
        name: '使用',
        confirm: function (item, src, target) {
            target.effectFrom(item, src);
        }
    },
    wear: {
        name: '装备',
        confirm: function (item, src, target) {
            target.wearEquipment(item, src);
        }
    },
    discard: {
        name: '丢弃',
        confirm: function (item, src, target) {
            console.info(target.name+"被丢弃了道具:"+item.name);
            target.discardItem(item,src);
        }
    },
    takeApart: {
        name: '卸下装备',
        confirm: function (item, src, target) {
            console.info(target.name+"被拆掉了装备:"+item.name);
            target.discardEquipment(item,src);
        }
    },
    sale: {name: '卖出'},
    buy: {name: '买入'},
    checkEnemies: {name:'观察敌人'},
    skill: {name:'技能'},
    escape: {name:'逃跑'},
}

/**Items define**/
class Item extends Entity {
    constructor(name, desc, mh, pp, mp, pd, md, pysicDamage, magicDamage,canUseInFight) {
        name = name || "你爸爸的圣剑";
        super(name);

        this.desc = desc || "GM专用咖喱棒";
        this.maxHealth = mh || 0;
        this.pysicPower = pp || 0;
        this.magicPower = mp || 0;
        this.pysicDefense = pd || 0;
        this.magicDefense = md || 0;
        this.pysicDamage = pysicDamage || 0;
        this.magicDamage = magicDamage || 0;

        this.canUseInFight = canUseInFight || false;
    }
    effective(target,src){
        if(!target || !src)return;
        fightState.addLog(src.name+'对'+target.name+'使用了道具:'+this.name+',可是好像没什么用');
    }
}
var Items = {
    stick: new Item("木棍", "一根木棍", 0, 1, 0, 0, 0),
    egg: new Item('鸡蛋', '一个鸡蛋'),
    excalibur: new Item("Excalibur","一刀999,点击就送", 999, 999, 999, 999, 999, 999, 999,true),
    godHand: new Item("神之手","物理攻击力挺高的", 0, 5, 0, 0, 0, 0, 0,false),
    faQ: new Item("FaQ!","emmm这是什么?", 0, 0, 5, 0, 0, 0, 0,false),
    apple: new Item("苹果","HP + 20", 0, 0, 0, 0, 0, -20, 0,true),
}
Items.egg.canUseInFight = true;
Items.apple.effective = function (target,src) {
    if(!target || !src)return;
    fightState.addLog(src.name+'对'+target.name+'使用了道具:'+this.name+',生命回复了!');
    target.damageFrom(this.pysicDamage,this.magicDamage);
}

/**Skills define**/
class Skill{
    constructor(name, desc,skillType, pysicDamageUp, magicDamageUp, realDamage) {
        this.name = name || "普通物理攻击";
        this.desc = desc || "很普通的物理攻击";
        this.skillType = skillType || 1;//1 2 3,物理，魔法，或者都有
        this.pysicDamageUp = pysicDamageUp || 0.0;
        this.magicDamageUp = magicDamageUp || 0.0;
        this.realDamage = realDamage || 0.0;
    }

    effective(target,src){
        if(!target || !src)return;
        var pd = 0;
        var md = 0;
        if(this.skillType == 1){
            pd = src.pysicPower + Math.floor(this.pysicDamageUp * src.pysicPower);
        }else if(this.skillType ==2){
            md = src.magicPower + Math.floor(this.magicDamageUp * src.magicPower);
        }else{
            pd = src.pysicPower + Math.floor(this.pysicDamageUp * src.pysicPower);
            md = src.magicPower + Math.floor(this.magicDamageUp * src.magicPower);
        }
        // console.log('物理伤害结算前'+pd+' 魔法伤害结算前:'+md);
        target.damageFrom(pd,md);
        target.healthChange(Math.floor(-this.realDamage));
    }
}
var Skills = {
    normalPysicAttack: new Skill(),
    normalMagicAttack: new Skill('普通魔法攻击','很普通的魔法攻击',2,0.0,0.0,0)
}
