import React, { useState, useRef } from "react";
import AstroNavigation from "./AstroNavigation";
// import ProgressBar from "./ProgressBar";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import "../../sass/components/_navbar.scss";

const AstroNavbar = () => {
    const navRef = useRef();
    const prevScrollRef = useRef(0);
    const [scroll, setScroll] = useState(0);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const handleOpenMenu = () => setIsOpenMenu(!isOpenMenu);

    useScrollPosition(({ currentPosition }) => {
        let { y: currentYPosition } = currentPosition;

        const scrollTop = -currentYPosition;
        if (navRef.current) {
            navRef.current.className =
                scrollTop >= 2000 && scrollTop >= prevScrollRef.current
                    ? "navbar_container hide"
                    : scrollTop >= 10
                      ? "navbar_container scrolled"
                      : "navbar_container";
        }
        prevScrollRef.current = scrollTop;

        setScroll(currentYPosition);
    }, []);

    return (
        <>
            <div className="navbar_container fluid" ref={navRef}>
                <AstroNavigation
                    isOpen={isOpenMenu}
                    handleOpenMenu={handleOpenMenu}
                />
            </div>
            {/* {articleProperties && scroll < 0 && (
                <div className="progressbar_container">
                    <ProgressBar
                        scroll={scroll}
                        articleProperties={articleProperties}
                    />
                </div>
            )} */}
        </>
    );
};

export default AstroNavbar;
