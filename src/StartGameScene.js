class StartGameScene extends Phaser.Scene {
  constructor() {
    super("startGame");
  }

  create() {
    this.gameOver = this.add.bitmapText(
      config.width / 2 - 100,
      config.height / 2 - 50,
      "pixelFont",
      "PLAY GAME",
      64
    );
    this.pressEnter = this.add.bitmapText(
      config.width / 2 - 100,
      config.height / 2 + 40,
      "pixelFont",
      "PRESS ENTER TO PLAY",
      32
    );
  }

  update() {
    if (this.input.keyboard.addKey("ENTER").isDown) {
      this.scene.start("playGame");
    }
  }
}
