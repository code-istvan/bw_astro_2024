import useBreakpoints from "../hooks/useBreakpoints";

const Header = () => {
    const breakpoints = useBreakpoints();

    console.log(breakpoints.sm);

    return <nav> {breakpoints.sm ? "Hello" : "goodby"} </nav>;
};

export default Header;
