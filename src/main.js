import '@videojs/html/video/player';
import '@videojs/html/ui/container';
import '@videojs/html/ui/controls';
import '@videojs/html/ui/controls-content';
import '@videojs/html/ui/controls-group';
import '@videojs/html/ui/play-button';
import '@videojs/html/ui/time-slider';
import '@videojs/html/ui/volume-slider';
import '@videojs/html/ui/slider-track';
import '@videojs/html/ui/slider-buffer';
import '@videojs/html/ui/slider-fill';
import '@videojs/html/ui/slider-thumb';
import '@videojs/html/ui/time';
import '@videojs/html/ui/mute-button';
import '@videojs/html/ui/captions-button';
import '@videojs/html/ui/fullscreen-button';
import '@videojs/html/ui/hotkey';
import '@videojs/html/ui/status-announcer';
import '@videojs/html/ui/error-dialog';
import '@videojs/html/ui/dialog-popup';
import '@videojs/html/ui/dialog-title';
import '@videojs/html/ui/dialog-description';
import '@videojs/html/ui/dialog-close';
import './style.css';

const film = document.querySelector('#film');
const form = document.querySelector('#mark-form');
const field = document.querySelector('#note');
const list = document.querySelector('#notes-list');
const status = document.querySelector('#notes-status');
const exportButton = document.querySelector('#export');
const clearButton = document.querySelector('#clear');
const key = 'rowferry.index.chromatic-drift.notes.v1';
const format = time => `${Math.floor(time / 60).toString().padStart(2, '0')}:${Math.floor(time % 60).toString().padStart(2, '0')}`;
let notes = [];
try {
  const saved = JSON.parse(localStorage.getItem(key) || '[]');
  if (Array.isArray(saved)) notes = saved.filter(n => n && typeof n.id === 'string' && Number.isFinite(n.time) && n.time >= 0 && n.time <= 18 && typeof n.text === 'string').slice(0, 50).map(n => ({...n, text: n.text.slice(0, 160)}));
} catch { /* Notes still work in memory when storage is unavailable. */ }
const announce = message => { status.textContent = message; };
function persist() {
  try { localStorage.setItem(key, JSON.stringify(notes)); return true; }
  catch { return false; }
}
function render() {
  list.replaceChildren();
  for (const item of [...notes].sort((a, b) => a.time - b.time)) {
    const row = document.createElement('li');
    const jump = document.createElement('button');
    jump.className = 'note-jump';
    jump.type = 'button';
    const time = document.createElement('span');
    time.className = 'note-time';
    time.textContent = format(item.time);
    const label = document.createElement('span');
    label.textContent = item.text || 'A moment worth keeping';
    jump.append(time, label);
    jump.setAttribute('aria-label', `Jump to ${format(item.time)}: ${label.textContent}`);
    jump.addEventListener('click', () => { film.currentTime = Math.min(item.time, film.duration || 18); announce(`Returned to ${format(item.time)}.`); });
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove-note';
    remove.textContent = '×';
    remove.setAttribute('aria-label', `Remove note at ${format(item.time)}`);
    remove.addEventListener('click', () => { notes = notes.filter(n => n.id !== item.id); const saved = persist(); render(); field.focus(); announce(saved ? 'Note removed.' : 'Note removed for this session. Browser storage is unavailable.'); });
    row.append(jump, remove);
    list.append(row);
  }
  document.querySelector('#note-count').textContent = String(notes.length).padStart(2, '0');
  document.querySelector('#empty-notes').hidden = notes.length > 0;
  exportButton.disabled = clearButton.disabled = !notes.length;
}
form.addEventListener('submit', event => {
  event.preventDefault();
  if (notes.length >= 50) return announce('The notebook holds 50 moments. Export or remove a note to keep more.');
  const time = Number.isFinite(film.currentTime) ? film.currentTime : 0;
  notes.push({id: crypto.randomUUID(), time, text: field.value.trim().slice(0, 160)});
  field.value = '';
  const saved = persist();
  render();
  announce(saved ? `Kept the moment at ${format(time)}.` : `Kept ${format(time)} for this session. Browser storage is unavailable; export before leaving.`);
});
film.addEventListener('timeupdate', () => { document.querySelector('#save-time').textContent = format(film.currentTime); });
exportButton.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify({title: 'Chromatic Drift', source: 'Index / RowFerry', notes: [...notes].sort((a, b) => a.time - b.time)}, null, 2) + '\n'], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'index-chromatic-drift-notes.json';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  announce('Notes exported.');
});
clearButton.addEventListener('click', () => { notes = []; const saved = persist(); render(); field.focus(); announce(saved ? 'Notebook cleared.' : 'Notebook cleared for this session. Browser storage is unavailable.'); });
render();
