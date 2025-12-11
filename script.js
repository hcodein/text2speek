document.getElementById('convert-btn').addEventListener('click', async () => {
    const text = document.getElementById('text-input').value;
    const voiceId = document.getElementById('voice-select').value; // الحصول على Voice ID من القائمة المنسدلة

    if (!text) {
        alert("يرجى إدخال نص!");
        return;
    }

    const apiKey = 'sk_b2511df8b4429a6c7c8e6e50c28b34dfeafbe2b7188de5e6'; // مفتاح API الخاص بك

    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + voiceId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xi-api-key': apiKey,
        },
        body: JSON.stringify({
            text: text,
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75
            }
        })
    });

    if (!response.ok) {
        alert("حدث خطأ أثناء تحويل النص إلى صوت.");
        return;
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = audioUrl;
    audioPlayer.hidden = false;
});
