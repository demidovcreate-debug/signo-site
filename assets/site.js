/* Signo website: speak English words with a British voice; close the language menu on outside click. No tracking. */
(function () {
  var synth = window.speechSynthesis;
  if (!synth || !window.SpeechSynthesisUtterance) { document.documentElement.classList.add('no-speech'); return; }
  var voice = null;
  function pick() {
    var v = synth.getVoices();
    voice = v.filter(function (x) { return x.lang === 'en-GB' || x.lang === 'en_GB'; })[0] || v.filter(function (x) { return /^en/i.test(x.lang); })[0] || null;
  }
  pick();
  if (synth.addEventListener) synth.addEventListener('voiceschanged', pick);
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-say]');
    if (!b) return;
    synth.cancel();
    var u = new SpeechSynthesisUtterance(b.getAttribute('data-say'));
    u.lang = 'en-GB'; u.rate = 0.9;
    if (voice) u.voice = voice;
    document.querySelectorAll('.say.playing').forEach(function (x) { x.classList.remove('playing'); });
    b.classList.add('playing');
    u.onend = u.onerror = function () { b.classList.remove('playing'); };
    synth.speak(u);
  });
})();
document.addEventListener('click', function (ev) {
  var d = document.querySelector('details.langs[open]');
  if (d && !d.contains(ev.target)) d.removeAttribute('open');
});
