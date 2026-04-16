/**
 * auth-nav.js — Pizza World Marketing Hub
 * Adds user name + logout button to the nav on every protected page.
 * Include this at the bottom of <body> on every protected page.
 */
(function () {
    var session;
    try {
        session = JSON.parse(sessionStorage.getItem('pw_session') || '{}');
    } catch (e) {
        session = {};
    }

    if (!session || !session.u) return;

    var nav = document.querySelector('nav');
    if (!nav) return;

    // Build user chip + logout button
    var wrap = document.createElement('div');
    wrap.id = 'auth-nav-user';
    wrap.style.cssText = 'display:flex;align-items:center;gap:14px;margin-left:auto;';

    // Admin link (only shown to admins)
    if (session.role === 'admin') {
        var adminLink = document.createElement('a');
        adminLink.href = 'admin.html';
        adminLink.textContent = 'Login Log';
        adminLink.style.cssText = 'color:#888;text-decoration:none;font-family:Oswald,sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;transition:color 0.2s;';
        adminLink.onmouseover = function() { this.style.color = '#d91f1f'; };
        adminLink.onmouseout  = function() { this.style.color = '#888'; };
        wrap.appendChild(adminLink);
    }

    // User name chip
    var nameSpan = document.createElement('span');
    nameSpan.textContent = '👤 ' + session.name;
    nameSpan.style.cssText = 'font-family:Open Sans,sans-serif;font-size:13px;color:#666;white-space:nowrap;';
    wrap.appendChild(nameSpan);

    // Logout button
    var btn = document.createElement('button');
    btn.textContent = 'Logout';
    btn.style.cssText = 'background:#d91f1f;color:#fff;border:none;padding:8px 14px;cursor:pointer;font-family:Oswald,sans-serif;font-size:12px;letter-spacing:1px;border-radius:4px;text-transform:uppercase;transition:background 0.2s;flex-shrink:0;';
    btn.onmouseover = function() { this.style.background = '#a01515'; };
    btn.onmouseout  = function() { this.style.background = '#d91f1f'; };
    btn.onclick = function () {
        sessionStorage.removeItem('pw_session');
        window.location.href = 'login.html';
    };
    wrap.appendChild(btn);

    nav.appendChild(wrap);
})();
