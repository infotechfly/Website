/**
 * Color Picker – Info Tech Fly
 * Features: Pick color, HEX/RGB/HSL conversion, copy values, palette save/clear
 * NO AUTO-GENERATION ON LOAD
 */

(function() {
    'use strict';

    // DOM refs
    const colorInput = document.getElementById('cpColorInput');
    const hexInput = document.getElementById('cpHexInput');
    const randomBtn = document.getElementById('cpRandomBtn');
    const hexValue = document.getElementById('cpHexValue');
    const rgbValue = document.getElementById('cpRgbValue');
    const hslValue = document.getElementById('cpHslValue');
    const copyAllBtn = document.getElementById('cpCopyAllBtn');
    const preview = document.getElementById('cpPreview');
    const previewText = document.getElementById('cpPreviewText');
    const palette = document.getElementById('cpPalette');
    const paletteEmpty = document.getElementById('cpPaletteEmpty');
    const saveColorBtn = document.getElementById('cpSaveColorBtn');
    const clearPaletteBtn = document.getElementById('cpClearPaletteBtn');
    const statusEl = document.getElementById('cpStatus');

    let savedColors = [];

    // ─── HELPERS ──────────────────────────────────────────
    function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = 'cp-status';
        if (type) statusEl.classList.add(type);
        clearTimeout(statusEl._timeout);
        statusEl._timeout = setTimeout(() => {
            if (statusEl.textContent === msg) {
                statusEl.textContent = '';
                statusEl.className = 'cp-status';
            }
        }, 3000);
    }

    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('');
        }
        const num = parseInt(hex, 16);
        return {
            r: (num >> 16) & 255,
            g: (num >> 8) & 255,
            b: num & 255
        };
    }

    function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    function isValidHex(hex) {
        return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
    }

    function normalizeHex(hex) {
        hex = hex.trim();
        if (!hex.startsWith('#')) hex = '#' + hex;
        return hex.toUpperCase();
    }

    // ─── UPDATE UI WITH COLOR ────────────────────────────
    function updateColor(hex) {
        hex = normalizeHex(hex);
        if (!isValidHex(hex)) {
            showStatus('Invalid HEX color code.', 'error');
            return;
        }

        // Ensure 6-digit hex
        let cleanHex = hex.replace('#', '');
        if (cleanHex.length === 3) {
            cleanHex = cleanHex.split('').map(c => c + c).join('');
        }
        hex = '#' + cleanHex.toUpperCase();

        const rgb = hexToRgb(hex);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

        // Update inputs
        colorInput.value = hex.toLowerCase();
        hexInput.value = hex;

        // Update value displays
        hexValue.textContent = hex;
        rgbValue.textContent = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
        hslValue.textContent = `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;

        // Update preview
        preview.style.backgroundColor = hex;
        previewText.textContent = hex;

        // Determine if text should be dark or light
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        previewText.style.color = brightness > 155 ? '#1E3A5F' : '#FFFFFF';
        preview.querySelector('i').style.color = brightness > 155 ? '#1E3A5F' : '#FFFFFF';
    }

    // ─── RANDOM COLOR ────────────────────────────────────
    function randomColor() {
        const letters = '0123456789ABCDEF';
        let hex = '#';
        for (let i = 0; i < 6; i++) {
            hex += letters[Math.floor(Math.random() * 16)];
        }
        updateColor(hex);
        showStatus('Random color generated!', 'success');
    }

    // ─── COPY FUNCTIONS ──────────────────────────────────
    async function copyText(text, label) {
        try {
            await navigator.clipboard.writeText(text);
            showStatus(`${label} copied to clipboard!`, 'success');
        } catch (err) {
            // Fallback
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showStatus(`${label} copied!`, 'success');
        }
    }

    function getCurrentHex() {
        return hexValue.textContent;
    }

    function getCurrentRgb() {
        const parts = rgbValue.textContent.split(',').map(s => s.trim());
        return `rgb(${parts[0]}, ${parts[1]}, ${parts[2]})`;
    }

    function getCurrentHsl() {
        return `hsl(${hslValue.textContent})`;
    }

    // ─── PALETTE MANAGEMENT ──────────────────────────────
    function renderPalette() {
        // Remove all swatches except the empty message
        palette.querySelectorAll('.cp-swatch').forEach(el => el.remove());

        if (savedColors.length === 0) {
            paletteEmpty.style.display = 'flex';
        } else {
            paletteEmpty.style.display = 'none';
            savedColors.forEach((hex, index) => {
                const swatch = document.createElement('div');
                swatch.className = 'cp-swatch';
                swatch.style.backgroundColor = hex;
                swatch.dataset.hex = hex;
                swatch.title = `Click to use ${hex} • Double-click to remove`;
                swatch.addEventListener('click', () => {
                    updateColor(hex);
                    showStatus(`Loaded ${hex}`, 'success');
                });
                swatch.addEventListener('dblclick', (e) => {
                    e.stopPropagation();
                    savedColors.splice(index, 1);
                    renderPalette();
                    showStatus('Color removed from palette.', 'success');
                });
                palette.appendChild(swatch);
            });
        }
    }

    function saveCurrentColor() {
        const hex = getCurrentHex();
        if (savedColors.includes(hex)) {
            showStatus('This color is already saved.', 'error');
            return;
        }
        if (savedColors.length >= 12) {
            showStatus('Palette full (max 12 colors). Remove one first.', 'error');
            return;
        }
        savedColors.push(hex);
        renderPalette();
        showStatus(`${hex} saved to palette!`, 'success');
    }

    function clearPalette() {
        if (savedColors.length === 0) {
            showStatus('Palette is already empty.', 'error');
            return;
        }
        savedColors = [];
        renderPalette();
        showStatus('Palette cleared.', 'success');
    }

    // ─── EVENT BINDINGS ──────────────────────────────────
    colorInput.addEventListener('input', (e) => {
        updateColor(e.target.value);
    });

    hexInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        if (val.length >= 4 && isValidHex(val)) {
            updateColor(val);
        }
    });

    hexInput.addEventListener('blur', (e) => {
        const val = e.target.value.trim();
        if (val && !isValidHex(val)) {
            showStatus('Invalid HEX code. Reverting.', 'error');
            hexInput.value = getCurrentHex();
        } else if (val) {
            updateColor(val);
        }
    });

    hexInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = e.target.value.trim();
            if (isValidHex(val)) {
                updateColor(val);
                hexInput.blur();
            }
        }
    });

    randomBtn.addEventListener('click', randomColor);

    // Copy buttons on value cards
    document.querySelectorAll('.cp-copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const format = btn.dataset.copy;
            if (format === 'hex') copyText(getCurrentHex(), 'HEX');
            else if (format === 'rgb') copyText(getCurrentRgb(), 'RGB');
            else if (format === 'hsl') copyText(getCurrentHsl(), 'HSL');
        });
    });

    copyAllBtn.addEventListener('click', () => {
        const all = `HEX: ${getCurrentHex()}\nRGB: ${getCurrentRgb()}\nHSL: ${getCurrentHsl()}`;
        copyText(all, 'All values');
    });

    saveColorBtn.addEventListener('click', saveCurrentColor);
    clearPaletteBtn.addEventListener('click', clearPalette);

    // ─── INIT ────────────────────────────────────────────
    // Set default color and render empty palette
    updateColor('#87CEEB');
    renderPalette();

    console.log('%c🎨 Color Picker %cReady',
        'color: #87CEEB; font-size: 1.4rem; font-weight: bold;',
        'color: #1E3A5F; font-size: 1.2rem;');
})();