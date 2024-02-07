import Button from "../Buttons/Button";
import "../../sass/components/_navbarmenumobilheader.scss";

const NavbarMenuMobilHeader = () => {
    const mobilHeaderItems = [
        { link: "/english", label: "ENGLISH" },
        { link: "/orarend", label: "ÓRAREND" },
    ];

    const handleNavigate = (url) => {
        window.location.href = url; // Navigáció az adott URL-re
    };

    return (
        <div className="navbar-menu-mobil-header-wrapper">
            <div className="navbar-menu-mobil-header-container">
                {mobilHeaderItems.map(({ label, link }) => (
                    <Button
                        key={label}
                        type="button"
                        buttonStyle="btn--secondary--outline"
                        onClick={() => handleNavigate(link)}
                    >
                        {label}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default NavbarMenuMobilHeader;
