<?php
session_start();

$ADMIN_PASSWORD = 'drsport2024';
$CONTENT_FILE = dirname(__DIR__) . '/content.json';

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}

// Handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
    if ($_POST['password'] === $ADMIN_PASSWORD) {
        $_SESSION['admin_auth'] = true;
    } else {
        $loginError = 'סיסמה שגויה';
    }
}

// Handle save
$saveMsg = '';
$saveType = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['content_json']) && !empty($_SESSION['admin_auth'])) {
    $jsonStr = $_POST['content_json'];
    $decoded = json_decode($jsonStr, true);
    if ($decoded === null) {
        $saveMsg = 'שגיאה: JSON לא תקין';
        $saveType = 'error';
    } else {
        file_put_contents($CONTENT_FILE, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        $saveMsg = 'השינויים נשמרו בהצלחה!';
        $saveType = 'success';
    }
}

// Load current content
$content = [];
if (file_exists($CONTENT_FILE)) {
    $content = json_decode(file_get_contents($CONTENT_FILE), true) ?? [];
}

$isAuth = !empty($_SESSION['admin_auth']);
?>
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ד״ר ספורט — ניהול</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
  <style>
    body { background: #050E1F; color: #F0F4FF; direction: rtl; }
    .navbar { background: #0D1B35 !important; border-bottom: 1px solid rgba(43,87,184,0.4); }
    .navbar-brand { color: #00E676 !important; font-weight: 800; }
    .nav-link { color: #8BA4C8 !important; }
    .nav-link.active, .nav-link:hover { color: #00E676 !important; }
    .card { background: #0D1B35; border: 1px solid rgba(43,87,184,0.3); color: #F0F4FF; }
    .form-control, .form-select {
      background: rgba(43,87,184,0.1) !important;
      border: 1px solid rgba(43,87,184,0.4) !important;
      color: #F0F4FF !important;
    }
    .form-control:focus, .form-select:focus {
      border-color: #00E676 !important;
      box-shadow: 0 0 0 0.15rem rgba(0,230,118,0.2) !important;
    }
    .form-label { color: #8BA4C8; font-size: 0.8rem; font-weight: 600; }
    .btn-success { background: #00E676 !important; border-color: #00E676 !important; color: #050E1F !important; font-weight: 700; }
    .btn-success:hover { background: #00c864 !important; }
    .btn-danger { background: rgba(255,59,48,0.2) !important; border: 1px solid rgba(255,59,48,0.4) !important; color: #FF3B30 !important; }
    .btn-outline-success { border-color: #00E676 !important; color: #00E676 !important; }
    .btn-outline-success:hover { background: rgba(0,230,118,0.15) !important; }
    .tab-content { padding-top: 24px; }
    .nav-tabs { border-bottom: 1px solid rgba(43,87,184,0.3); }
    .nav-tabs .nav-link { background: none; color: #8BA4C8 !important; border: none; border-bottom: 2px solid transparent; }
    .nav-tabs .nav-link.active { color: #00E676 !important; border-bottom-color: #00E676; background: rgba(0,230,118,0.05) !important; }
    .athlete-card { background: rgba(43,87,184,0.08); border: 1px solid rgba(43,87,184,0.25); border-radius: 12px; padding: 16px; margin-bottom: 16px; }
    .section-divider { border-color: rgba(43,87,184,0.3); margin: 24px 0; }
    .login-wrap { max-width: 380px; margin: 100px auto; }
    .alert-success-custom { background: rgba(0,230,118,0.15); border: 1px solid rgba(0,230,118,0.4); color: #00E676; }
    .alert-error-custom { background: rgba(255,59,48,0.15); border: 1px solid rgba(255,59,48,0.4); color: #FF3B30; }
    .range-label { color: #00E676; font-weight: 700; }
    input[type=range] { accent-color: #00E676; }
  </style>
</head>
<body>

<?php if (!$isAuth): ?>
<!-- LOGIN SCREEN -->
<div class="login-wrap">
  <div class="card p-4">
    <h2 class="text-center mb-4" style="color:#00E676; font-weight:800;">ד״ר ספורט — ניהול</h2>
    <?php if (!empty($loginError)): ?>
      <div class="alert alert-error-custom mb-3"><?= htmlspecialchars($loginError) ?></div>
    <?php endif; ?>
    <form method="POST">
      <div class="mb-3">
        <label class="form-label">סיסמת ניהול</label>
        <input type="password" name="password" class="form-control text-center" placeholder="הזן סיסמה" autofocus />
      </div>
      <button type="submit" class="btn btn-success w-100">כניסה</button>
    </form>
  </div>
</div>

<?php else: ?>
<!-- ADMIN PANEL -->
<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <span class="navbar-brand">ד״ר ספורט <span style="color:#8BA4C8; font-weight:400;">— לוח ניהול</span></span>
    <a href="?logout=1" class="nav-link ms-auto">יציאה</a>
  </div>
</nav>

<div class="container-fluid py-4 px-4" style="max-width:980px;">

  <?php if ($saveMsg): ?>
    <div class="alert <?= $saveType === 'success' ? 'alert-success-custom' : 'alert-error-custom' ?> mb-4">
      <?= htmlspecialchars($saveMsg) ?>
    </div>
  <?php endif; ?>

  <form method="POST" id="adminForm">
    <!-- Hidden field that will hold the JSON -->
    <input type="hidden" name="content_json" id="content_json_field" />

    <!-- Tabs -->
    <ul class="nav nav-tabs" id="adminTabs">
      <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#tab-ticker">טיקר</a></li>
      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-athletes">שיקום</a></li>
      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-hero">גיבור</a></li>
      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-treatments">טיפולים</a></li>
      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-shop">חנות</a></li>
      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-contact">צור קשר</a></li>
    </ul>

    <div class="tab-content">

      <!-- TICKER TAB -->
      <div class="tab-pane fade show active" id="tab-ticker">
        <h5 class="mb-3" style="color:#F0F4FF;">פריטי הטיקר</h5>
        <div id="ticker-items">
          <?php foreach (($content['ticker'] ?? []) as $i => $item): ?>
          <div class="d-flex gap-2 mb-2 ticker-row">
            <input type="text" class="form-control" name="ticker[]" value="<?= htmlspecialchars($item) ?>" />
            <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.ticker-row').remove()">מחק</button>
          </div>
          <?php endforeach; ?>
        </div>
        <button type="button" class="btn btn-outline-success btn-sm mt-2" onclick="addTickerRow()">+ הוסף מבזק</button>
      </div>

      <!-- ATHLETES TAB -->
      <div class="tab-pane fade" id="tab-athletes">
        <h5 class="mb-3" style="color:#F0F4FF;">ספורטאים בשיקום</h5>
        <div id="athletes-items">
          <?php foreach (($content['athletes'] ?? []) as $i => $a): ?>
          <div class="athlete-card">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <strong><?= htmlspecialchars($a['name'] ?? '') ?></strong>
              <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.athlete-card').remove()">מחק</button>
            </div>
            <div class="row g-2 mb-2">
              <div class="col-md-6">
                <label class="form-label">שם</label>
                <input type="text" class="form-control" name="athletes[<?= $i ?>][name]" value="<?= htmlspecialchars($a['name'] ?? '') ?>" />
              </div>
              <div class="col-md-6">
                <label class="form-label">ענף ספורט</label>
                <input type="text" class="form-control" name="athletes[<?= $i ?>][sport]" value="<?= htmlspecialchars($a['sport'] ?? '') ?>" />
              </div>
            </div>
            <div class="mb-2">
              <label class="form-label">פציעה</label>
              <input type="text" class="form-control" name="athletes[<?= $i ?>][injury]" value="<?= htmlspecialchars($a['injury'] ?? '') ?>" />
            </div>
            <div class="row g-2 mb-2">
              <div class="col-md-6">
                <label class="form-label">שלב שיקום</label>
                <input type="text" class="form-control" name="athletes[<?= $i ?>][phase]" value="<?= htmlspecialchars($a['phase'] ?? '') ?>" />
              </div>
              <div class="col-md-6">
                <label class="form-label">צבע תג</label>
                <input type="text" class="form-control" name="athletes[<?= $i ?>][phaseColor]" value="<?= htmlspecialchars($a['phaseColor'] ?? '#8BA4C8') ?>" />
              </div>
            </div>
            <div class="mb-2">
              <label class="form-label">התקדמות שיקום: <span class="range-label"><?= (int)($a['progress'] ?? 0) ?>%</span></label>
              <input type="range" class="form-range" min="0" max="100" name="athletes[<?= $i ?>][progress]" value="<?= (int)($a['progress'] ?? 0) ?>"
                oninput="this.previousElementSibling.querySelector('.range-label').textContent=this.value+'%'" />
            </div>
            <div class="mb-2">
              <label class="form-label">צפי חזרה (ETA)</label>
              <input type="text" class="form-control" name="athletes[<?= $i ?>][eta]" value="<?= htmlspecialchars($a['eta'] ?? '') ?>" />
            </div>
            <div class="mb-2">
              <label class="form-label">תיאור</label>
              <textarea class="form-control" name="athletes[<?= $i ?>][description]" rows="4"><?= htmlspecialchars($a['description'] ?? '') ?></textarea>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
        <button type="button" class="btn btn-outline-success btn-sm" onclick="addAthleteRow()">+ הוסף ספורטאי</button>

        <hr class="section-divider" />
        <h5 class="mb-3" style="color:#F0F4FF;">סטטיסטיקות שיקום</h5>
        <div class="row g-3">
          <?php foreach (($content['recoveryStats'] ?? []) as $i => $stat): ?>
          <div class="col-md-6">
            <label class="form-label">תווית <?= $i + 1 ?></label>
            <input type="text" class="form-control mb-1" name="recoveryStats[<?= $i ?>][label]" value="<?= htmlspecialchars($stat['label'] ?? '') ?>" />
            <label class="form-label">ערך <?= $i + 1 ?></label>
            <input type="text" class="form-control" name="recoveryStats[<?= $i ?>][value]" value="<?= htmlspecialchars($stat['value'] ?? '') ?>" />
          </div>
          <?php endforeach; ?>
        </div>
      </div>

      <!-- HERO TAB -->
      <div class="tab-pane fade" id="tab-hero">
        <h5 class="mb-3" style="color:#F0F4FF;">גיבור הסקשן</h5>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">תג (Badge)</label>
            <input type="text" class="form-control" name="hero[badge]" value="<?= htmlspecialchars($content['hero']['badge'] ?? '') ?>" />
          </div>
          <div class="col-md-6">
            <label class="form-label">טלפון</label>
            <input type="text" class="form-control" name="hero[phone]" value="<?= htmlspecialchars($content['hero']['phone'] ?? '') ?>" />
          </div>
          <div class="col-12">
            <label class="form-label">כותרת ראשית</label>
            <input type="text" class="form-control" name="hero[title]" value="<?= htmlspecialchars($content['hero']['title'] ?? '') ?>" />
          </div>
          <div class="col-12">
            <label class="form-label">כותרת משנה</label>
            <input type="text" class="form-control" name="hero[subtitle]" value="<?= htmlspecialchars($content['hero']['subtitle'] ?? '') ?>" />
          </div>
          <div class="col-12">
            <label class="form-label">תיאור</label>
            <textarea class="form-control" name="hero[description]" rows="3"><?= htmlspecialchars($content['hero']['description'] ?? '') ?></textarea>
          </div>
          <div class="col-md-6">
            <label class="form-label">כפתור ראשי (CTA Primary)</label>
            <input type="text" class="form-control" name="hero[ctaPrimary]" value="<?= htmlspecialchars($content['hero']['ctaPrimary'] ?? '') ?>" />
          </div>
          <div class="col-md-6">
            <label class="form-label">כפתור משני (CTA Secondary)</label>
            <input type="text" class="form-control" name="hero[ctaSecondary]" value="<?= htmlspecialchars($content['hero']['ctaSecondary'] ?? '') ?>" />
          </div>
        </div>
      </div>

      <!-- TREATMENTS TAB -->
      <div class="tab-pane fade" id="tab-treatments">
        <h5 class="mb-3" style="color:#F0F4FF;">טיפולים קליניים</h5>
        <div id="treatments-items">
          <?php foreach (($content['treatments'] ?? []) as $i => $t): ?>
          <div class="athlete-card">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <strong><?= htmlspecialchars($t['icon'] ?? '') ?> <?= htmlspecialchars($t['title'] ?? '') ?></strong>
              <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.athlete-card').remove()">מחק</button>
            </div>
            <div class="row g-2 mb-2">
              <div class="col-md-6">
                <label class="form-label">אייקון (emoji)</label>
                <input type="text" class="form-control" name="treatments[<?= $i ?>][icon]" value="<?= htmlspecialchars($t['icon'] ?? '') ?>" />
              </div>
              <div class="col-md-6">
                <label class="form-label">צבע accent</label>
                <input type="text" class="form-control" name="treatments[<?= $i ?>][accent]" value="<?= htmlspecialchars($t['accent'] ?? '#2B57B8') ?>" />
              </div>
            </div>
            <div class="mb-2">
              <label class="form-label">כותרת</label>
              <input type="text" class="form-control" name="treatments[<?= $i ?>][title]" value="<?= htmlspecialchars($t['title'] ?? '') ?>" />
            </div>
            <div class="mb-2">
              <label class="form-label">תיאור</label>
              <textarea class="form-control" name="treatments[<?= $i ?>][description]" rows="3"><?= htmlspecialchars($t['description'] ?? '') ?></textarea>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
        <button type="button" class="btn btn-outline-success btn-sm" onclick="addTreatmentRow()">+ הוסף טיפול</button>
      </div>

      <!-- SHOP TAB -->
      <div class="tab-pane fade" id="tab-shop">
        <h5 class="mb-3" style="color:#F0F4FF;">החנות</h5>
        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <label class="form-label">כותרת החנות</label>
            <input type="text" class="form-control" name="shop[title]" value="<?= htmlspecialchars($content['shop']['title'] ?? '') ?>" />
          </div>
          <div class="col-md-6">
            <label class="form-label">מחיר מוצר</label>
            <input type="text" class="form-control" name="shop[price]" value="<?= htmlspecialchars($content['shop']['price'] ?? '') ?>" />
          </div>
          <div class="col-12">
            <label class="form-label">תת-כותרת</label>
            <input type="text" class="form-control" name="shop[subtitle]" value="<?= htmlspecialchars($content['shop']['subtitle'] ?? '') ?>" />
          </div>
          <div class="col-md-8">
            <label class="form-label">שם המוצר</label>
            <input type="text" class="form-control" name="shop[productName]" value="<?= htmlspecialchars($content['shop']['productName'] ?? '') ?>" />
          </div>
          <div class="col-md-4">
            <label class="form-label">עלות משלוח</label>
            <input type="text" class="form-control" name="shop[shippingCost]" value="<?= htmlspecialchars($content['shop']['shippingCost'] ?? '') ?>" />
          </div>
        </div>

        <h5 class="mb-3" style="color:#F0F4FF;">בקרוב בחנות</h5>
        <div id="coming-soon-items">
          <?php foreach (($content['shop']['comingSoon'] ?? []) as $i => $item): ?>
          <div class="d-flex gap-2 mb-2 coming-row">
            <input type="text" class="form-control" name="shop_coming[<?= $i ?>][name]" value="<?= htmlspecialchars($item['name'] ?? '') ?>" placeholder="שם המוצר" />
            <input type="text" class="form-control" style="max-width:120px;" name="shop_coming[<?= $i ?>][price]" value="<?= htmlspecialchars($item['price'] ?? '') ?>" placeholder="₪149" />
            <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.coming-row').remove()">מחק</button>
          </div>
          <?php endforeach; ?>
        </div>
        <button type="button" class="btn btn-outline-success btn-sm mt-2" onclick="addComingRow()">+ הוסף פריט</button>
      </div>

      <!-- CONTACT TAB -->
      <div class="tab-pane fade" id="tab-contact">
        <h5 class="mb-3" style="color:#F0F4FF;">צור קשר</h5>
        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <label class="form-label">כותרת</label>
            <input type="text" class="form-control" name="contact[title]" value="<?= htmlspecialchars($content['contact']['title'] ?? '') ?>" />
          </div>
          <div class="col-md-6">
            <label class="form-label">טלפון</label>
            <input type="text" class="form-control" name="contact[phone]" value="<?= htmlspecialchars($content['contact']['phone'] ?? '') ?>" />
          </div>
          <div class="col-12">
            <label class="form-label">תת-כותרת</label>
            <textarea class="form-control" name="contact[subtitle]" rows="2"><?= htmlspecialchars($content['contact']['subtitle'] ?? '') ?></textarea>
          </div>
          <div class="col-12">
            <label class="form-label">זמן מענה</label>
            <input type="text" class="form-control" name="contact[responseTime]" value="<?= htmlspecialchars($content['contact']['responseTime'] ?? '') ?>" />
          </div>
        </div>

        <h5 class="mb-3" style="color:#F0F4FF;">סיבות פנייה</h5>
        <div id="reasons-items">
          <?php foreach (($content['contact']['reasons'] ?? []) as $i => $r): ?>
          <div class="d-flex gap-2 mb-2 reason-row">
            <input type="text" class="form-control" name="reasons[]" value="<?= htmlspecialchars($r) ?>" />
            <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.reason-row').remove()">מחק</button>
          </div>
          <?php endforeach; ?>
        </div>
        <button type="button" class="btn btn-outline-success btn-sm mt-2" onclick="addReasonRow()">+ הוסף סיבה</button>
      </div>

    </div><!-- tab-content -->

    <div class="d-flex justify-content-center mt-5">
      <button type="submit" class="btn btn-success px-5 py-3" style="font-size:1.1rem;" onclick="buildJson()">שמור שינויים</button>
    </div>
  </form>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script>
  // Build the JSON from form fields before submit
  function buildJson() {
    const form = document.getElementById('adminForm');
    const data = {};

    // Hero
    data.hero = {};
    ['badge','title','subtitle','description','phone','ctaPrimary','ctaSecondary'].forEach(k => {
      const el = form.querySelector(`[name="hero[${k}]"]`);
      if (el) data.hero[k] = el.value;
    });

    // Ticker
    data.ticker = Array.from(form.querySelectorAll('[name="ticker[]"]')).map(el => el.value);

    // Athletes
    data.athletes = [];
    form.querySelectorAll('.athlete-card').forEach(card => {
      const obj = {};
      card.querySelectorAll('[name^="athletes["]').forEach(el => {
        const m = el.name.match(/athletes\[\d+\]\[(\w+)\]/);
        if (m) {
          const key = m[1];
          obj[key] = key === 'progress' ? parseInt(el.value) : el.value;
        }
      });
      if (obj.name !== undefined) data.athletes.push(obj);
    });

    // Recovery stats
    data.recoveryStats = [];
    const statLabels = form.querySelectorAll('[name^="recoveryStats["][name$="[label]"]');
    statLabels.forEach((el, i) => {
      const valEl = form.querySelector(`[name="recoveryStats[${i}][value]"]`);
      data.recoveryStats.push({ label: el.value, value: valEl ? valEl.value : '' });
    });

    // Treatments
    data.treatments = [];
    form.querySelectorAll('#treatments-items .athlete-card').forEach(card => {
      const obj = {};
      card.querySelectorAll('[name^="treatments["]').forEach(el => {
        const m = el.name.match(/treatments\[\d+\]\[(\w+)\]/);
        if (m) obj[m[1]] = el.value;
      });
      if (obj.title !== undefined) data.treatments.push(obj);
    });

    // Shop
    data.shop = {};
    ['title','subtitle','productName','price','shippingCost'].forEach(k => {
      const el = form.querySelector(`[name="shop[${k}]"]`);
      if (el) data.shop[k] = el.value;
    });
    data.shop.comingSoon = [];
    form.querySelectorAll('.coming-row').forEach((row, i) => {
      const nameEl = row.querySelector('[name^="shop_coming["][name$="[name]"]');
      const priceEl = row.querySelector('[name^="shop_coming["][name$="[price]"]');
      if (nameEl) data.shop.comingSoon.push({ name: nameEl.value, price: priceEl ? priceEl.value : '' });
    });

    // Contact
    data.contact = {};
    ['title','subtitle','phone','responseTime'].forEach(k => {
      const el = form.querySelector(`[name="contact[${k}]"]`);
      if (el) data.contact[k] = el.value;
    });
    data.contact.reasons = Array.from(form.querySelectorAll('[name="reasons[]"]')).map(el => el.value);

    document.getElementById('content_json_field').value = JSON.stringify(data, null, 2);
  }

  // Dynamic row adders
  function addTickerRow() {
    const div = document.createElement('div');
    div.className = 'd-flex gap-2 mb-2 ticker-row';
    div.innerHTML = '<input type="text" class="form-control" name="ticker[]" placeholder="מבזק חדש..." /><button type="button" class="btn btn-danger btn-sm" onclick="this.closest(\'.ticker-row\').remove()">מחק</button>';
    document.getElementById('ticker-items').appendChild(div);
  }

  function addAthleteRow() {
    const i = Date.now();
    const div = document.createElement('div');
    div.className = 'athlete-card';
    div.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <strong>ספורטאי חדש</strong>
        <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.athlete-card').remove()">מחק</button>
      </div>
      <div class="row g-2 mb-2">
        <div class="col-md-6"><label class="form-label">שם</label><input type="text" class="form-control" name="athletes[${i}][name]" value="ספורטאי חדש" /></div>
        <div class="col-md-6"><label class="form-label">ענף ספורט</label><input type="text" class="form-control" name="athletes[${i}][sport]" value="⚽ כדורגל" /></div>
      </div>
      <div class="mb-2"><label class="form-label">פציעה</label><input type="text" class="form-control" name="athletes[${i}][injury]" value="" /></div>
      <div class="row g-2 mb-2">
        <div class="col-md-6"><label class="form-label">שלב שיקום</label><input type="text" class="form-control" name="athletes[${i}][phase]" value="שלב 1 — לאחר ניתוח" /></div>
        <div class="col-md-6"><label class="form-label">צבע תג</label><input type="text" class="form-control" name="athletes[${i}][phaseColor]" value="#8BA4C8" /></div>
      </div>
      <div class="mb-2">
        <label class="form-label">התקדמות שיקום: <span class="range-label">10%</span></label>
        <input type="range" class="form-range" min="0" max="100" name="athletes[${i}][progress]" value="10" oninput="this.previousElementSibling.querySelector('.range-label').textContent=this.value+'%'" />
      </div>
      <div class="mb-2"><label class="form-label">צפי חזרה (ETA)</label><input type="text" class="form-control" name="athletes[${i}][eta]" value="" /></div>
      <div class="mb-2"><label class="form-label">תיאור</label><textarea class="form-control" name="athletes[${i}][description]" rows="3"></textarea></div>
    `;
    document.getElementById('athletes-items').appendChild(div);
  }

  function addTreatmentRow() {
    const i = Date.now();
    const div = document.createElement('div');
    div.className = 'athlete-card';
    div.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <strong>טיפול חדש</strong>
        <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.athlete-card').remove()">מחק</button>
      </div>
      <div class="row g-2 mb-2">
        <div class="col-md-6"><label class="form-label">אייקון (emoji)</label><input type="text" class="form-control" name="treatments[${i}][icon]" value="💊" /></div>
        <div class="col-md-6"><label class="form-label">צבע accent</label><input type="text" class="form-control" name="treatments[${i}][accent]" value="#2B57B8" /></div>
      </div>
      <div class="mb-2"><label class="form-label">כותרת</label><input type="text" class="form-control" name="treatments[${i}][title]" value="טיפול חדש" /></div>
      <div class="mb-2"><label class="form-label">תיאור</label><textarea class="form-control" name="treatments[${i}][description]" rows="3"></textarea></div>
    `;
    document.getElementById('treatments-items').appendChild(div);
  }

  function addComingRow() {
    const i = Date.now();
    const div = document.createElement('div');
    div.className = 'd-flex gap-2 mb-2 coming-row';
    div.innerHTML = `<input type="text" class="form-control" name="shop_coming[${i}][name]" placeholder="שם המוצר" /><input type="text" class="form-control" style="max-width:120px;" name="shop_coming[${i}][price]" placeholder="₪149" /><button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.coming-row').remove()">מחק</button>`;
    document.getElementById('coming-soon-items').appendChild(div);
  }

  function addReasonRow() {
    const div = document.createElement('div');
    div.className = 'd-flex gap-2 mb-2 reason-row';
    div.innerHTML = '<input type="text" class="form-control" name="reasons[]" placeholder="סיבה חדשה" /><button type="button" class="btn btn-danger btn-sm" onclick="this.closest(\'.reason-row\').remove()">מחק</button>';
    document.getElementById('reasons-items').appendChild(div);
  }
</script>
<?php endif; ?>
</body>
</html>
