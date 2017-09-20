/**
 * Created by zhuo on 2017/9/3.
 */
var mainState = {//the main dialog & the game
    preload: function () {
        console.log('call::preload()');
        game.load.tilemap('tile_map', './js/assets/fuck.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles1', './js/assets/west_rpg.png');
        game.load.image('tiles2', './js/assets/the_man_set.png');

        game.load.spritesheet('GM', './js/assets/the_man_set.png', 32, 32);
    },
    create: function () {
        console.log('call::create()');

        //初始化玩家函数之类的
        initPlayer();

        //加载存档,地图初始化
        loadArchives();

        currentCustomState = mainState;


        cursor = game.input.keyboard.createCursorKeys();

        //init dialogs
        itemDialog.init();
        roleDialog.init();
        menuDialog.init();
        fightState.init();
        fightItemDialog.init();
        selectEnemyDialog.init();
        myAlertDialog.init();
        itemShowDialog.init();
        equipShowDialog.init();
    },
    render: function () {

    },
    update: function () {

    },
    init: function () {

    },
    initPlayer: function () {
        initPlayer();
    },
    goLeft: function () {
        player.goLeft();
    },
    goRight: function () {
        player.goRight();
    },
    goUp: function () {
        player.goUp();
    },
    goDown: function () {
        player.goDown();
    },
    aDown: function () {
        //触发感兴趣事件
        var x = player.tile.x;
        var y = player.tile.y;
        if (player.facing == 0) {
            y = y - 1;
        } else if (player.facing == 1) {
            y = y + 1;
        } else if (player.facing == 2) {
            x = x - 1;
        } else if (player.facing == 3) {
            x = x + 1;
        }

        map.playerInterestOn(x, y);
    },
    bDown: function () {
        player.bDown();
        menuDialog.reOpen();
    },
    fixCameraTo: function (x, y) {
        game.camera.focusOnXY(x, y);
    },
    reOpen: function () {
        map.reOpen();
    },
    close: function () {
        map.close();
    },
    setVisible: function (visible) {
        map.setVisible(visible);
    },
    gameReset: function () {
        //从存档读取玩家信息
        // playerReset();
        // loadArchives();
        // game.state.clearCurrentState();
        game.state.restart(true);
        //地图重置
        // map.reset();
    }
}
//加载存档
loadArchives = function () {

    var saveMap = localStorage.getItem('map');
    if (!saveMap) {
        Maps['plain1'].init();
    } else {
        Maps[saveMap.name].init();
    }
    map.getPlayerTile();

    var playerMetaData = JSON.parse(localStorage.getItem('player'));
    if (!playerMetaData) {
        // mainState.initPlayer();
        player.itemList = [{item: Items.egg, num: 1}, {item: Items.stick, num: 1}];
        // player.itemList = [Items.egg, Items.stick];
        player.equipmentList = [];
        player.equipmentMaxNum = 5;//最多五件装备
        player.skills = [Skills.normalMagicAttack, Skills.normalPysicAttack];
    } else {
        player.health = playerMetaData.health;
        player.maxHealth = playerMetaData.maxHealth;
        player.pysicPower = playerMetaData.pysicPower;
        player.magicPower = playerMetaData.magicPower;
        player.pysicDefense = playerMetaData.pysicDefense;
        player.magicDefense = playerMetaData.magicDefense;
        player.speed = playerMetaData.speed;
        player.equipmentMaxNum = playerMetaData.equipmentMaxNum;

        // player.itemList = [{item: Items.egg, num: 1}, {item: Items.stick, num: 1}];
        //load items
        var itemList = playerMetaData.itemList;
        player.itemList = [];
        for(var i = itemList.length-1;i>=0;i--){
            var item = itemList[i];
            var itemOfItem = getItemById(item.order);
            player.itemList.push({
                num: item.num,
                item: itemOfItem
            })
        }

        var equips = playerMetaData.equipmentList;
        player.equipmentList = [];
        for(var i = equips.length-1;i>=0;i--){
            var equipId = equips[i].order;
            var equip = getItemById(equipId);
            player.equipmentList.push(equip);
        }

        // player.equipmentList = [];
        // player.skills = [Skills.normalMagicAttack, Skills.normalPysicAttack];
        var skills = playerMetaData.skills;
        player.skills = [];
        for(var i = skills.length-1;i>=0;i--){
            var skillId = skills[i].order;
            var skill = getSkillById(skillId);
            player.skills.push(skill);
        }

        console.info('读取成功');
    }
}

function saveGame() {
    var playerMetaData = {};
    playerMetaData.health = player.health;
    playerMetaData.maxHealth = player.maxHealth;
    playerMetaData.pysicPower = player.pysicPower;
    playerMetaData.magicPower = player.magicPower;
    playerMetaData.pysicDefense = player.pysicDefense;
    playerMetaData.magicDefense = player.magicDefense;
    playerMetaData.speed = player.speed;
    playerMetaData.equipmentMaxNum = player.equipmentMaxNum;

    playerMetaData.skills = [];
    //储存技能编号
    for (var i = player.skills.length - 1; i >= 0; i--) {
        playerMetaData.skills.push({
            order: player.skills[i].order
        });
    }

    playerMetaData.itemList = [];
    for (var i = player.itemList.length - 1; i >= 0; i--) {
        var item = player.itemList[i];
        playerMetaData.itemList.push({
            num: item.num,
            order: item.item.order
        });
    }

    playerMetaData.equipmentList = [];
    for (var i = player.equipmentList.length - 1; i >= 0; i--) {
        var item = player.equipmentList[i];
        playerMetaData.equipmentList.push({
            order: item.order
        });
    }

    // console.info(JSON.stringify(playerMetaData));
    localStorage.setItem('player', JSON.stringify(playerMetaData));
}