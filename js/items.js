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
    constructor(name, desc, opers) {
        name = name || "你爸爸的圣剑";
        super(name);
        this.desc = desc || "GM专用咖喱棒";
        this.opers = opers || [];
    }
}
var Items = {
    stick: new Item("木棍", "一根木棍", [operItems.wear, operItems.discard]),
    egg: new Item('鸡蛋', '一个鸡蛋', [operItems.use, operItems.discard]),
    excalibur: new Item()
}
