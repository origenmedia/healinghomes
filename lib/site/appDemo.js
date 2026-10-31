// The La Obra app demo from mock-up set 3. Runs once the phone mock is on the page.
export function initAppDemo() {
  if (!document.getElementById('screen')) return;

  var body = document.getElementById('body');
  var tabs = document.querySelectorAll('.tabs [data-tab]');
  var state = { tab: 'home', approved: false, paid: false, asked: false, receipt: null, photo: null };
  var receipts = [
    { d: 'Oct 21', w: 'Cement, 40 bags', s: 'Building supply', a: 428, items: [['Gray cement, 50 kg', '40', '$400.00'], ['Delivery', '1', '$28.00']] },
    { d: 'Oct 20', w: 'Crew pay, week 18', s: '6 masons, 6 days', a: 1980, items: [['Master mason', '1', '$450.00'], ['Masons', '5', '$1,530.00']] },
    { d: 'Oct 18', w: 'Clay bricks, 4,000', s: 'Brick yard', a: 1310, items: [['Thin clay brick', '4,000', '$1,240.00'], ['Truck', '1', '$70.00']] },
    { d: 'Oct 16', w: 'Wall forms, pine', s: 'Lumber yard', a: 640, items: [['Pine boards', '60', '$540.00'], ['Bolts and pins', '1 box', '$100.00']] },
    { d: 'Oct 15', w: 'Tools and wire', s: 'Hardware store', a: 96, items: [['Tie wire', '2 rolls', '$34.00'], ['Trowels', '4', '$62.00']] }
  ];
  var photos = [
    { src: '/site/build-walls.jpg', t: 'Walls going up', w: '2 days ago' },
    { src: '/site/nathaniel-on-site.jpg', t: 'Site check with Nathaniel', w: 'Last week' },
    { src: '/site/build-structure.jpg', t: 'Foundation and columns', w: '3 weeks ago' }
  ];
  var stages = [
    ['Plans and permits', 12000, 12000], ['Foundation', 22000, 21400], ['Water tank', 14000, 14600], ['Walls', 38000, 33600],
    ['Roof and brick vault', 34000, 0], ['Solar and water', 22000, 0], ['Finishes', 42000, 0], ['Garden and keys', 20000, 0]
  ];
  function $(n) { return '$' + n.toLocaleString('en-US'); }
  function track() {
    var h = '<div class="track" aria-hidden="true">';
    for (var i = 0; i < 8; i++) { h += '<i class="' + (i <= 3 ? 'on' : '') + '"></i>' + (i < 7 ? '<b class="' + (i < 3 ? 'on' : '') + '"></b>' : ''); }
    return h + '</div><div class="now">Now: <b>Walls</b>, stage 4 of 8</div>';
  }
  function waitCard() {
    var h = '<div class="wait" id="wait">';
    if (!state.approved) {
      h += '<span><b>Waiting for you:</b> Nathaniel asks for $34,000 for the roof stage. The walls are done. 6 new photos.</span>' +
           '<div class="row"><button type="button" class="go" data-act="approve">Approve</button><button type="button" data-act="ask">Ask a question</button></div>';
    } else if (!state.paid) {
      h += '<span class="ok">Approved.</span><span>You pay for the roof stage, and the app marks it Paid.</span>';
    } else {
      h += '<span class="ok">Paid · $34,000 · Today</span><span>The roof stage starts Monday. You will see photos as it goes up.</span>';
    }
    if (state.asked) {
      h += '<div class="chat"><p class="me">Why did the water tank cost $600 more?</p><p class="him">Steel went up that week. The receipt is in Money. Nathaniel</p></div>';
    }
    return h + '</div>';
  }
  function render() {
    var h = '';
    if (state.tab === 'home') {
      h += track();
      h += '<div class="ph"><img src="' + photos[0].src + '" alt="Masonry walls and columns going up on the building site."></div><div class="cap">' + photos[0].t + ' · ' + photos[0].w + '</div>';
      h += '<div class="money"><div><span>Planned</span><span>$204,000</span></div><div><span>Spent</span><span>$81,600</span></div><span class="bar"><i style="width: 40%"></i></span><div><span>Left</span><b>$122,400</b></div></div>';
      h += waitCard();
    } else if (state.tab === 'money') {
      if (state.receipt !== null) {
        var r = receipts[state.receipt];
        h += '<button type="button" class="back" data-act="back">Back to money</button><div class="receipt"><div class="tl">' + r.s.toUpperCase() + '</div><div style="text-align:center">' + r.d + ', 2026</div><hr>';
        r.items.forEach(function (it) { h += '<div class="ln"><span>' + it[0] + ' × ' + it[1] + '</span><span>' + it[2] + '</span></div>'; });
        h += '<hr><div class="ln"><b>TOTAL</b><b>' + $(r.a) + '.00</b></div></div><div class="cap">Added by Nathaniel the same day, with a photo of the paper receipt.</div>';
      } else {
        h += '<div class="money" style="border-top:0;padding-top:0"><div><span>Money in</span><span>$102,000</span></div><div><span>Spent</span><span>$81,600</span></div><div><span>In hand</span><b>$20,400</b></div></div><div class="rows">';
        receipts.forEach(function (r, i) {
          h += '<button type="button" data-receipt="' + i + '" id="rc' + i + '"><span class="thumb" aria-hidden="true"><i></i><i></i><i style="width:60%"></i><i></i></span><span class="what"><b>' + r.w + '</b><span>' + r.d + ' · ' + r.s + '</span></span><span class="amt">' + $(r.a) + '</span></button>';
        });
        h += '</div>';
      }
    } else if (state.tab === 'photos') {
      if (state.photo !== null) {
        var p = photos[state.photo];
        h += '<button type="button" class="back" data-act="back">Back to photos</button><div class="ph" style="aspect-ratio:4/3"><img src="' + p.src + '" alt="' + p.t + '"></div><div class="cap">' + p.t + ' · ' + p.w + ' · posted by Nathaniel</div>';
      } else {
        h += '<div class="chips"><span>Foundation</span><span>Water tank</span><span class="on">Walls</span><span>Roof</span></div><div class="grid">';
        photos.forEach(function (p, i) { h += '<button type="button" data-photo="' + i + '" id="pc' + i + '"><span class="ph"><img src="' + p.src + '" alt="' + p.t + '"></span><small>' + p.t + '</small></button>'; });
        h += '<div class="soon">Roof photos come next week</div></div>';
      }
    } else {
      h += '<div class="money" style="border-top:0;padding-top:0"><div><span>Planned</span><span>$204,000</span></div><div><span>Spent</span><span>$81,600</span></div></div>';
      stages.forEach(function (s) {
        var pct = Math.min(100, Math.round(s[2] / s[1] * 100));
        h += '<div class="stage"><div><span>' + s[0] + '</span><span>' + $(s[2]) + ' of ' + $(s[1]) + '</span></div><span class="bar"><i class="' + (pct >= 100 ? 'full' : '') + '" style="width:' + pct + '%"></i></span>' +
             (s[2] > s[1] ? '<span class="over">Over by ' + $(s[2] - s[1]) + '. Paid from the surprises fund.</span>' : '') + '</div>';
      });
    }
    body.innerHTML = h;
    tabs.forEach(function (t) { t.setAttribute('aria-selected', String(t.getAttribute('data-tab') === state.tab)); });
  }
  function go(tab) { state.tab = tab; state.receipt = null; state.photo = null; render(); body.scrollTop = 0; }
  tabs.forEach(function (t) { t.addEventListener('click', function () { stop(); go(t.getAttribute('data-tab')); }); });
  body.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    var act = b.getAttribute('data-act');
    if (act === 'approve') { state.approved = true; render(); setTimeout(function () { state.paid = true; if (state.tab === 'home') render(); }, 1800); }
    else if (act === 'ask') { state.asked = true; render(); }
    else if (act === 'back') { state.receipt = null; state.photo = null; render(); }
    else if (b.hasAttribute('data-receipt')) { state.receipt = +b.getAttribute('data-receipt'); render(); }
    else if (b.hasAttribute('data-photo')) { state.photo = +b.getAttribute('data-photo'); render(); }
  });
  var timers = [];
  var line = document.getElementById('playline');
  function stop() { timers.forEach(clearTimeout); timers = []; }
  function flash(id) { var el = document.getElementById(id); if (el) { el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); } }
  var script = [
    [0, 'Monday, 7:40 am. Nathaniel posts photos of the walls.', function () { go('photos'); flash('pc0'); }],
    [3200, 'Wednesday, 11:15 am. He buys cement. The receipt goes in on the spot.', function () { go('money'); flash('rc0'); }],
    [6400, 'Friday, 6 pm. The walls are done. He asks for the next payment, with photos.', function () { state.approved = false; state.paid = false; go('home'); flash('wait'); }],
    [9600, 'Saturday, 9 am. You look at the photos. Then you tap Approve.', function () { flash('wait'); }]
  ];
  document.getElementById('play').addEventListener('click', function () {
    stop();
    script.forEach(function (s) { timers.push(setTimeout(function () { line.textContent = s[1]; s[2](); }, s[0])); });
  });
  render();
}
