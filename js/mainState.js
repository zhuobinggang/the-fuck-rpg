/**
 * Created by zhuo on 2017/9/3.
 */
var mainState = {//the main dialog & the game
    preload: function () {
        console.log('call::preload()');
        game.load.tilemap('tile_map', './js/assets/fuck.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles1', './js/assets/west_rpg.png');
        game.load.image('tiles2', './js/assets/the_man_set.png');

        game.load.spritesheet('GM','./js/assets/the_man_set.png',32,32);

        loadArchives();
    },
    create: function () {
        console.log('call::create()');

        //加载地图
        Maps.plain1.init();

        map.resizeWorld();
        mainState.initPlayer();
        // mainState.initObjsTileMap();
        // layer2.debug = true;

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
        player.aDown();
    },
    bDown: function () {
        player.bDown();
        menuDialog.reOpen();
    },
    initObjsTileMap: function () {
        obj_tile_map = [];
        for (var i = map.height - 1; i >= 0; i--) {
            obj_tile_map[i] = [];
        }

        function stoneInit(row, col) {
            if (!obj_tile_map[row][col]) obj_tile_map[row][col] = {};
            obj_tile_map[row][col].isStone = true;
        }

        for (var i = stonesMap.plain1.length - 1; i >= 0; i--) {
            if (stonesMap.plain1[i] === 0)continue;
            var col = i % map.width;
            var row = Math.floor(i / map.width);
            stoneInit(col, row);
        }
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
        playerReset();
    }
}
//加载存档
loadArchives = function () {

}
