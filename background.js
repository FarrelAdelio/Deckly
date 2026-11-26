// Deckly — service workers
const KEY = 'deckly';
const NKEY = 'deckly_notified';

function setup() {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});
  chrome.alarms.create('deckly-tick', { periodInMinutes: 1 });
}
chrome.runtime.onInstalled.addListener(setup);
chrome.runtime.onStartup.addListener(setup);

// Reminders
chrome.alarms.onAlarm.addListener(async (a) => {
  if (a.name !== 'deckly-tick') return;
  const data = await chrome.storage.local.get([KEY, NKEY]);
  const tasks = data[KEY]?.tasks || [];
  const notified = data[NKEY] || {};
  const now = Date.now();
  let changed = false;
  for (const t of tasks) {
    if (t.done || !t.remind) continue;
    const when = new Date(t.remind).getTime();
    const stamp = t.id + '|' + t.remind;
    if (when <= now && !notified[stamp]) {
      notified[stamp] = now;
      changed = true;
      chrome.notifications.create('deckly-' + t.id + '-' + now, {
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'Deckly · Reminder',
        message: t.title,
        priority: 2
      });
    }
  }
  if (changed) {
    for (const k of Object.keys(notified)) if (now - notified[k] > 7 * 864e5) delete notified[k];
    await chrome.storage.local.set({ [NKEY]: notified });
  }
});

// Pin: when unpinned, the panel closes on tab switch
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const data = await chrome.storage.local.get(KEY);
  const pinned = data[KEY]?.settings?.pinned;
  if (pinned === false) {
    try {
      await chrome.sidePanel.setOptions({ tabId, enabled: false });
      await chrome.sidePanel.setOptions({ tabId, enabled: true, path: 'sidepanel.html' });
    } catch (e) {}
  }
});
