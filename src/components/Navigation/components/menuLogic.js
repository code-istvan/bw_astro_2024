// src/menuLogic.js

import {
    getMenuItemsJogaorak,
    getMenuItemsTudnivalok,
    getMenuItemsFomenu,
} from "./data/menuData.js";

function initMenu(
    language,
    translatePath,
    t,
    jogorakList,
    tudnivalokList,
    fomenuItems
) {
    const menuItemsJogaorak = getMenuItemsJogaorak(translatePath, t);
    const menuItemsTudnivalok = getMenuItemsTudnivalok(translatePath, t);
    const menuItemsFomenu = getMenuItemsFomenu(translatePath, t);

    populateMenu(jogorakList, menuItemsJogaorak);
    populateMenu(tudnivalokList, menuItemsTudnivalok);
    populateMenu(fomenuItems, menuItemsFomenu, true);
}

function populateMenu(menuElement, menuItems, isHeader = false) {
    if (!menuElement) return;

    menuItems.forEach((item) => {
        const listItem = document.createElement("li");

        if (isHeader) {
            const header = document.createElement("h3");
            const anchor = document.createElement("a");
            anchor.href = item.link;
            anchor.textContent = item.label;
            header.appendChild(anchor);
            listItem.appendChild(header);
        } else {
            const anchor = document.createElement("a");
            anchor.href = item.link;
            anchor.textContent = item.label;
            listItem.appendChild(anchor);
        }

        menuElement.appendChild(listItem);
    });
}

export { initMenu };
