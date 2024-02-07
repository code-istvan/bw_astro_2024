import { useState, useEffect } from "react";

const useBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState(getBreakpoint());

    useEffect(() => {
        const handleResize = () => {
            setBreakpoint(getBreakpoint());
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return {
        xs: breakpoint === "xs",
        sm: breakpoint === "sm",
        md: breakpoint === "md",
        l: breakpoint === "l",
        xl: breakpoint === "xl",
    };
};

const getBreakpoint = () => {
    const width = window.innerWidth;

    if (width <= 320) {
        return "xs";
    } else if (width <= 720) {
        return "sm";
    } else if (width <= 1024) {
        return "md";
    } else if (width <= 1536) {
        return "l";
    } else {
        return "xl";
    }
};

export default useBreakpoint;
