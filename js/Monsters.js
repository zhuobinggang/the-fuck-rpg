/**
 * Created by zhuo on 2017/9/17.
 */
class Enemy extends LiveObject{
    constructor(name,mh,pp,mp,pd,md,speed,exp){
        super(name,mh,pp,mp,pd,md,speed);
        this.exp = exp || 1;
        this.isLiving = true;
        this.items = [];//携带道具
    }
    effectFromInFight(item, src) {
        if(item.effective){
            item.effective(this,src);
        }
        this.checkDeath();
    }
    effectFromSkill(skill,src){
        if(skill.effective){
            skill.effective(this,src);
        }
        this.checkDeath();
    }
    checkDeath(){
        if(this.health < 1){
            this.isLiving = false;
        }
    }
    fuckPlayer(){//AI逻辑
        var skill = Skills.normalPysicAttack;
        player.effectFromSkill(skill);
        fightState.addLog(this.name+'对'+player.name+'释放了:'+skill.name);
    }
}

var Monsters = {
    king: new Enemy('王♂',20,9,3,3,3,1,10),
    king2: new Enemy('哲学家♂',20,3,9,3,3,14,10),
    goblin: new Enemy('哥布林',10,3,3,3,3,2,2),
    slime: new Enemy('史莱姆',10,3,3,3,3,2,2)
}
Monsters.king.fuckPlayer = function () {
    var skill = Skills.normalPysicAttack;
    // player.effectFromSkill(skill);
    skill.effective(player,this);
    fightState.addLog(this.name+'露出意味深长的微笑,对'+player.name+'释放了:'+skill.name);
}
Monsters.king2.fuckPlayer = function () {
    var skill = Skills.normalMagicAttack;
    skill.effective(player,this);
    fightState.addLog(this.name+'露出意味深长的微笑,对'+player.name+'释放了:'+skill.name);
}
Monsters.goblin.fuckPlayer = function () {
    var skill = Skills.normalPysicAttack;
    skill.effective(player,this);
    fightState.addLog(this.name+'对'+player.name+'释放了:'+skill.name);
}
Monsters.king2.fuckPlayer = function () {
    var skill = Skills.normalMagicAttack;
    skill.effective(player,this);
    fightState.addLog(this.name+'对'+player.name+'释放了:'+skill.name);
}