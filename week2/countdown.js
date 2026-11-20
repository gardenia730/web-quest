// =========================================================
// 1. 9/21 王俊凱生日倒數計時器
// =========================================================
function updateBirthdayCountdown() {
  const titleEl = document.getElementById("countdown-title");
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");

  if (!titleEl || !daysEl) return;

  const now = new Date();
  const targetYear = now.getFullYear();
  let birthday = new Date(targetYear, 8, 21, 0, 0, 0);

  if (now.getMonth() === 8 && now.getDate() === 21) {
    titleEl.textContent = "🎉 今天是小凱生日！生日快樂🩵";
    daysEl.textContent = "09";
    hoursEl.textContent = "21";
    minsEl.textContent = "🎂";
    secsEl.textContent = "🩵";
    return;
  }

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

updateBirthdayCountdown();
setInterval(updateBirthdayCountdown, 1000);

// =========================================================
// 2. 演唱會「藍色星海」夜間模式切換（同步記錄到瀏覽器）
// =========================================================
const themeBtn = document.getElementById("starlight-toggle");

function applySavedTheme() {
  const savedTheme = localStorage.getItem("karry_theme");
  if (savedTheme === "starlight") {
    document.body.classList.remove("theme-blue");
    document.body.classList.add("theme-starlight");
    if (themeBtn) themeBtn.textContent = "☀️ 切回日間藍";
  }
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isStarlight = document.body.classList.toggle("theme-starlight");
    document.body.classList.toggle("theme-blue", !isStarlight);
    themeBtn.textContent = isStarlight ? "☀️ 切回日間藍" : "🌌 點亮藍色星海";
    localStorage.setItem("karry_theme", isStarlight ? "starlight" : "blue");
  });
}
applySavedTheme();

// =========================================================
// 3. 實體 PVC 應援識別證生成器（支援 localStorage 永久保留）
// =========================================================
const fanForm = document.getElementById("fan-form");
const ticketWall = document.getElementById("ticket-wall");

function renderTicket(ticketData, prepend = false) {
  if (!ticketWall) return;

  const card = document.createElement("article");
  card.className = "fan-id-card";
  card.innerHTML = `
    <div class="id-header">
      <div class="id-lanyard-slot"></div>
      <span class="id-org">KARRY WANG FAN CLUB · OFFICIAL PASS</span>
      <div class="id-title">🦀 凱皇帝國 · 小螃蟹專屬應援證</div>
    </div>

    <div class="id-body">
      <div class="id-photo-wrap">
        <img src="images/Karry.svg" alt="小凱應援頭像">
        <span class="id-holo-seal">VIP 0921</span>
      </div>

      <div class="id-fields">
        <div class="id-field-row">
          <span class="id-label">持證人暱稱 / NAME</span>
          <span class="id-value">${ticketData.nickname}</span>
        </div>
        <div class="id-field-row">
          <span class="id-label">入坑等級 / RANK</span>
          <span class="id-level-tag">${ticketData.level}</span>
        </div>
        <div class="id-field-row">
          <span class="id-label">本命屬性 / FAVORITE</span>
          <span class="id-value" style="font-size:0.9rem;">${ticketData.favorite}</span>
        </div>
        <div>
          <span class="id-label">應援解鎖 / UNLOCK</span>
          <span class="id-value" style="font-size:0.88rem;">${ticketData.appearances}</span>
        </div>
      </div>
    </div>

    <div class="id-quote">
      💬 <strong>入坑宣言：</strong>「${ticketData.message}」
    </div>

    <div class="id-footer">
      <span class="id-stamp">小螃蟹後援會 · 核發認證</span>
      <div class="id-serial">
        <div>NO.${ticketData.id} ｜ ${ticketData.date}</div>
        <div class="id-bars">|| ||| | |||| || | |||</div>
      </div>
    </div>
  `;

  if (prepend) {
    ticketWall.prepend(card);
  } else {
    ticketWall.appendChild(card);
  }
}

function loadTickets() {
  if (!ticketWall) return;
  const saved = JSON.parse(localStorage.getItem("karry_tickets") || "[]");
  if (saved.length === 0) {
    renderTicket({
      id: "0921",
      nickname: "八年小螃蟹代表",
      level: "死忠粉 🦀",
      favorite: "只要是他都喜歡",
      appearances: "唱歌、演戲",
      message: "從開始到未來，只為王俊凱！歡迎新朋友一起跳進這個坑🩵",
      date: "2026/09/21"
    });
  } else {
    saved.forEach((item) => renderTicket(item));
  }
}

if (fanForm) {
  fanForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nicknameInput = document.getElementById("nickname").value.trim();
    const nickname = nicknameInput || "匿名小螃蟹";
    const levelEl = document.querySelector('input[name="level"]:checked');
    const level = levelEl ? levelEl.parentElement.textContent.trim() : "已粉上 🩵";
    const favorite = document.getElementById("favorite").value;

    const checkedBoxes = Array.from(document.querySelectorAll('input[name="appearance"]:checked'))
      .map((cb) => cb.value);
    const appearances = checkedBoxes.length > 0 ? checkedBoxes.join("、") : "全部都想看";

    const messageInput = document.getElementById("message").value.trim();
    const message = messageInput || "凱皇衝鴨！永遠支持你🩵";

    const now = new Date();
    const dateStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;
    const randomNo = String(Math.floor(1000 + Math.random() * 9000));

    const newTicket = {
      id: randomNo,
      nickname,
      level,
      favorite,
      appearances,
      message,
      date: dateStr
    };

    renderTicket(newTicket, true);

    const saved = JSON.parse(localStorage.getItem("karry_tickets") || "[]");
    saved.unshift(newTicket);
    localStorage.setItem("karry_tickets", JSON.stringify(saved));

    fanForm.reset();
  });
}

loadTickets();