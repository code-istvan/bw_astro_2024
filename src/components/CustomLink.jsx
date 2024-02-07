import React from "react";

export const CustomLink = ({ link, title, classNames }) => {
    if (!link) return null; // Ha nincs megadva link, nem renderelünk semmit
    const isExternal = link.startsWith("https"); // Külső link ellenőrzése

    return (
        <a
            href={link}
            class={classNames}
            {...(isExternal
                ? { rel: "noopener noreferrer", target: "_blank" }
                : {})}
        >
            {title}
        </a>
    );
};
