import "../../sass/components/_button.scss";

const STYLES = [
    "btn--primary--solid",
    "btn--primary--solid--full",
    "btn--plain--naked",
    "btn--secondary--solid",
    "btn--secondary--solid--full",
    "btn--secondary--outline",
    "btn--third--solid",
    "btn--third--outline",
    "btn--third--naked-orange",
    "btn--primary--outline",
    "btn--primary--outline-full",
    "btn--small--outline",
];

export default function Button({
    children,
    type,
    onClick,
    buttonStyle,
    class = "",
}) {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    return (
        <button
            class={`btn ${checkButtonStyle} ${class}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
}
