function updateBirthdayCountdown() {
  const titleEl = document.getElementById("countdown-title");
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");

  // 確保頁面有倒數計時元素才執行
  if (!titleEl || !daysEl) return;

  const now = new Date();
  const targetYear = now.getFullYear();
  // 9 月 21 日 00:00:00（JS 月份從 0 開始算，8 代表 9 月）
  let birthday = new Date(targetYear, 8, 21, 0, 0, 0);

  // 如果今天剛好是 9 月 21 日
  if (now.getMonth() === 8 && now.getDate() === 21) {
    titleEl.textContent = "🎉 今天是小凱生日！生日快樂🩵";
    daysEl.textContent = "09";
    hoursEl.textContent = "21";
    minsEl.textContent = "🎂";
    secsEl.textContent = "🩵";
    return;
  }

  // 如果今年的 9/21 已經過了，自動計算明年的 9/21
  if (now > birthday) {
    birthday = new Date(targetYear + 1, 8, 21, 0, 0, 0);
  }

  const diff = birthday - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minsEl.textContent = String(mins).padStart(2, "0");
  secsEl.textContent = String(secs).padStart(2, "0");
}

// 網頁載入後立即執行一次，接著每秒更新
updateBirthdayCountdown();
setInterval(updateBirthdayCountdown, 1000);