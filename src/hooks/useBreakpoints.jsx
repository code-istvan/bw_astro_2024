import { useState, useEffect } from "react";
import { breakpoints } from "../constants/index.jsx";

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
        l: breakpoint === "lg",
        xl: breakpoint === "xl",
        xxl: breakpoint === "xxl",
    };
};

const getBreakpoint = () => {
    const width = window.innerWidth;
    if (width < parseInt(breakpoints.sm)) {
        return "xs";
    } else if (width < parseInt(breakpoints.md)) {
        return "sm";
    } else if (width < parseInt(breakpoints.lg)) {
        return "md";
    } else if (width < parseInt(breakpoints.xl)) {
        return "lg";
    } else if (width < parseInt(breakpoints.xxl)) {
        return "xl";
    } else {
        return "xxl";
    }
};

export default useBreakpoint;
