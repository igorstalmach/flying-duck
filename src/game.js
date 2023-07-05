const config = {
  width: 1280,
  height: 720,
  backgroundColor: "#715BA4",
  scene: [InitializeGameScene, PlayGameScene, StartGameScene, GameOverScene],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

const gameSettings = {
  playerSpeed: 600,
  obstacleSpeed: 400,
  playerLifes: 3,
};

window.onload = () => {
  const game = new Phaser.Game(config);
};
