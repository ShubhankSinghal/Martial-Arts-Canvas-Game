let ctx2 = c.getContext("2d");

loadImages(2, (images) => {
  let queueAnimation = [];

  let aux = () => {
    let selectedAnimation;

    if (queueAnimation.length === 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queueAnimation.shift();
    }

    animate(2, ctx2, images, selectedAnimation, aux);
  };

  aux();

  document.getElementById("kick2").onclick = () => {
    queueAnimation.push("kick");
  };
  document.getElementById("punch2").onclick = () => {
    queueAnimation.push("punch");
  };
  document.getElementById("forward2").onclick = () => {
    queueAnimation.push("forward");
  };
  document.getElementById("backward2").onclick = () => {
    queueAnimation.push("backward");
  };
  document.getElementById("block2").onclick = () => {
    queueAnimation.push("block");
  };
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "ArrowLeft") {
      queueAnimation.push("forward");
    } else if (key === "ArrowRight") {
      queueAnimation.push("backward");
    } else if (key === "Control") {
      queueAnimation.push("block");
    } else if (key === "ArrowDown") {
      queueAnimation.push("kick");
    } else if (key === "ArrowUp") {
      queueAnimation.push("punch");
    }
  });
});
