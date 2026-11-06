import './style.css';

import { ListApps, Status, Install, Launch } from '../wailsjs/go/main/App';

const app = document.querySelector('#app');

async function refresh() {
    let apps = [];
    try {
        apps = await ListApps();
    } catch (e) {
        app.innerHTML = `<div class="text-red-500">Error: ${e}</div>`;
        return;
    }
    app.innerHTML = `
        <h1 class="text-2xl mb-4">COLLECTIVE LAUNCHER // BORG</h1>
        <div class="space-y-4">
            ${apps.map(a => `
                <div class="border border-green-700 p-4 rounded">
                    <div class="flex justify-between items-center">
                        <div>
                            <div class="text-lg font-bold">${a.Name}</div>
                            <div class="text-sm text-green-600">${a.Description || ''}</div>
                            <div class="text-xs mt-1">${Status(a)}</div>
                        </div>
                        <div class="space-x-2">
                            <button class="px-3 py-1 border border-green-500 hover:bg-green-900" onclick="install('${a.ID}')">Install</button>
                            <button class="px-3 py-1 border border-green-500 hover:bg-green-900" onclick="launch('${a.ID}')">Launch</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    // store apps globally for handlers
    window.__apps = apps;
}

window.install = async function (id) {
    const a = window.__apps.find(x => x.ID === id);
    if (!a) return;
    try {
        await Install(a);
        await refresh();
    } catch (e) {
        alert('Install error: ' + e);
    }
};

window.launch = async function (id) {
    const a = window.__apps.find(x => x.ID === id);
    if (!a) return;
    try {
        await Launch(a);
    } catch (e) {
        alert('Launch error: ' + e);
    }
};

refresh();
