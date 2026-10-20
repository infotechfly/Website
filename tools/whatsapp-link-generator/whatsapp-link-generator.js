/**
 * WhatsApp Link Generator – Info Tech Fly
 * Uses QRCode.js library (CDN)
 * Features: Phone, message, link generation, QR code, download, copy, share
 * NO AUTO-GENERATION ON LOAD
 */

(function() {
    'use strict';

    // DOM refs
    const numberInput = document.getElementById('waNumber');
    const messageInput = document.getElementById('waMessage');
    const generateBtn = document.getElementById('generateBtn');
    const linkOutput = document.getElementById('waLinkOutput');
    const linkAnchor = document.getElementById('waLinkAnchor');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const qrContainer = document.getElementById('waQRCode');
    const qrWrapper = document.getElementById('waQRContainer');
    const qrTitle = document.getElementById('waQRTitle');
    const statusEl = document.getElementById('waStatus');
    const downloadPngBtn = document.getElementById('downloadPngBtn');
    const downloadSvgBtn = document.getElementById('downloadSvgBtn');
    const copyQrBtn = document.getElementById('copyQrBtn');
    const shareQrBtn = document.getElementById('shareQrBtn');

    let currentQRCode = null;
    let currentDataURL = null;
    let currentLink = '';

    // ─── HELPERS ──────────────────────────────────────────
    function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = 'wa-status';
        if (type) statusEl.classList.add(type);
        clearTimeout(statusEl._timeout);
        statusEl._timeout = setTimeout(() => {
            if (statusEl.textContent === msg) {
                statusEl.textContent = '';
                statusEl.className = 'wa-status';
            }
        }, 4000);
    }

    function getCanvas() {
        const canvas = qrContainer.querySelector('canvas');
        return canvas || null;
    }

    function getSvg() {
        const svg = qrContainer.querySelector('svg');
        return svg || null;
    }

    // ─── BUILD WHATSAPP LINK ────────────────────────────
    function buildWhatsAppLink() {
        let number = numberInput.value.trim();
        // Remove any non-digit characters (allow '+')
        number = number.replace(/[^\d+]/g, '');
        if (!number) {
            showStatus('Please enter a phone number.', 'error');
            return null;
        }
        let link = 'https://wa.me/' + number;
        const message = messageInput.value.trim();
        if (message) {
            link += '?text=' + encodeURIComponent(message);
        }
        return link;
    }

    // ─── GENERATE LINK AND QR ────────────────────────────
    function generate() {
        const link = buildWhatsAppLink();
        if (!link) return;

        currentLink = link;
        linkOutput.value = link;
        linkAnchor.href = link;

        // Clear previous QR
        qrContainer.innerHTML = '';
        qrWrapper.classList.remove('has-qr');
        qrTitle.classList.remove('visible');
        currentDataURL = null;

        // Generate QR code
        const size = 300;
        try {
            currentQRCode = new QRCode(qrContainer, {
                text: link,
                width: size,
                height: size,
                colorDark: '#1E3A5F',
                colorLight: '#FFFFFF',
                correctLevel: QRCode.CorrectLevel.H
            });

            // Wait for rendering
            setTimeout(() => {
                const canvas = qrContainer.querySelector('canvas');
                if (canvas) {
                    currentDataURL = canvas.toDataURL('image/png');
                }
                qrWrapper.classList.add('has-qr');
                qrTitle.textContent = 'WhatsApp Link';
                qrTitle.classList.add('visible');
                showStatus('Link & QR generated successfully!', 'success');
            }, 150);
        } catch (err) {
            showStatus('Error generating QR: ' + err.message, 'error');
        }
    }

    // ─── COPY LINK ────────────────────────────────────────
    async function copyLink() {
        if (!currentLink) {
            showStatus('Generate a link first.', 'error');
            return;
        }
        try {
            await navigator.clipboard.writeText(currentLink);
            showStatus('Link copied to clipboard!', 'success');
        } catch (err) {
            linkOutput.select();
            document.execCommand('copy');
            showStatus('Link copied!', 'success');
        }
    }

    // ─── DOWNLOAD PNG ────────────────────────────────────
    function downloadPNG() {
        const canvas = getCanvas();
        if (!canvas) {
            showStatus('Generate a QR code first.', 'error');
            return;
        }
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'whatsapp-qr.png';
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showStatus('PNG downloaded.', 'success');
    }

    // ─── DOWNLOAD SVG ────────────────────────────────────
    function downloadSVG() {
        const svg = getSvg();
        if (!svg) {
            showStatus('SVG not available; try PNG.', 'error');
            return;
        }
        let svgContent = svg.outerHTML;
        const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'whatsapp-qr.svg';
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showStatus('SVG downloaded.', 'success');
    }

    // ─── COPY QR IMAGE ──────────────────────────────────
    async function copyQR() {
        const canvas = getCanvas();
        if (!canvas) {
            showStatus('Generate a QR code first.', 'error');
            return;
        }
        try {
            const dataURL = canvas.toDataURL('image/png');
            const response = await fetch(dataURL);
            const blob = await response.blob();
            await navigator.clipboard.write([
                new ClipboardItem({ [blob.type]: blob })
            ]);
            showStatus('QR image copied to clipboard!', 'success');
        } catch (err) {
            try {
                await navigator.clipboard.writeText(canvas.toDataURL('image/png'));
                showStatus('Data URL copied (paste as image).', 'success');
            } catch (e) {
                showStatus('Copy failed. Try downloading instead.', 'error');
            }
        }
    }

    // ─── SHARE QR ────────────────────────────────────────
    async function shareQR() {
        const canvas = getCanvas();
        if (!canvas) {
            showStatus('Generate a QR code first.', 'error');
            return;
        }
        try {
            const dataURL = canvas.toDataURL('image/png');
            const response = await fetch(dataURL);
            const blob = await response.blob();
            const file = new File([blob], 'whatsapp-qr.png', { type: 'image/png' });
            if (navigator.share) {
                await navigator.share({
                    title: 'WhatsApp QR Code',
                    text: 'Scan this QR to chat on WhatsApp',
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

    // ─── EVENT BINDINGS ──────────────────────────────────
    generateBtn.addEventListener('click', generate);
    numberInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') generate();
    });
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generate();
        }
    });
    copyLinkBtn.addEventListener('click', copyLink);
    downloadPngBtn.addEventListener('click', downloadPNG);
    downloadSvgBtn.addEventListener('click', downloadSVG);
    copyQrBtn.addEventListener('click', copyQR);
    shareQrBtn.addEventListener('click', shareQR);

    // ─── NO AUTO-GENERATE ON LOAD ──────────────────────
    // The tool starts with empty fields and a placeholder hint.
    // User must click "Generate" to see the link and QR code.
    console.log('WhatsApp Link Generator ready. Click Generate to create your link and QR.');
})();