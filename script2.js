let c2 = document.getElementById("my-canvas-2");
let ctx2 = c2.getContext("2d");

let loadImage2 = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let imagePath2 = (frameNumber, animation) => {
  return "images/player2/" + animation + "/" + frameNumber + ".png";
};

let loadImages2 = (callback) => {
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
        let path = imagePath2(frameNumber, animation);

        loadImage2(path, (image) => {
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

let animate2 = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(image, 0, 0, 500, 500);
    }, index * 100);
  });
  setTimeout(callback, images[animation].length * 100);
};

loadImages2((images) => {
  let queueAnimation = [];

  let aux2 = () => {
    let selectedAnimation;

    if (queueAnimation.length === 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queueAnimation.shift();
    }

    animate2(ctx2, images, selectedAnimation, aux2);
  };

  aux2();

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
  document.addEventListener("keyup", (event) => {
    const key = event.key;
    if (key === "ArrowLeft") {
      queueAnimation.push("kick");
    } else if (key === "ArrowRight") {
      queueAnimation.push("punch");
    }
  });
});
