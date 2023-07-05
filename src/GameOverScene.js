class GameOverScene extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  create() {
    this.gameOver = this.add.bitmapText(
      config.width / 2 - 100,
      config.height / 2 - 50,
      "pixelFont",
      "GAME OVER",
      64
    );
    this.pressEnter = this.add.bitmapText(
      config.width / 2 - 135,
      config.height / 2 + 40,
      "pixelFont",
      "PRESS ENTER TO PLAY AGAIN",
      32
    );
  }

  update() {
    if (this.input.keyboard.addKey("ENTER").isDown) {
      this.scene.start("playGame");
    }
  }
}
