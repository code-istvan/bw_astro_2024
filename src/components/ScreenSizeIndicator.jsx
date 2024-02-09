import React from "react";
import useBreakpoints from "../hooks/useBreakpoints";

const ScreenSizeIndicator = () => {
    const { xs, sm, md, lg, xl, xxl } = useBreakpoints();

    let screenSize = "XL";
    if (xs) screenSize = "XS";
    else if (sm) screenSize = "SM";
    else if (md) screenSize = "MD";
    else if (lg) screenSize = "LG";
    else if (xl) screenSize = "XL";
    else if (xxl) screenSize = "XXL";

    return (
        <div>
            <h3>The current screen size: {screenSize}</h3>
        </div>
    );
};

export default ScreenSizeIndicator;
