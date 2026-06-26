let theShader;
let shaderTexture;

function preload() {
  theShader = loadShader("assets/texture.vert", "assets/texture.frag");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  background(0);

  shaderTexture = createGraphics(30, 500, WEBGL);
  shaderTexture.noStroke();
}

function draw() {
  // Update shader
  shaderTexture.shader(theShader);

  theShader.setUniform("resolution", [width, height]);
  theShader.setUniform("time", millis() / 1000.0);
  theShader.setUniform("mouse", [
    mouseX,
    map(mouseY, 0, height, height, 0)
  ]);

  shaderTexture.rect(0, 0, width, height);

  // Draw on top without clearing
  if (mouseIsPressed) {
    push();

    // Convert mouse coordinates to WEBGL coordinates
    translate(mouseX - width / 2, mouseY - height / 2);

    texture(shaderTexture);
    circle(0, 0, 35);

    pop();
  }
}
