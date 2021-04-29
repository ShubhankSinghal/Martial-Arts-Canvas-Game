let c = document.getElementById("my-canvas");
let ctx1 = c.getContext("2d");
let positionStart = {
  1: -80,
  2: 920,
};

let loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let imagePath = (frameNumber, animation, player) => {
  return (
    "images/player" + player + "/" + animation + "/" + frameNumber + ".png"
  );
};

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  forward: [1, 2, 3, 4, 5, 6],
  backward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

let loadImages = (player, callback) => {
  let images = {
    idle: [],
    kick: [],
    punch: [],
    forward: [],
    backward: [],
    block: [],
  };
  let imagesToLoad = 0;

  ["idle", "kick", "punch", "forward", "backward", "block"].forEach(
    (animation) => {
      let animationFrames = frames[animation];
      imagesToLoad += animationFrames.length;

      animationFrames.forEach((frameNumber) => {
        let path = imagePath(frameNumber, animation, player);

        loadImage(path, (image) => {
          images[animation][frameNumber - 1] = image;
          imagesToLoad -= 1;

          if (imagesToLoad === 0) {
            callback(images);
          }
        });
      });
    }
  );
};

let animate = (player, ctx, images, animation, callback) => {
  if (player == 1 && animation == "backward" && positionStart[player] > -80) {
    positionStart[player] -= 40;
  } else if (
    player == 1 &&
    animation == "forward" &&
    positionStart[player] < positionStart[2] - 360
  ) {
    positionStart[player] += 40;
  } else if (
    player == 2 &&
    animation == "backward" &&
    positionStart[player] < 920
  ) {
    positionStart[player] += 40;
  } else if (
    player == 2 &&
    animation == "forward" &&
    positionStart[player] > positionStart[1] + 360
  ) {
    positionStart[player] -= 40;
  }
  console.log(positionStart);

  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(positionStart[player], 0, 500, 500);
      ctx.drawImage(image, positionStart[player], 0, 500, 500);
    }, index * 100);
  });
  setTimeout(callback, images[animation].length * 100);
};

loadImages(1, (images) => {
  let queueAnimation = [];

  let aux = () => {
    let selectedAnimation;

    if (queueAnimation.length === 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queueAnimation.shift();
    }

    animate(1, ctx1, images, selectedAnimation, aux);
  };

  aux();

  document.getElementById("kick1").onclick = () => {
    queueAnimation.push("kick");
  };
  document.getElementById("punch1").onclick = () => {
    queueAnimation.push("punch");
  };
  document.getElementById("forward1").onclick = () => {
    queueAnimation.push("forward");
  };
  document.getElementById("backward1").onclick = () => {
    queueAnimation.push("backward");
  };
  document.getElementById("block1").onclick = () => {
    queueAnimation.push("block");
  };

  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "d" || key == "D") {
      queueAnimation.push("forward");
    } else if (key === "a" || key == "A") {
      queueAnimation.push("backward");
    } else if (key === "Shift") {
      queueAnimation.push("block");
    } else if (key === "s" || key == "S") {
      queueAnimation.push("kick");
    } else if (key === "w" || key == "W") {
      queueAnimation.push("punch");
    }
  });
});
