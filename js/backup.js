var universe = new Phaser.Game(1365,625,Phaser.AUTO);

var game = function(){
    console.log("running!!!");
}

game.prototype = {
    preload:preload,
    create:create,
    update:update
};

universe.state.add('game',game);
universe.state.start('game');

var pl = [];
var score = 30;
var randX1, randY1, randX2, randY2, n, l=150, h=60;
var rocket, source, target;
var fuel,bmd;


//-------------------------------------------------------------------------------------------------------------------------------------------
function preload(){

     universe.load.image('pn1','img/planet1.png');
     universe.load.image('pn2','img/planet2.png');
     universe.load.image('pn3','img/planet3.png');
     universe.load.image('pn4','img/planet4.png');
     universe.load.image('pn5','img/planet5.png');
     universe.load.image('pn6','img/planet6.png');
     universe.load.image('pn7','img/planet7.png');
     universe.load.image('pn8','img/planet10.png');
     universe.load.image('pn9','img/planet11.png');
     // universe.load.image('pn10','img/planet12.png');
     // universe.load.image('pn11','img/planet13.png');
     // universe.load.image('pn12','img/planet14.png');
     // universe.load.image('pn13','img/planet15.png');
     // universe.load.image('pn14','img/planet16.png');
     // universe.load.image('pn15','img/planet17.png');
     // universe.load.image('pn16','img/planet18.png');
     // universe.load.image('pn17','img/planet19.png');
     // universe.load.image('pn18','img/planet20.png');
     universe.load.image('star','img/light.png');
     universe.load.image('bg','img/bg.jpg');
     universe.load.image('ship','img/ship.png');
}


//-------------------------------------------------------------------------------------------------------------------------------
function create(){
     var background = universe.add.tileSprite(0, 0, 1365, 625, 'bg');
     bmd = universe.add.bitmapData(100,100);

     randX1 = 100+Math.floor(Math.random()*100);
     randY1 = 100+Math.floor(Math.random()*350);

     randX2 = 1000+Math.floor(Math.random()*100);
     randY2 = 100+Math.floor(Math.random()*350);

     source = universe.add.sprite(randX1, randY1, 'star');
     target = universe.add.sprite(randX2, randY2, 'star');
     rocket = universe.add.sprite(randX1, randY1, 'ship');
     
     source.scale.setTo(0.5,0.5);
     target.scale.setTo(0.5,0.5);
     rocket.scale.setTo(0.4,0.4);
  
     randX1+=50;
     randY1+=50;
     randX2+=50;
     randY2+=50;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     //universe.physics.startSystem(Phaser.Physics.ARCADE);
     universe.physics.startSystem(Phaser.Physics.P2JS);
     universe.physics.p2.restitution = 0.9;
     
     universe.physics.p2.enable(rocket);
     universe.physics.p2.enable(source);
     universe.physics.p2.enable(target);

     // rocket.body.collideWorldBounds = true;
     // rocket.body.drag.set(500);
     // rocket.body.maxVelocity.set(300);
     // rocket.anchor.set(0.5);

//-------------------------------------------------------------------------------------------------------------------

     planets = universe.add.group();

     universe.physics.p2.enable(planets);
     planets.enableBody = true;

     universe.physics.p2.enable(rocket, false);
     rocket.body.createBodyCallback(planets, impact, this);

    //  And before this will happen, we need to turn on impact events for the world
    universe.physics.p2.setImpactEvents(true);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////


     pl[0] = planets.create(randX1 + Math.cos(0), randY1 + Math.sin(0), 'pn1');
     pl[1] = planets.create(randX1 + Math.cos(0), randY1 + Math.sin(0), 'pn2');
     pl[2] = planets.create(randX1 + Math.cos(0), randY1 + Math.sin(0), 'pn3');
     pl[3] = planets.create(randX2 + Math.cos(0), randY2 + Math.sin(0), 'pn4');
     pl[4] = planets.create(randX2 + Math.cos(0), randY2 + Math.sin(0), 'pn5');
     pl[5] = planets.create(randX2 + Math.cos(0), randY2 + Math.sin(0), 'pn6');
     pl[6] = planets.create(randX2 + Math.cos(0), randY2 + Math.sin(0), 'pn7');
     pl[7] = planets.create(randX2 + Math.cos(0), randY2 + Math.sin(0), 'pn8');
     pl[8] = planets.create(randX2 + Math.cos(0), randY2 + Math.sin(0), 'pn9');
     pl[9] = planets.create(randX2 + Math.cos(0), randY2 + Math.sin(0), 'pn10');
     pl[10] = planets.create(randX2 + Math.cos(0), randY2 + Math.sin(0), 'pn11');
     pl[11] = planets.create(randX2 + Math.cos(0), randY2 + Math.sin(0), 'pn12');
     pl[12] = planets.create(randX2 + Math.cos(0), randY2 + Math.sin(0), 'pn13');
     pl[13] = planets.create(randX2 + Math.cos(0), randY2 + Math.sin(0), 'pn14');
     pl[14] = planets.create(randX2 + Math.cos(0), randY2 + Math.sin(0), 'pn15');
     pl[15] = planets.create(randX2 + Math.cos(0), randY2 + Math.sin(0), 'pn16');
     pl[16] = planets.create(randX2 + Math.cos(0), randY2 + Math.sin(0), 'pn17');
     pl[17] = planets.create(randX2 + Math.cos(0), randY2 + Math.sin(0), 'pn18');

     for(var i=0;i<11;i++){
        var r;

        if(i==3){
            l=130;
            h=60;
        }

        r = Math.random()*h+l; 
        var s;
        s = Math.random()*1.5+0.5;

        var temp = Math.round(Math.random()*1);

        if(temp == 0)
            pl[i].dir = -1;

        else
            pl[i].dir = 1;

        pl[i].radius = r;

        l=l+h+20;

        pl[i].speed = s;
        pl[i].angle = 0;
        pl[i].scale.setTo(0.2,0.2);

        pl[i].body.immovable = true;

        if(i>3)
            pl[i].kill();
        
     } 

     cursors = universe.input.keyboard.createCursorKeys();

}


//--------------------------------------------------------------------------------------------------------------------
function update(){

     level();

     for(var i=3;i<3+n;i++)
         pl[i].revive();

   
    for(var i=0; i<3; i++){
        pl[i].x = randX1 + Math.cos(pl[i].angle+=pl[i].dir*pl[i].speed/150)*pl[i].radius;
        pl[i].y = randY1 + Math.sin(pl[i].angle+=pl[i].dir*pl[i].speed/150)*pl[i].radius;
    }

    for(var i=3; i<18; i++){
            pl[i].x = randX2 + Math.cos(pl[i].angle+=pl[i].dir*pl[i].speed/150)*pl[i].radius;
            pl[i].y = randY2 + Math.sin(pl[i].angle+=pl[i].dir*pl[i].speed/150)*pl[i].radius;
    }

    if(cursors.left.isDown){
        rocket.body.velocity.x = -200;
        rocket.body.velocity.y = 0; 
        source.body.velocity.x = 100; 
        target.body.velocity.x = 100;
        rocket.angle = 180;                
    }

    else if(cursors.right.isDown){
        rocket.body.velocity.x = 200;
        rocket.body.velocity.y = 0; 
        source.body.velocity.x = -100;
        target.body.velocity.x = -100;
        rocket.angle = 0;                 
    }

    else if(cursors.up.isDown){
        rocket.body.velocity.y = -200;
        rocket.body.velocity.x = 0;
        source.body.velocity.x = 0;
        target.body.velocity.x = 0;
        rocket.angle = 270;                  
    }

    else if(cursors.down.isDown){
        rocket.body.velocity.y = 200;
        rocket.body.velocity.x = 0;
        source.body.velocity.x = 0;
        target.body.velocity.x = 0;
        rocket.angle = 90;                  
    }

    else{
        rocket.body.velocity.x = 0;
        rocket.body.velocity.y = 0;
        source.body.velocity.x = 0;                  
        target.body.velocity.x = 0;
    }

    if(cursors.left.isDown && cursors.up.isDown){
        rocket.body.velocity.x = -200;
        rocket.body.velocity.y = -200;
        source.body.velocity.x = 100;
        target.body.velocity.x = 100;
        rocket.angle = 225;                  
    }

    if(cursors.left.isDown && cursors.down.isDown){
        rocket.body.velocity.x = -200;
        rocket.body.velocity.y = 200;
        source.body.velocity.x = 100;
        target.body.velocity.x = 100;
        rocket.angle = 135;                  
    }

    if(cursors.right.isDown && cursors.up.isDown){
        rocket.body.velocity.x = 200;
        rocket.body.velocity.y = -200;
        source.body.velocity.x = -100;
        target.body.velocity.x = -100;
        rocket.angle = 315;                  
    }

    if(cursors.right.isDown && cursors.down.isDown){
        rocket.body.velocity.x = 200;
        rocket.body.velocity.y = 200;
        source.body.velocity.x = -100;                  
        target.body.velocity.x = -100;
        rocket.angle = 45;
    }

    // if()
    //     rocket.body.velocity.x = 0;
    //     rocket.body.velocity.y = 0;
    //     source.body.velocity.x = 0;                  
    //     target.body.velocity.x = 0;
    // }


    // if (cursors.up.isDown)
    // {
    //     universe.physics.arcade.accelerationFromRotation(rocket.rotation, 300, rocket.body.acceleration);
    //     universe.physics.arcade.accelerationFromRotation(source.rotation, -300, source.body.acceleration);
    //     universe.physics.arcade.accelerationFromRotation(target.rotation, -300, target.body.acceleration);
    // }
    // else
    // {
    //     rocket.body.acceleration.set(0);
    //     source.body.velocity.x = 0;
    //     target.body.velocity.x = 0;
    // }

    // if (cursors.left.isDown)
    // {
    //     rocket.body.angularVelocity = -100;
    // }
    // else if (cursors.right.isDown)
    // {
    //     rocket.body.angularVelocity = 100;
    // }
    // else
    // {
    //     rocket.body.angularVelocity = 0;
    // }
    

       universe.physics.arcade.collide(rocket, planets);

//     bmd.ctx.fillStyle = "red";
//     bmd.ctx.fillRect(0,0,(fuel/100)*140,100);

}

function impact(){

    rocket.body.velocity.x = 1000;
}

//---------------------------------------------------------------------------------------------------------------------------
function level(){

    if(score>=0 && score<=50){

        s = 0.1;

        if(score==0)
        n=2;

        if(score==10)
        n=3;
     
        if(score==20)
        n=4;
        
        if(score==30)
        n=5;   

        if(score==40)
        n=6;
        
        if(score==50)
        n=7;
    }
}
