import React from "react";

export const CustomLink = ({ link, children, classNames }) => {
    if (!link) return null; // Ha nincs megadva link, nem renderelünk semmit
    const isExternal = link.startsWith("https"); // Külső link ellenőrzése

    return (
        <a
            href={link}
            className={classNames}
            {...(isExternal
                ? { rel: "noopener noreferrer", target: "_blank" }
                : {})}
        >
            {children}
        </a>
    );
};
