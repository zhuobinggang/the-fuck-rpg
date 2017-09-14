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

        Maps.plain1.reOpen();
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
        player = new LiveObject('管理员', 100, 1, 1, 0, 0, 10);

        //玩家用户事件初始化
        player.events = {}
        player.events.moveEvent = new Phaser.Signal();
        player.events.moveEvent.add(FightSystem.onPlayerMove);

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
                player.events.moveEvent.dispatch('fuck');
                player.fixCamera();
            }
        }

        player.aDown = function () {

        }
        player.bDown = function () {
            currentCustomState = menuDialog;
        }

        function noStone(nextX, nextY) {
            return (!obj_tile_map[nextX][nextY] || !obj_tile_map[nextX][nextY].isStone);
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

}
//加载存档
loadArchives = function () {

}
