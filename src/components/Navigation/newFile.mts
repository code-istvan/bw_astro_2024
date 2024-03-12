import { menuList } from "./NavbarTwo.astro.0.mts";

if (menuList) {
    menuItemsJogaorak.forEach((link: { link: string; label: string }) => {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");

        anchor.href = link.link;
        anchor.textContent = link.label;
        listItem.appendChild(anchor);
        menuList.appendChild(listItem);
    });
}
