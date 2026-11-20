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
// 2. 演唱會「藍色星海」夜間模式切換
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
// 3. 實體 PVC 應援識別證生成器（不保留歷史紀錄版）
// =========================================================
const fanForm = document.getElementById("fan-form");
const ticketWall = document.getElementById("ticket-wall");

// 自動清除瀏覽器先前存下來的舊識別證紀錄
localStorage.removeItem("karry_tickets");

function renderTicket(ticketData) {
  if (!ticketWall) return;

  // 若你希望每次送出只顯示「最新這一張」（不往上疊加），保留下面這行；
  // 若希望同一次瀏覽期間可以連續生成多張，把這行刪掉即可。
  ticketWall.innerHTML = "";

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

  ticketWall.appendChild(card);
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

    renderTicket({
      id: randomNo,
      nickname,
      level,
      favorite,
      appearances,
      message,
      date: dateStr
    });

    fanForm.reset();
  });
}