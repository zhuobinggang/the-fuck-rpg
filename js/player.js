/**
 * Created by zhuo on 2017/9/17.
 */
function playerInteractiveInit() {
    player.itemList = [Items.egg, Items.stick];
    player.equipmentList = [];
    player.equipmentMaxNum = 5;//最多五件装备
    player.skills = [Skills.normalMagicAttack, Skills.normalPysicAttack];

    player.effectFrom = function (item, src) {
        //使用后删除
        if (src) {
            var index = src.itemList.indexOf(item);
            if (index >= 0) src.itemList.splice(index, 1);
        }

        //道具生效
        if (item.effective) {
            item.effective(this, src);
        }
    }
    player.effectFromSkill = function (skill, src) {
        //使用后删除
        //道具生效
        if (skill.effective) {
            skill.effective(this, src);
        }
    }

    player.wearEquipment = function (item, src) {
        //检查装备容量
        if (player.equipmentList.length >= player.equipmentMaxNum) {
            console.warn("超出装备容量上限");
            return;
        }
        console.info("装备了道具:" + item.name);

        //从道具列表中删除
        if (src) {
            var index = src.itemList.indexOf(item);
            if (index >= 0) src.itemList.splice(index, 1);
        }

        //装备到装备列表
        player.equipmentList.push(item);

        //重新计算数值
        // LiveObject.prototype.effectFromItem.call(this,item);
        var healthMaxUp = item.maxHealth || 0;
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
    player.getItem = function (item, src) {
        src = src || {name: "你爸爸"}
        console.info('从 ' + src.name + ' 那获得道具 ' + item.name);
        player.itemList.push(item);
    }
    player.healthChange = function (damage) {
        LiveObject.prototype.healthChange.call(this, damage);
        // console.info('扩展了父类方法');
    }
    player.subEquipProperty = function (item) {
        if (!item)return;
        player.subProperty(
            item.maxHealth, item.pysicPower, item.magicPower,
            item.pysicDefense, item.magicDefense
        );
    }
    player.discardEquipment = function (equipment, src) {
        var index = player.equipmentList.indexOf(equipment);
        if (index < 0) {
            console.warn("没有这件武器");
            return;
        }

        //减去属性
        player.subEquipProperty(equipment);

        //扔回道具栏
        player.equipmentList.splice(index, 1);
        player.itemList.push(equipment);
    }
    player.discardItem = function (item, src) {
        var index = player.itemList.indexOf(item);
        if (index >= 0) player.itemList.splice(index, 1);
        else {
            console.warn("没有这件道具");
            return;
        }
    }

    //获取可以在战斗中使用的道具
    player.getFightItems = function () {
        var result = [];
        for (var i = player.itemList.length - 1; i >= 0; i--) {
            var item = player.itemList[i];
            if (item.canUseInFight) result.push(item);
        }
        return result;
    }

    player.getSkills = function () {
        return player.skills;
    }
}

function initPlayer() {
    player = new LiveObject('管理员', 100, 5, 5, 0, 0, 10);

    //玩家用户事件初始化
    player.events = {}
    // player.events.moveEvent = new Phaser.Signal();
    // player.events.moveEvent.add(FightSystem.onPlayerMove);

    // player.tile = map.getTile(2, 0, layer_lives);
    player.tile = map.getPlayerTile();
    player.facing = 3;//0 1 2 3 up down left right

    player.fixCamera = function () {
        // mainState.fixCameraTo(player.tile.texture.x + game.camera.x, player.tile.texture.y + game.camera.y);
        mainState.fixCameraTo(player.tile.texture.x, player.tile.texture.y);
    }

    //控制初始化
    player.goTo = function (offsetX, offsetY) {
        //player go to
        if (map.playerGoTo(offsetX, offsetY)) {
            //signal
            player.fixCamera();
        }
    }

    player.aDown = function () {

    }
    player.bDown = function () {
        currentCustomState = menuDialog;
    }

    player.goDown = function () {
        //colddown operation
        player.goTo(0, 1);
        player.facing = 1;
    }
    player.goUp = function () {
        player.goTo(0, -1);
        player.facing = 0;
    }
    player.goRight = function () {
        player.goTo(1, 0);
        //change face
        // player.tile.index = 1026;
        player.tile.changeFrame(1);
        player.facing = 3;
    }
    player.goLeft = function () {
        player.goTo(-1, 0);
        //change face
        // player.tile.index = 1025;
        player.tile.changeFrame(0);
        player.facing = 2;
    }

    //道具使用初始化
    playerInteractiveInit();

    //目标对象
    player.target = player;//初始目标对象是自己
}
function playerReset() {
    //减去属性
    for(var i = 0;i<player.equipmentList.length;i++){
        player.subEquipProperty(player.equipmentList[i]);
    }

    player.tile = map.getPlayerTile();
    player.health = 100;
    player.facing = 3;//0 1 2 3 up down left right
    player.itemList = [Items.egg, Items.stick];
    player.equipmentList = [];
    player.equipmentMaxNum = 5;//最多五件装备
    player.skills = [Skills.normalMagicAttack,Skills.normalPysicAttack];
}