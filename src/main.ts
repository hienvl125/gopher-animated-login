import "./style.css";

const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordContainer = document.getElementById("password-container") as HTMLElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const sunglassesElm = document.getElementById("sunglasses") as HTMLElement;
const gopherHand = document.getElementById("gopher-hand") as HTMLElement;
const gopherLeftPupil = document.getElementById("gopher-left-pupil") as HTMLElement;
const gopherRightPupil = document.getElementById("gopher-right-pupil") as HTMLElement;
const showPasswordButton = document.getElementById("show-password-btn") as HTMLButtonElement;
const hidePasswordButton = document.getElementById("hide-password-btn") as HTMLButtonElement;

const defaultPupilLeft = 13;
const defaultPupilTop = 13;
const maxPupilTop = 27;
const pupilFocusLeft = 4;
const pupilFocusTop = 22;

const putSunglassesOnTop = 20;
const putSunglassesOnWithPeekTop = 60;
const takeSunglassesOffTop = 120;
const gopherHandWhenPutSunglassesOnTop = 60;
const gopherHandWhenPutSunglassesOnWithPeekTop = 98;
const gopherHandWhenTakeSunglassesOffTop = 140;

let currentPupilLeft = defaultPupilLeft;
let currentPupilTop = defaultPupilTop;

function setGopherPupils(left: number, top: number) {
  gopherLeftPupil.style.left = `${left}px`;
  gopherLeftPupil.style.top = `${top}px`;
  gopherRightPupil.style.left = `${left}px`;
  gopherRightPupil.style.top = `${top}px`;
}

function setGopherPupilsByInput(input: HTMLInputElement) {
  let cursorIndex = input.selectionStart;
  if (!cursorIndex) {
    setGopherPupils(pupilFocusLeft, pupilFocusTop);
    return;
  }

  if (cursorIndex <= 5) {
    currentPupilLeft = pupilFocusLeft + cursorIndex;
    currentPupilTop = pupilFocusTop + cursorIndex;
    setGopherPupils(currentPupilLeft, currentPupilTop);
    return;
  }

  if (cursorIndex > 5 && cursorIndex < 17) {
    currentPupilLeft = pupilFocusLeft + cursorIndex;
    currentPupilTop = maxPupilTop;
    setGopherPupils(currentPupilLeft, currentPupilTop);
    return;
  }

  if (cursorIndex >= 17) {
    if (currentPupilLeft >= 22) {
      currentPupilLeft = 22;
    } else {
      currentPupilLeft = pupilFocusLeft + cursorIndex;
    }
    currentPupilTop = maxPupilTop;

    setGopherPupils(currentPupilLeft, currentPupilTop);
    return;
  }
}

function setSunglassesTop(top: number) {
  sunglassesElm.style.top = `${top}px`;
}

function setGopherHandTop(top: number) {
  gopherHand.style.top = `${top}px`;
}

function putSunglassesOn() {
  setSunglassesTop(putSunglassesOnTop);
  setGopherHandTop(gopherHandWhenPutSunglassesOnTop);
}

function takeSunGlassesOff() {
  setSunglassesTop(takeSunglassesOffTop);
  setGopherHandTop(gopherHandWhenTakeSunglassesOffTop);
  setGopherPupils(defaultPupilLeft, defaultPupilTop);
}

function putSunglassesOnWithPeek() {
  setSunglassesTop(putSunglassesOnWithPeekTop);
  setGopherHandTop(gopherHandWhenPutSunglassesOnWithPeekTop);
}

function main() {
  if (
    !emailInput ||
    !passwordContainer ||
    !passwordInput ||
    !sunglassesElm ||
    !gopherHand ||
    !gopherLeftPupil ||
    !gopherRightPupil ||
    !showPasswordButton ||
    !hidePasswordButton
  ) {
    return;
  }

  // Email input
  // Focus by mouse click
  emailInput.addEventListener("mouseup", () => {
    takeSunGlassesOff();
    setGopherPupilsByInput(emailInput);
  });

  // Focus by tab
  emailInput.addEventListener("focus", () => {
    takeSunGlassesOff();
    setGopherPupilsByInput(emailInput);
  });

  // Lose focus
  emailInput.addEventListener("blur", () => {
    setGopherPupils(defaultPupilLeft, defaultPupilTop);
  });

  // Typing
  emailInput.addEventListener("input", () => {
    setGopherPupilsByInput(emailInput);
  });

  // Arrow moving
  emailInput.addEventListener("keydown", (e) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      // MEMO: setTimeout for wait cursor position update
      setTimeout(() => {
        setGopherPupilsByInput(emailInput);
      }, 1)
    }
  });

  
  // Password input
  let isOverPasswordContainer = false;
  passwordContainer.addEventListener("mouseenter", () => {
    isOverPasswordContainer = true;
  });

  passwordContainer.addEventListener("mouseleave", () => {
    isOverPasswordContainer = false;
  });

  // Focus by click
  passwordInput.addEventListener("mouseup", () => {
    if (passwordContainer.dataset["showPasswordState"] === "hide") {
      putSunglassesOn();
    } else {
      putSunglassesOnWithPeek();
      setGopherPupilsByInput(passwordInput);
    }
  });

  // Focus by tab
  passwordInput.addEventListener("focus", () => {
    if (passwordContainer.dataset["showPasswordState"] === "hide") {
      putSunglassesOn();
    } else {
      putSunglassesOnWithPeek();
      setGopherPupilsByInput(passwordInput);
    }
  });

  // Lost focus
  passwordInput.addEventListener("blur", () => {
    if (!isOverPasswordContainer) {
      takeSunGlassesOff();
      setGopherPupils(defaultPupilLeft, defaultPupilTop);
    }
  });

  // Typing
  passwordInput.addEventListener("input", () => {
    setGopherPupilsByInput(passwordInput);
  });

  // Arrow moving
  passwordInput.addEventListener("keydown", (e) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      // MEMO: setTimeout for wait cursor position update
      setTimeout(() => {
        setGopherPupilsByInput(passwordInput);
      }, 1)
    }
  });

  // Show password button
  showPasswordButton.addEventListener("click", (e) => {
    e.preventDefault();

    passwordContainer.dataset["showPasswordState"] = "show";
    passwordInput.type = "text";
    showPasswordButton.style.display = "none";
    hidePasswordButton.style.display = "block";
    putSunglassesOnWithPeek();
    setGopherPupils(defaultPupilLeft, maxPupilTop);
    passwordInput.focus();
  });

  // Hide password button
  hidePasswordButton.addEventListener("click", (e) => {
    e.preventDefault();

    passwordContainer.dataset["showPasswordState"] = "hide";
    passwordInput.type = "password";
    hidePasswordButton.style.display = "none";
    showPasswordButton.style.display = "block";
    putSunglassesOn();
    passwordInput.focus();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  main();
});
