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
    discard: {name: '丢弃'},
}

/**Items define**/
class Item extends Entity {
    constructor(name, desc, opers, mh, pp, mp, pd, md, pysicDamage, magicDamage) {
        name = name || "你爸爸的圣剑";
        super(name);

        this.desc = desc || "GM专用咖喱棒";
        this.opers = opers || [];
        this.maxHealth = mh || 0;
        this.pysicPower = pp || 0;
        this.magicPower = mp || 0;
        this.pysicDefense = pd || 0;
        this.magicDefense = md || 0;
        this.pysicDamage = pysicDamage || 0;
        this.magicDamage = magicDamage || 0;
    }
}
var Items = {
    stick: new Item("木棍", "一根木棍", [operItems.wear, operItems.discard], 0, 1, 0, 0, 0),
    egg: new Item('鸡蛋', '一个鸡蛋', [operItems.use, operItems.discard]),
    excalibur: new Item("Excalibur","一刀999,点击就送",[operItems.wear,operItems.discard], 999, 999, 999, 999, 999)
}
