const defaultCode = `<!DOCTYPE html>
<html lang= "vi">
<head>
  <meta charset="UTF-8">
  <title>Tiêu đề trang </title>
</head>
<body>
  <h1>Heading </h1>
  <p>Đoạn paragraph </p>
</body>
</html>`;

const textarea = document.getElementById('code');
const frame = document.getElementById('preview-frame');
const statusEl = document.getElementById('status');
let autoRunTimer = null;

// Khởi tạo nội dung mặc định và chạy lần đầu
textarea.value = defaultCode;
runCode();

// Hàm chạy code bằng cách tạo Blob URL
function runCode() {
  const html = textarea.value;
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  frame.src = url;
  
  const now = new Date();
  statusEl.textContent = `Đã cập nhật lúc ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')} — ${html.length} ký tự`;
}

// Bắt sự kiện gõ phím (áp dụng Debounce 800ms)
textarea.addEventListener('input', () => {
  clearTimeout(autoRunTimer);
  autoRunTimer = setTimeout(runCode, 800);
  statusEl.textContent = 'Đang soạn...';
});

// Bắt các phím tắt đặc biệt
textarea.addEventListener('keydown', e => {
  // Ctrl + Enter để chạy ngay
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    clearTimeout(autoRunTimer);
    runCode();
  }
  // Nhấn Tab để thụt lề thay vì nhảy focus
  if (e.key === 'Tab') {
    e.preventDefault();
    const s = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, s) + '  ' + textarea.value.slice(textarea.selectionEnd);
    textarea.selectionStart = textarea.selectionEnd = s + 2;
  }
});

// Các nút chức năng trên Toolbar
document.getElementById('btn-run').addEventListener('click', () => {
  clearTimeout(autoRunTimer);
  runCode();
});

document.getElementById('btn-clear').addEventListener('click', () => {
  if (confirm('Xoá toàn bộ code?')) {
    textarea.value = '';
    frame.src = 'about:blank';
    statusEl.textContent = 'Đã xoá';
  }
});

// Format Code cơ bản
document.getElementById('btn-format').addEventListener('click', () => {
  let code = textarea.value;
  let indent = 0;
  const lines = code.split('\n');
  const formatted = lines.map(line => {
    const t = line.trim();
    if (!t) return '';
    // Nếu là thẻ đóng, giảm thụt lề
    if (t.match(/^<\//)) indent = Math.max(0, indent - 1);
    const result = '  '.repeat(indent) + t;
    // Nếu là thẻ mở (không phải thẻ tự đóng), tăng thụt lề cho dòng tiếp theo
    if (t.match(/^<[^/!][^>]*[^/]>$/) && !t.match(/^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/i)) {
      indent++;
    }
    return result;
  });
  textarea.value = formatted.join('\n');
  runCode();
});

// Tính năng kéo thả thanh Divider để đổi kích thước 2 cột
const divider = document.getElementById('divider');
const panes = document.getElementById('panes');
let dragging = false, startX = 0, startLeft = 0;

divider.addEventListener('mousedown', e => {
  dragging = true;
  startX = e.clientX;
  startLeft = document.getElementById('editor-pane').offsetWidth;
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', e => {
  if (!dragging) return;
  const total = panes.offsetWidth;
  // Giới hạn chiều rộng tối thiểu là 200px mỗi bên
  const newLeft = Math.min(Math.max(startLeft + (e.clientX - startX), 200), total - 200);
  const pct = (newLeft / total * 100).toFixed(1);
  
  document.getElementById('editor-pane').style.width = pct + '%';
  document.getElementById('preview-pane').style.width = (100 - parseFloat(pct) - 0.5) + '%';
});

document.addEventListener('mouseup', () => {
  if (dragging) { 
    dragging = false; 
    document.body.style.cursor = ''; 
    document.body.style.userSelect = ''; 
  }
});