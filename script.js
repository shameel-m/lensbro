document.querySelectorAll("[data-nav]").forEach(function (e) {
  e.innerHTML =
    '<div class="nr">' +
    [
      ["Home", "home"],
      ["Bookings", "cal"],
      ["Inbox", "inbox"],
      ["Profile", "user"],
    ]
      .map(function (a, k) {
        return (
          "<div" +
          (k == e.dataset.nav ? ' class="on"' : "") +
          '><i data-i="' +
          a[1] +
          '"></i>' +
          a[0] +
          "</div>"
        );
      })
      .join("") +
    '</div><div class="hb"></div>';
});
document.querySelectorAll("[data-i]").forEach(function (e) {
  e.innerHTML = '<svg class="i"><use href="#' + e.dataset.i + '"/></svg>';
});
var S = [].slice.call(document.querySelectorAll(".phone")),
  T = document.getElementById("t"),
  D = document.getElementById("d"),
  C = document.getElementById("c"),
  F = document.getElementById("fit"),
  n = 0;
S.forEach(function (s, k) {
  var b = document.createElement("button");
  b.title = s.dataset.t;
  b.onclick = function () {
    nav(k);
  };
  D.appendChild(b);
});
function go(k) {
  n = k;
  S.forEach(function (s, j) {
    s.classList.toggle("on", j == n);
  });
  [].forEach.call(D.children, function (b, j) {
    b.classList.toggle("on", j == n);
  });
  T.textContent = S[n].dataset.t;
  C.textContent = n + 1 + " / " + S.length;
}
function nav(k) {
  k = Math.max(0, Math.min(S.length - 1, k));
  location.hash = S[k].id;
}
function show() {
  var k = S.findIndex(function (s) {
    return s.id == location.hash.slice(1);
  });
  go(k < 0 ? 0 : k);
}
function fit() {
  var h = document.getElementById("stage").clientHeight - 6,
    w = innerWidth - 24,
    s = Math.min(h / 650, w / 340, 2.2);
  document.documentElement.style.setProperty("--s", s);
  F.style.width = 340 * s + "px";
  F.style.height = 650 * s + "px";
}
addEventListener("hashchange", show);
addEventListener("resize", fit);
addEventListener("keydown", function (e) {
  if (["ArrowRight", "ArrowDown", "PageDown", " "].indexOf(e.key) > -1) {
    e.preventDefault();
    nav(n + 1);
  } else if (["ArrowLeft", "ArrowUp", "PageUp"].indexOf(e.key) > -1) {
    e.preventDefault();
    nav(n - 1);
  } else if (e.key == "Home") nav(0);
  else if (e.key == "End") nav(S.length - 1);
});
show();
fit();
