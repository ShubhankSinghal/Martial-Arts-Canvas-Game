let c1 = document.getElementById("my-canvas-1");
let ctx1 = c1.getContext("2d");

let loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let imagePath = (frameNumber, animation) => {
  return "images/player1/" + animation + "/" + frameNumber + ".png";
};

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  forward: [1, 2, 3, 4, 5, 6],
  backward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

let loadImages = (callback) => {
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
        let path = imagePath(frameNumber, animation);

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

let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(image, 0, 0, 500, 500);
    }, index * 100);
  });
  setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
  let queueAnimation = [];

  let aux = () => {
    let selectedAnimation;

    if (queueAnimation.length === 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queueAnimation.shift();
    }

    animate(ctx1, images, selectedAnimation, aux);
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
  document.addEventListener("keyup", (event) => {
    const key = event.key;
    if (key === "ArrowLeft") {
      queueAnimation.push("kick");
    } else if (key === "ArrowRight") {
      queueAnimation.push("punch");
    }
  });
});
