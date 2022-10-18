export const countdownHandler = (remainingDuration) => {
  if (remainingDuration > 0) {
    const countdown = setInterval(() => {
      let remainingTime = localStorage.getItem("expirationTime");
      remainingTime -= 1;
      localStorage.setItem("expirationTime", remainingTime);
      if (remainingTime <= 0) {
        clearInterval(countdown);
      }
    }, 1000);
  }
};

export const expirationTimeHandler = (expiresIn) => {
  localStorage.setItem("expirationTime", expiresIn);

  countdownHandler(expiresIn);
};
