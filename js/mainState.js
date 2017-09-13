/**
 * Created by zhuo on 2017/9/3.
 */
var mainState = {//the main dialog & the game
    preload: function () {
        console.log('call::preload()');
        game.load.tilemap('tile_map', './js/assets/fuck.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles1', './js/assets/west_rpg.png');
        game.load.image('tiles2', './js/assets/the_man_set.png');

        loadArchives();
    },
    create: function () {
        console.log('call::create()');

        // load up tilemap
        map = game.add.tilemap('tile_map');

        // link loaded tileset image to map
        map.addTilesetImage('west_rpg', 'tiles1');
        map.addTilesetImage('the_man_set', 'tiles2');

        // create laye for said tileset and map now!
        layer_glass = map.createLayer('glass');
        layer_lava = map.createLayer('lava');
        layer_bridge = map.createLayer('bridge');
        layer_lives = map.createLayer('lives');
        layer_objs = map.createLayer('objs');

        mainState.initPlayer();
        mainState.initObjsTileMap();
        // layer2.debug = true;

        layer_glass.resizeWorld();
        cursor = game.input.keyboard.createCursorKeys();

        //init dialogs
        itemDialog.init();
        roleDialog.init();
        menuDialog.init();
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
        // player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'player_left');
        player = new Entity('管理员');
        player.tile = map.getTile(2, 0, layer_lives);
        player.facing = 3;//0 1 2 3 up down left right

        player.fixCamera = function () {
            mainState.fixCameraTo(player.tile.worldX, player.tile.worldY);
        }

        //控制初始化
        player.goTo = function (offsetX, offsetY) {
            var nextX = player.tile.x + offsetX;
            if (nextX < 0 || nextX >= map.width)return;

            var nextY = player.tile.y + offsetY;
            if (nextY < 0 || nextY >= map.height)return;

            if (!noStone(nextX, nextY))return;

            //move
            var tile = map.putTile(player.tile, nextX, nextY, layer_lives);
            map.putTile(null, player.tile.x, player.tile.y, layer_lives);//remove
            player.tile = tile;

            player.fixCamera();
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
            player.tile.index = 1026;
            player.facing = 3;
        }
        player.goLeft = function () {
            player.goTo(-1, 0);
            //change face
            player.tile.index = 1025;
            player.facing = 2;
        }

        //道具使用初始化
        playerInteractiveInit();
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
loadArchives= function () {

}
