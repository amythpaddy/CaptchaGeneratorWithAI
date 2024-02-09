function generateCaptcha(config = {}) {
  // Create canvas element
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  // Set canvas dimensions
  var width = parseInt(document.getElementById("widthInput").value);
  var height = parseInt(document.getElementById("heightInput").value);
  canvas.width = width;
  canvas.height = height;

  // Generate random captcha text
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var captchaText = "";
  for (var i = 0; i < 6; i++) {
    captchaText += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  // Customize colors (default colors are provided for convenience)
  var textColor =
    config.textColor || document.getElementById("textColorPicker").value;
  var backgroundColor =
    config.backgroundColor ||
    document.getElementById("backgroundColorPicker").value;
  var noiseColor1 = config.noiseColor1 || "#fff";
  var noiseColor2 = config.noiseColor2 || "#000";

  // Draw background and text
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  var selectedFont = document.getElementById("fontSelect").value;
  ctx.font = `30px ${selectedFont}`;
  ctx.fillStyle = textColor;
  ctx.fillText(captchaText, 10, 30);

  // Distortion effects (optional)
  var noise = document.createElement("canvas");
  noise.width = canvas.width;
  noise.height = canvas.height;
  var noiseCtx = noise.getContext("2d");
  for (var i = 0; i < canvas.width; i++) {
    for (var j = 0; j < canvas.height; j++) {
      var rand = Math.random();
      noiseCtx.fillStyle =
        rand < 0.1
          ? noiseColor1
          : rand < 0.3
          ? noiseColor2
          : "rgba(0, 0, 0, 0)";
      noiseCtx.fillRect(i, j, 1, 1);
    }
  }
  ctx.drawImage(noise, 0, 0);

  // Display generated CAPTCHA
  document.getElementById("captchaImage").src = canvas.toDataURL("image/png");
  // Store the generated CAPTCHA text for verification
  localStorage.setItem("captchaText", captchaText);
}

function downloadCaptcha() {
  // Enable text download
  var downloadLink = document.getElementById("downloadLink");
  captchaText = localStorage.getItem("captchaText");
  downloadLink.href = `data:text/plain;charset=utf-8,${captchaText}`;
  downloadLink.download = "captcha_text.txt";
  downloadLink.click(); // Automatically download after generation
}

function verifyCaptcha() {
  var enteredText = document.getElementById("captchaInput").value;
  var storedText = localStorage.getItem("captchaText");
  if (enteredText === storedText) {
    alert("CAPTCHA verification successful!");
  } else {
    alert("Invalid CAPTCHA!");
  }
}
