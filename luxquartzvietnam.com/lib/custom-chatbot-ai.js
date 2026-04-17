(function () {
  if (window.__luxChatbotAiInit) {
    return;
  }
  window.__luxChatbotAiInit = true;

  if (!document.body) {
    return;
  }

  const styleId = "lux-chatbot-ai-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .lux-chatbot-widget {
        position: fixed;
        right: 1rem;
        bottom: 3rem;
        z-index: 1000;
        font-family: "Trebuchet MS", Arial, sans-serif;
      }
      .lux-chatbot-toggle {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 0;
        background: #0076b3;
        color: #fff;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .lux-chatbot-window {
        position: absolute;
        right: 0;
        bottom: 72px;
        width: 340px;
        height: 430px;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        overflow: hidden;
        display: none;
        flex-direction: column;
      }
      .lux-chatbot-window.is-open {
        display: flex;
      }
      .lux-chatbot-header {
        background: #0076b3;
        color: #fff;
        padding: 12px 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 700;
      }
      .lux-chatbot-close {
        border: 0;
        background: transparent;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        line-height: 1;
        padding: 0;
      }
      .lux-chatbot-messages {
        flex: 1;
        padding: 12px;
        overflow-y: auto;
        background: #f7f8fa;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .lux-chatbot-message {
        max-width: 82%;
        padding: 10px 12px;
        border-radius: 10px;
        font-size: 14px;
        line-height: 1.4;
      }
      .lux-chatbot-message.bot {
        background: #e9ecef;
        color: #222;
        align-self: flex-start;
        border-bottom-left-radius: 0;
      }
      .lux-chatbot-message.user {
        background: #0076b3;
        color: #fff;
        align-self: flex-end;
        border-bottom-right-radius: 0;
      }
      .lux-chatbot-input {
        border-top: 1px solid #e5e5e5;
        background: #fff;
        padding: 10px;
        display: flex;
        gap: 8px;
      }
      .lux-chatbot-input input {
        flex: 1;
        border: 1px solid #d7dbe0;
        border-radius: 18px;
        padding: 10px 12px;
        font-size: 14px;
        outline: none;
      }
      .lux-chatbot-send {
        width: 38px;
        height: 38px;
        border: 0;
        border-radius: 50%;
        background: #0076b3;
        color: #fff;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .lux-chatbot-typing {
        display: none;
        align-self: flex-start;
        background: #e9ecef;
        padding: 10px 14px;
        border-radius: 20px;
      }
      .lux-chatbot-typing span {
        width: 6px;
        height: 6px;
        margin: 0 2px;
        display: inline-block;
        background: #6b7280;
        border-radius: 50%;
        animation: luxTyping 1.2s infinite ease-in-out;
      }
      .lux-chatbot-typing span:nth-child(2) { animation-delay: 0.2s; }
      .lux-chatbot-typing span:nth-child(3) { animation-delay: 0.4s; }
      @keyframes luxTyping {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      @media (max-width: 767.98px) {
        .lux-chatbot-widget {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const widget = document.createElement("div");
  widget.className = "lux-chatbot-widget";
  widget.innerHTML = `
    <div class="lux-chatbot-window" id="luxChatbotWindow">
      <div class="lux-chatbot-header">
        <span>LUX AI Assistant</span>
        <button type="button" class="lux-chatbot-close" id="luxChatbotClose" aria-label="Đóng">✕</button>
      </div>
      <div class="lux-chatbot-messages" id="luxChatbotMessages">
        <div class="lux-chatbot-message bot">Xin chào! Mình là trợ lý AI của LUX Quartz. Mình có thể tư vấn mẫu đá, báo giá và hỗ trợ chọn dòng phù hợp cho bạn.</div>
        <div class="lux-chatbot-typing" id="luxChatbotTyping"><span></span><span></span><span></span></div>
      </div>
      <div class="lux-chatbot-input">
        <input type="text" id="luxChatbotInput" placeholder="Nhập câu hỏi của bạn..." />
        <button type="button" class="lux-chatbot-send" id="luxChatbotSend" aria-label="Gửi">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm-.827-.827L1.523 6.602l11.854-3.692-7.568 7.333Z"/>
          </svg>
        </button>
      </div>
    </div>
    <button type="button" class="lux-chatbot-toggle" id="luxChatbotToggle" aria-label="Mở chatbot">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
      </svg>
    </button>
  `;

  document.body.appendChild(widget);

  const chatWindow = widget.querySelector("#luxChatbotWindow");
  const toggleButton = widget.querySelector("#luxChatbotToggle");
  const closeButton = widget.querySelector("#luxChatbotClose");
  const input = widget.querySelector("#luxChatbotInput");
  const sendButton = widget.querySelector("#luxChatbotSend");
  const messages = widget.querySelector("#luxChatbotMessages");
  const typing = widget.querySelector("#luxChatbotTyping");

  const scrollToBottom = () => {
    messages.scrollTop = messages.scrollHeight;
  };

  const addMessage = (text, role) => {
    const message = document.createElement("div");
    message.className = `lux-chatbot-message ${role}`;
    message.textContent = text;
    messages.insertBefore(message, typing);
    scrollToBottom();
  };

  const getReply = (text) => {
    const value = text.toLowerCase();
    if (value.includes("giá") || value.includes("bao nhiêu") || value.includes("chi phí")) {
      return "Giá sản phẩm thường dao động theo dòng đá và kích thước thi công. Bạn gửi kích thước mặt bếp để mình ước tính nhanh cho bạn nhé.";
    }
    if (value.includes("bảo hành") || value.includes("độ bền")) {
      return "Đá LUX Quartz có chính sách bảo hành chính hãng và độ bền cao cho khu vực bếp, lavabo, bàn đảo. Mình có thể gửi thông tin chi tiết theo từng dòng.";
    }
    if (value.includes("liên hệ") || value.includes("hotline") || value.includes("mua")) {
      return "Bạn có thể gọi Hotline +84 905645155, hoặc để lại số điện thoại để đội ngũ tư vấn liên hệ ngay.";
    }
    if (/(?:0|84|\+84)\d{9,10}/.test(value.replace(/\s+/g, ""))) {
      return "Cảm ơn bạn, đội ngũ tư vấn LUX sẽ liên hệ với bạn trong ít phút nữa.";
    }
    return "Mình đã ghi nhận thông tin. Bạn muốn tư vấn theo dòng Lux E, Lux G hay Lux Plus để mình gợi ý mẫu phù hợp ngay?";
  };

  const sendMessage = () => {
    const text = input.value.trim();
    if (!text) {
      return;
    }
    addMessage(text, "user");
    input.value = "";
    typing.style.display = "block";
    scrollToBottom();

    window.setTimeout(() => {
      typing.style.display = "none";
      addMessage(getReply(text), "bot");
    }, 900);
  };

  toggleButton.addEventListener("click", () => {
    chatWindow.classList.toggle("is-open");
    if (chatWindow.classList.contains("is-open")) {
      input.focus();
      scrollToBottom();
    }
  });

  closeButton.addEventListener("click", () => {
    chatWindow.classList.remove("is-open");
  });

  sendButton.addEventListener("click", sendMessage);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });
})();
