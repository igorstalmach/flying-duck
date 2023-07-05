class PlayGameScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    // BACKGROUND
    this.background = this.add.sprite(
      config.width / 2,
      config.height / 2,
      "jungleBackground"
    );
    this.background.play("jungleBackground_anim");

    setTimeout(() => {
      this.tweens.add({
        targets: this.background,
        alpha: 0,
        duration: 250,
        onComplete: () => {
          this.background.setTexture("skyBackground");
          this.background.play("skyBackground_anim");
          this.tweens.add({
            targets: this.background,
            alpha: 1,
            duration: 250,
          });
        },
        onCompleteScope: this,
      });
    }, 15000);

    setTimeout(() => {
      this.tweens.add({
        targets: this.background,
        alpha: 0,
        duration: 250,
        onComplete: () => {
          this.background.setTexture("spaceBackground");
          this.background.play("spaceBackground_anim");
          this.tweens.add({
            targets: this.background,
            alpha: 1,
            duration: 250,
          });
        },
        onCompleteScope: this,
      });
    }, 30000);

    // LIFES
    this.currentLifes = gameSettings.playerLifes;
    this.lifes = this.add.group();
    for (let i = 0; i < this.currentLifes; i++) {
      let life = this.add.sprite(config.width - 64 - 70 * i, 50, "heart");
      this.lifes.add(life);
    }

    // AUDIO
    this.backgroundMusic = this.sound.add("backgroundMusic");
    const musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
    this.backgroundMusic.play(musicConfig);

    this.startGameSound = this.sound.add("startGame");
    this.startGameSound.play();
    this.gameOverSound = this.sound.add("gameOver");
    this.hurtSound = this.sound.add("hurt");

    // PLAYER
    this.player = this.physics.add.sprite(
      config.width / 2,
      config.height / 2,
      "player"
    );
    this.player.play("duck_anim");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    // OBSTACLES
    this.obstacleSpeed = gameSettings.obstacleSpeed;

    this.obstacle1 = this.physics.add.sprite(
      Phaser.Math.Between(config.width + 128, 2048),
      Phaser.Math.Between(-128, config.height + 128),
      "beer"
    );
    this.obstacle2 = this.physics.add.sprite(
      Phaser.Math.Between(config.width + 128, 1024),
      Phaser.Math.Between(-128, config.height + 128),
      "can"
    );
    this.obstacle3 = this.physics.add.sprite(
      Phaser.Math.Between(config.width + 128, 2048),
      Phaser.Math.Between(-128, config.height + 128),
      "chocolate"
    );
    this.obstacle4 = this.physics.add.sprite(
      Phaser.Math.Between(config.width + 128, 1024),
      Phaser.Math.Between(-128, config.height + 128),
      "hotdog"
    );
    this.obstacle5 = this.physics.add.sprite(
      Phaser.Math.Between(config.width + 128, 2048),
      Phaser.Math.Between(-128, config.height + 128),
      "icecream"
    );

    this.obstacle1.setInteractive();
    this.obstacle2.setInteractive();
    this.obstacle3.setInteractive();
    this.obstacle4.setInteractive();
    this.obstacle5.setInteractive();

    this.obstacles = this.physics.add.group();
    this.obstacles.add(this.obstacle1);
    this.obstacles.add(this.obstacle2);
    this.obstacles.add(this.obstacle3);
    this.obstacles.add(this.obstacle4);
    this.obstacles.add(this.obstacle5);

    this.physics.add.overlap(
      this.player,
      this.obstacles,
      this.hurtPlayer,
      null,
      this
    );

    setTimeout(() => {
      this.obstacleSpeed += 100;
    }, 15000);

    setTimeout(() => {
      this.obstacleSpeed += 50;
    }, 30000);
  }

  update() {
    this.movePlayerManager();
    this.moveObstacleManager(this.obstacle1);
    this.moveObstacleManager(this.obstacle2);
    this.moveObstacleManager(this.obstacle3);
    this.moveObstacleManager(this.obstacle4);
    this.moveObstacleManager(this.obstacle5);
  }

  movePlayerManager() {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed);
    } else {
      this.player.setVelocityY(0);
    }
  }

  moveObstacleManager(obstacle) {
    obstacle.setVelocityX(-this.obstacleSpeed);

    if (obstacle.x < -obstacle.width) {
      obstacle.x = config.width + obstacle.width;
      obstacle.y = Phaser.Math.Between(
        obstacle.height,
        config.height - obstacle.height
      );
    }
  }

  hurtPlayer(player) {
    if (this.player.alpha < 1) {
      return;
    }

    player.disableBody(true, true);

    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer(this.player.x, this.player.y),
      callbackScope: this,
      loop: false,
    });

    if (this.currentLifes == 1) {
      this.gameOverSound.play();
      this.backgroundMusic.stop();
      this.scene.start("gameOver");
      return;
    }

    this.hurtSound.play();
    this.lifes.getChildren()[this.currentLifes - 1].destroy();
    this.currentLifes--;
  }

  resetPlayer(x, y) {
    this.player.enableBody(true, x, y, true, true);
    this.player.alpha = 0.5;

    const tween = this.tweens.add({
      targets: this.player,
      x: 0,
      y: 0,
      ease: "Power1",
      duration: 1500,
      repeat: 0,
      onComplete: () => {
        this.player.alpha = 1;
      },
      callbackScope: this,
    });
  }
}
