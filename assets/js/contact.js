document.addEventListener('DOMContentLoaded', function () {
  console.log('✅ contact.js is running');

  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('contact-success');

  if (!form) {
    console.error('❌ contact-form not found');
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const token = '8265567122:AAFVZX_NAGiUq2NVgZgvPHDUUBX7MjXJe_Q';
    const chatId = '6043494112';

    const name = form.name.value.trim();
    const telegram = form.telegram.value.trim();
    const message = form.message.value.trim();

    if (!name || !telegram || !message) {
      alert('⚠️ Please fill out all fields.');
      return;
    }

    const text = `📩 *New Contact Message*\n\n👤 *Name:* ${name}\n📨 *Telegram:* ${telegram}\n📝 *Message:*\n${message}`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'Markdown' })
    })
    .then(res => {
      if (res.ok) {
        form.reset();
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth' });
      } else {
        alert('❌ Failed to send message.');
      }
    })
    .catch(err => {
      alert('⚠️ Error: ' + err.message);
    });
  });
});
