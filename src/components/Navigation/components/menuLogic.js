import {
    getMenuItemsJogaorak,
    getMenuItemsTudnivalok,
    getMenuItemsFomenu,
} from "../data/menuData.js";

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

function setupMenuToggle(toggleElement, contentElement) {
    if (!toggleElement || !contentElement) return;

    toggleElement.addEventListener("click", () => {
        contentElement.classList.toggle("show");
    });
}

function setLabelText(labelElement, text) {
    if (labelElement) {
        labelElement.textContent = text;
    }
}

function initMenuComponents(language, t, components) {
    components.forEach(({ toggleId, contentId, labelId, labelTextKey }) => {
        const toggleElement = document.getElementById(toggleId);
        const contentElement = document.getElementById(contentId);
        const labelElement = document.getElementById(labelId);

        setupMenuToggle(toggleElement, contentElement);
        setLabelText(labelElement, t(labelTextKey));
    });
}

export { initMenu, initMenuComponents };
