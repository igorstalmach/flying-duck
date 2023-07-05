class InitializeGameScene extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.spritesheet(
      "jungleBackground",
      "assets/backgrounds/jungle-background.jpg",
      {
        frameWidth: 1280,
        frameHeight: 720,
      }
    );
    this.load.spritesheet(
      "skyBackground",
      "assets/backgrounds/sky-background.jpg",
      {
        frameWidth: 1280,
        frameHeight: 720,
      }
    );
    this.load.spritesheet(
      "spaceBackground",
      "assets/backgrounds/space-background.jpg",
      {
        frameWidth: 1280,
        frameHeight: 720,
      }
    );

    this.load.spritesheet("player", "assets/player/duck.png", {
      frameWidth: 65,
      frameHeight: 44,
    });

    this.load.image("heart", "assets/player/heart.png");

    this.load.image("beer", "assets/obstacles/beer.png");
    this.load.image("can", "assets/obstacles/can.png");
    this.load.image("chocolate", "assets/obstacles/chocolate.png");
    this.load.image("hotdog", "assets/obstacles/hotdog.png");
    this.load.image("icecream", "assets/obstacles/icecream.png");

    this.load.bitmapFont(
      "pixelFont",
      "assets/font/font.png",
      "assets/font/font.xml"
    );

    this.load.audio("backgroundMusic", "assets/sounds/funkytown.mp3");
    this.load.audio("startGame", "assets/sounds/startgame.mp3");
    this.load.audio("gameOver", "assets/sounds/gameover.mp3");
    this.load.audio("hurt", "assets/sounds/hurt.mp3");
  }

  create() {
    this.scene.start("startGame");

    this.anims.create({
      key: "duck_anim",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "jungleBackground_anim",
      frames: this.anims.generateFrameNumbers("jungleBackground"),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "skyBackground_anim",
      frames: this.anims.generateFrameNumbers("skyBackground"),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "spaceBackground_anim",
      frames: this.anims.generateFrameNumbers("spaceBackground"),
      frameRate: 10,
      repeat: -1,
    });
  }
}
