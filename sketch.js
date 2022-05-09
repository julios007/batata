//módulos
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

// fruta
var fruit;

//variáveis para cordas, antiga e  novas -- criar
var rope1,rope2,rope3;

//variáveis para restrições, antiga e novas -- criar
var fruit_con_1,fruit_con_2,fruit_con_3;

//botões antigos e novos -- criar
var cutB1, muteB,cutb2,cutb3;

//imagens: fundo, comida, coelhinho
var bg_img, food, rabbit;

//variáveis para sprite do coelho e imagens auxiliares
var bunny;
var blink, eat, sad;

//sons
var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

//verificação de celular, analisar 
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//Analisar juntamente com a continuação do código
var canW;
var canH;

function preload() {
  //imagens
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  //sons
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  //animações
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  //ligando e desligando animações
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}

function setup() {

  //verificação para o canvas
  //if para verificar mobile, else se computador

if(isMobile){
canW=displayWidth;
canH=displayHeight;
createCanvas(displayWidth+80,displayHeight)
}else{
createCanvas(windowWidth,windowHeight)
}






  frameRate(80);

  //som do fundo
  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  cutB1 = createImg('cut_btn.png');
  cutB1.position(20, 30);
  cutB1.size(50, 50);
  cutB1.mouseClicked(drop);

  //btn 2 -- criar
  cutb2 = createImg('cut_btn.png');
  cutb2.position(330, 35);
  cutb2.size(50, 50);
  cutb2.mouseClicked(drop2);


  //btn3 -- criar
  cutb3 = createImg('cut_btn.png');
  cutb3.position(360, 200);
  cutb3.size(50, 50);
  cutb3.mouseClicked(drop3);


  //botão para mutar som
  muteB = createImg('mute.png');
  muteB.position(450, 20);
  muteB.size(50, 50);
  muteB.mouseClicked(mute);

  //cordas. Antiga e novas -- criar
  rope1 = new Rope(8, { x: 40, y: 30 });
  //corda 2
  rope2 = new Rope(7, { x:370, y: 40 });
  //corda 3
  rope3 = new Rope(4, { x: 400, y: 225 });

  blink.frameDelay = 20;
  eat.frameDelay = 20;


  bunny = createSprite(370, 670, 100, 100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying', sad);
  bunny.changeAnimation('blinking');

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope1.body, fruit);

  //links: cordas e fruta -- analisar e explicar
  fruit_con_1 = new Link(rope1, fruit);
  fruit_con_2 = new Link(rope2, fruit);
  fruit_con_3 = new Link(rope3, fruit);


  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() {
  background(51);

  //verificação para exibição de imagem 
  //if mobile, else computador
if(isMobile){
image(bg_img,0,0,displayWidth+80,displayHeight)
}else{
image(bg_img,0,0,windowWidth,windowHeight)
}




  Engine.update(engine);

  push();
  imageMode(CENTER);
  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }
  pop();


  //exibição das cordas -- criar
  rope1.show();
  //corda2
rope2.show();
  //corda3
rope3.show();

  if (collide(fruit, bunny) == true) {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if (fruit != null && fruit.position.y >= 650) {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit = null;
  }
  drawSprites();
}

function drop() {
  cut_sound.play();
  rope1.break();
  fruit_con_1.detach();
  fruit_con_1 = null;
}

//funções para cortar as cordas novas --

//function drop2
function drop2() {
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}



//function drop3
function drop3() {
  cut_sound.play();
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null;
}




function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80) {
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }
}


function mute() {
  if (bk_song.isPlaying()) {
    bk_song.stop();
  }
  else {
    bk_song.play();
  }
}


