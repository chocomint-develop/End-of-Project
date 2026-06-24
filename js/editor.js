document.addEventListener('DOMContentLoaded', () => {
    const codeArea = document.getElementById('code');
    const previewFrame = document.getElementById('preview-frame');
    const btnRun = document.getElementById('btn-run');
    const btnClear = document.getElementById('btn-clear');

    // 1. Lấy code từ sessionStorage mà trang lý thuyết vừa gửi qua
    const incomingCode = sessionStorage.getItem('shared_html_code');
    
    if (incomingCode) {
        codeArea.value = incomingCode;
    } else {
        // Code mặc định nếu người dùng truy cập trực tiếp vào editor.html
        codeArea.value = "<!DOCTYPE html>\n<html>\n<body>\n\n<h1>Bắt đầu viết code...</h1>\n\n</body>\n</html>";
    }

    // 2. Hàm xử lý render code vào iframe
    function runCode() {
        const code = codeArea.value;
        const targetDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
        targetDoc.open();
        targetDoc.write(code);
        targetDoc.close();
    }

    // Tự động chạy code ngay khi vừa mở trang
    runCode();

    // 3. Lắng nghe sự kiện nút bấm
    btnRun.addEventListener('click', runCode);

    btnClear.addEventListener('click', () => {
        codeArea.value = '';
        runCode();
    });

   
    // Phím tắt Ctrl + Enter để chạy nhanh
    codeArea.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            runCode();
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            
            const start = codeArea.selectionStart;
            const end = codeArea.selectionEnd;
            
            codeArea.value = codeArea.value.substring(0, start) + '  ' + codeArea.value.substring(end);
            codeArea.selectionStart = codeArea.selectionEnd = start + 2;
        }
    });
});