/**
 * QR Code Generator – Info Tech Fly
 * Uses QRCode.js library (CDN)
 * Features: URL, colors, size, title
 */

(function() {
    'use strict';

    // DOM refs
    const qrUrlInput = document.getElementById('qrUrl');
    const generateBtn = document.getElementById('generateBtn');
    const fgColorInput = document.getElementById('fgColor');
    const bgColorInput = document.getElementById('bgColor');
    const qrSizeSelect = document.getElementById('qrSize');
    const qrCodeContainer = document.getElementById('qrCode');
    const containerWrap = document.getElementById('qrCodeContainer');
    const statusEl = document.getElementById('qrStatus');
    const downloadPngBtn = document.getElementById('downloadPngBtn');
    const downloadSvgBtn = document.getElementById('downloadSvgBtn');
    const copyBtn = document.getElementById('copyBtn');
    const shareBtn = document.getElementById('shareBtn');
    const qrTitleInput = document.getElementById('qrTitle');
    const qrTitleDisplay = document.getElementById('qrTitleDisplay');

    let currentQRCode = null;
    let currentDataURL = null;

    // ─── TITLE HANDLING ────────────────────────────
    qrTitleInput.addEventListener('input', function() {
        updateTitleDisplay();
        if (currentQRCode) {
            updateQR();
        }
    });

    function updateTitleDisplay() {
        const title = qrTitleInput.value.trim();
        if (title) {
            qrTitleDisplay.textContent = title;
            qrTitleDisplay.classList.add('visible');
        } else {
            qrTitleDisplay.classList.remove('visible');
        }
    }

    // ─── GENERATE QR ──────────────────────────────
    function generateQR() {
        const url = qrUrlInput.value.trim();
        if (!url) {
            showStatus('Please enter a URL or text.', 'error');
            return;
        }

        // Clear previous
        qrCodeContainer.innerHTML = '';
        containerWrap.classList.remove('has-qr');
        currentDataURL = null;

        const fg = fgColorInput.value;
        const bg = bgColorInput.value;
        const size = parseInt(qrSizeSelect.value, 10);

        try {
            // Generate QR code
            currentQRCode = new QRCode(qrCodeContainer, {
                text: url,
                width: size,
                height: size,
                colorDark: fg,
                colorLight: bg,
                correctLevel: QRCode.CorrectLevel.H
            });

            // Wait for rendering, then capture
            setTimeout(() => {
                const canvas = qrCodeContainer.querySelector('canvas');
                if (canvas) {
                    currentDataURL = canvas.toDataURL('image/png');
                }
                containerWrap.classList.add('has-qr');
                updateTitleDisplay();
                showStatus('QR code generated successfully!', 'success');
            }, 150);

        } catch (err) {
            showStatus('Error generating QR: ' + err.message, 'error');
        }
    }

    // ─── UPDATE QR ────────────────────────────────
    function updateQR() {
        if (currentQRCode) {
            generateQR();
        }
    }

    // ─── STATUS HELPER ────────────────────────────
    function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = 'qr-status';
        if (type) statusEl.classList.add(type);
        clearTimeout(statusEl._timeout);
        statusEl._timeout = setTimeout(() => {
            if (statusEl.textContent === msg) {
                statusEl.textContent = '';
                statusEl.className = 'qr-status';
            }
        }, 4000);
    }

    // ─── GET CANVAS ──────────────────────────────
    function getCanvas() {
        const canvas = qrCodeContainer.querySelector('canvas');
        return canvas || null;
    }

    // ─── DOWNLOAD PNG ─────────────────────────────
    function downloadPNG() {
        const canvas = getCanvas();
        if (!canvas) {
            showStatus('Generate a QR code first.', 'error');
            return;
        }
        const finalDataURL = compositeWithTitle(canvas);
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = finalDataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showStatus('PNG downloaded.', 'success');
    }

    // ─── DOWNLOAD SVG ─────────────────────────────
    function downloadSVG() {
        const svg = qrCodeContainer.querySelector('svg');
        if (!svg) {
            showStatus('SVG not available; try PNG.', 'error');
            return;
        }

        let svgContent = svg.outerHTML;

        // Add title below QR if present
        const title = qrTitleInput.value.trim();
        if (title) {
            const size = parseInt(svg.getAttribute('width')) || 300;
            const titleSvg = `
                <text x="${size/2}" y="${size + 40}" font-family="Poppins, sans-serif" font-size="20" font-weight="700" fill="#1E3A5F" text-anchor="middle">${title}</text>
            `;
            svgContent = svgContent.replace('</svg>', titleSvg + '</svg>');
        }

        const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'qrcode.svg';
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showStatus('SVG downloaded.', 'success');
    }

    // ─── COMPOSITE WITH TITLE ────────────────────
    function compositeWithTitle(canvas) {
        const title = qrTitleInput.value.trim();
        if (!title) {
            return canvas.toDataURL('image/png');
        }

        // Create a new canvas with extra height for title
        const width = canvas.width;
        const height = canvas.height + 60;
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;
        const ctx = tempCanvas.getContext('2d');

        // Fill white background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);

        // Draw QR code
        ctx.drawImage(canvas, 0, 0);

        // Draw title
        ctx.fillStyle = '#1E3A5F';
        ctx.font = '600 22px Poppins, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        // Word wrap if needed
        const maxWidth = width - 40;
        let words = title.split(' ');
        let lines = [];
        let currentLine = '';
        for (let word of words) {
            let testLine = currentLine + word + ' ';
            let metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && currentLine.length > 0) {
                lines.push(currentLine.trim());
                currentLine = word + ' ';
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine.trim()) lines.push(currentLine.trim());

        const lineHeight = 30;
        const startY = canvas.height + 20;
        lines.forEach((line, i) => {
            ctx.fillText(line, width / 2, startY + i * lineHeight);
        });

        return tempCanvas.toDataURL('image/png');
    }

    // ─── COPY TO CLIPBOARD ────────────────────────
    async function copyQR() {
        const canvas = getCanvas();
        if (!canvas) {
            showStatus('Generate a QR code first.', 'error');
            return;
        }
        try {
            const dataURL = compositeWithTitle(canvas);
            const response = await fetch(dataURL);
            const blob = await response.blob();
            await navigator.clipboard.write([
                new ClipboardItem({ [blob.type]: blob })
            ]);
            showStatus('QR code image copied to clipboard!', 'success');
        } catch (err) {
            try {
                const dataURL = compositeWithTitle(getCanvas());
                await navigator.clipboard.writeText(dataURL);
                showStatus('Data URL copied (paste as image).', 'success');
            } catch (e) {
                showStatus('Copy failed. Try downloading instead.', 'error');
            }
        }
    }

    // ─── SHARE ─────────────────────────────────────
    async function shareQR() {
        const canvas = getCanvas();
        if (!canvas) {
            showStatus('Generate a QR code first.', 'error');
            return;
        }
        try {
            const dataURL = compositeWithTitle(canvas);
            const response = await fetch(dataURL);
            const blob = await response.blob();
            const file = new File([blob], 'qrcode.png', { type: 'image/png' });
            if (navigator.share) {
                await navigator.share({
                    title: 'QR Code',
                    text: 'Check out this QR code from Info Tech Fly',
                    files: [file]
                });
                showStatus('Shared successfully!', 'success');
            } else {
                await navigator.clipboard.write([
                    new ClipboardItem({ [blob.type]: blob })
                ]);
                showStatus('Share not supported; image copied to clipboard.', 'success');
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                showStatus('Share cancelled or failed.', 'error');
            }
        }
    }

    // ─── EVENT BINDINGS ────────────────────────────
    generateBtn.addEventListener('click', generateQR);
    qrUrlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') generateQR();
    });

    fgColorInput.addEventListener('input', updateQR);
    bgColorInput.addEventListener('input', updateQR);
    qrSizeSelect.addEventListener('change', updateQR);

    downloadPngBtn.addEventListener('click', downloadPNG);
    downloadSvgBtn.addEventListener('click', downloadSVG);
    copyBtn.addEventListener('click', copyQR);
    shareBtn.addEventListener('click', shareQR);

    // ─── AUTO-GENERATE ON LOAD ────────────────────
    window.addEventListener('load', () => {
        if (!qrUrlInput.value) {
            qrUrlInput.value = 'https://www.infotechfly.com';
        }
        if (!qrTitleInput.value) {
            qrTitleInput.value = 'Info Tech Fly';
        }
        updateTitleDisplay();
        generateQR();
    });

    window.qrGenerator = { generateQR, updateQR };

})();