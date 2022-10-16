export const countdownHandler = (remainingDuration) => {
  if (remainingDuration > 0) {
    const countdown = setInterval(() => {
      let remainingTime = localStorage.getItem("expirationTime");
      remainingTime -= 1000;
      localStorage.setItem("expirationTime", remainingTime);
      if (remainingTime <= 0) {
        clearInterval(countdown);
      }
    }, 1000);
  }
};

export const expirationTimeHandler = (data) => {
  const expirationTime = new Date(
    new Date().getTime() + +data.expiresIn * 1000
  );
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  let remainingDuration = adjExpirationTime - currentTime;
  localStorage.setItem("expirationTime", remainingDuration);

  countdownHandler(remainingDuration);
};
