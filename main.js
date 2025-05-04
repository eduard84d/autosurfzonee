
document.addEventListener("DOMContentLoaded", () => {
  const counter = document.getElementById("onlineCounter");
  if (counter) {
    const fakeOnline = 180 + Math.floor(Math.random() * 20);
    counter.textContent = `Сейчас онлайн: ${fakeOnline} пользователей`;
  }
});
