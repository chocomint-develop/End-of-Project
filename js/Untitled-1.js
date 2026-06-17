// script.js — Quiz Gamification (obfuscated)

;(function() {

// --- DỮ LIỆU CÂU HỎI (Base64 + thứ tự đáp án đã xáo, correct được hash) ---
var _Q = [
  {_q:"HTML là viết tắt của từ gì?",_a:["SG9tZSBUb29sIE1hcmt1cCBMYW5ndWFnZQ==","SHlwZXJsaW5rcyBhbmQgVGV4dCBNYXJrdXAgTGFuZ3VhZ2U=","SHlwZXIgVGV4dCBNYXJrdXAgTGFuZ3VhZ2U="],_h:51},
  {_q:"Thẻ nào dùng để tạo một liên kết (link) trong HTML?",_a:["Jmx0O2EmZ3Q7","Jmx0O2xpbmsmZ3Q7","Jmx0O2hyZWYmZ3Q7"],_h:237},
  {_q:"Trong CSS, thuộc tính nào dùng để thay đổi màu nền?",_a:["Ymdjb2xvcg==","Y29sb3I=","YmFja2dyb3VuZC1jb2xvcg=="],_h:51},
  {_q:"Cách nào đúng để viết một mảng (Array) trong JavaScript?",_a:["dmFyIGNvbG9ycyA9ICdyZWQnLCAnZ3JlZW4n","dmFyIGNvbG9ycyA9IFsncmVkJywgJ2dyZWVuJ10=","dmFyIGNvbG9ycyA9ICgxOidyZWQnLCAyOidncmVlbicp"],_h:220},
  {_q:"Làm sao để viết hàm trong JavaScript?",_a:["ZnVuY3Rpb24gPSBteUZ1bmN0aW9uKCk=","ZnVuY3Rpb24gbXlGdW5jdGlvbigp","ZnVuY3Rpb246bXlGdW5jdGlvbigp"],_h:220},
  {_q:"Sự kiện nào xảy ra khi người dùng click vào một phần tử HTML",_a:["b25jbGljaw==","b25tb3VzZW92ZXI=","b25jaGFuZ2U="],_h:237},
  {_q:"Trong CSS, làm thế nào để chọn một phần tử có id là demo?",_a:["KmRlbW8=","LmRlbW8=","I2RlbW8="],_h:51},
  {_q:"Thuộc tính CSS nào kiểm soát kích thước của văn bản?",_a:["dGV4dC1zaXpl","dGV4dC1zdHlsZQ==","Zm9udC1zaXpl"],_h:51},
  {_q:"Kết quả của biểu thức '5' + 5 trong JavaScript là gì?",_a:["RXJyb3I=","MTA=","NTU="],_h:51},
  {_q:"Giao thức nào bảo mật hơn khi truyền tải dữ liệu trên Web?",_a:["SFRUUFM=","SFRUUA==","RlRQ"],_h:237}
];

// --- Hàm tiện ích ---
var _S = 0x5E;
function _hc(i) { return ((i * 17 + _S) ^ 0xB3) & 0xFF; }
function _ic(i, h) { return _hc(i) === h; }
function _dec(b) {
  try { return atob(b); } catch(e) { return b; }
}

// --- Trạng thái ---
var _pts = 0, _qi = 0, _ca = 0;

// --- Cập nhật điểm trên UI ---
function _usd() {
  document.querySelectorAll('.global-score').forEach(function(el) {
    el.innerText = _pts;
  });
}

// --- Chuyển màn hình ---
function switchScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// --- Bắt đầu quiz ---
function startQuiz() {
  _qi = 0; _ca = 0;
  document.getElementById('live-score').innerText = '0 xu';
  _sq();
}

// --- Hiển thị câu hỏi ---
function _sq() {
  var cur = _Q[_qi];
  var pct = (_qi / _Q.length) * 100;
  document.getElementById('progress').style.width = pct + '%';
  document.getElementById('question-number').innerText = 'Câu hỏi ' + (_qi + 1) + '/' + _Q.length;
  document.getElementById('question-text').innerHTML = _dec(cur._q);

  var ac = document.getElementById('answers-container');
  ac.innerHTML = '';
  cur._a.forEach(function(ans, idx) {
    var li = document.createElement('li');
    li.className = 'answer-item';
    li.innerHTML = _dec(ans);
    li.onclick = (function(i, el) {
      return function() { _ck(i, el); };
    })(idx, li);
    ac.appendChild(li);
  });
}

// --- Kiểm tra đáp án ---
function _ck(sel, selEl) {
  var cur = _Q[_qi];
  var items = document.querySelectorAll('.answer-item');
  items.forEach(function(it) { it.classList.add('disabled'); });

  if (_ic(sel, cur._h)) {
    selEl.classList.add('correct');
    _ca++;
    document.getElementById('live-score').innerText = (_ca * 10) + ' xu';
  } else {
    selEl.classList.add('wrong');
    items.forEach(function(it, i) {
      if (_ic(i, cur._h)) it.classList.add('correct');
    });
  }

  setTimeout(function() {
    _qi++;
    if (_qi < _Q.length) { _sq(); } else { _eq(); }
  }, 1500);
}

// --- Kết thúc quiz ---
function _eq() {
  var pe = _ca * 10;
  _pts += pe;
  document.getElementById('correct-count').innerText = _ca;
  document.getElementById('earned-points').innerText = pe;
  _usd();
  switchScreen('screen-result');
}

// --- Đổi quà ---
function redeemReward(name, cost) {
  if (_pts >= cost) {
    _pts -= cost;
    _usd();
    alert('🎉 Tuyệt vời! Bạn đã đổi thành công: ' + name + '. Số dư còn lại: ' + _pts + ' xu.');
  } else {
    alert('❌ Bạn không đủ xu! Còn thiếu ' + (cost - _pts) + ' xu để nhận phần quà này.');
  }
}

// --- Export ra global scope để HTML gọi được ---
window.switchScreen   = switchScreen;
window.startQuiz      = startQuiz;
window.redeemReward   = redeemReward;

})();