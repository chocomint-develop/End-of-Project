document.querySelectorAll('.example-box').forEach(box => {
            const btn = box.querySelector('.btn-try');
            if (!btn) return;

            btn.addEventListener('click', async () => {
                const fileSrc = btn.getAttribute('data-src');
                let codeText = "";

                try {
                    //  Nếu nút bấm có data-src -> Fetch tải file độc lập từ ổ đĩa
                    if (fileSrc) {
                        const response = await fetch(fileSrc);
                        if (!response.ok) throw new Error("Không thể tải file code mẫu.");
                        codeText = await response.text();
                    } 
                    // Nếu không có data-src -> Tự lấy text hiển thị tại chỗ
                    else {
                        const codeBox = box.querySelector('.code-box');
                        if (codeBox) {
                            codeText = codeBox.innerText.replace(/\u00A0/g, ' ');
                        }
                    }

                    // Lưu vào bộ nhớ tạm và chuyển hướng sang trang làm việc (code-box.html)
                    if (codeText) {
                        sessionStorage.setItem('shared_html_code', codeText);
                        window.location.href = 'code-box.html';
                    } else {
                        alert("Không tìm thấy dữ liệu cấu trúc code!");
                    }

                } catch (error) {
                    console.error("Lỗi:", error);
                    alert("CẢNH BÁO BẢO MẬT TRÌNH DUYỆT:\nBạn không thể double-click mở trực tiếp file file:/// để chạy Fetch.\nHãy click chuột phải vào file chọn 'Open with Live Server' để chạy thử ổ đĩa local.");
                }
            });
        });