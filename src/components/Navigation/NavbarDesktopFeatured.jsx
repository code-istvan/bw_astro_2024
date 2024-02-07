import Button from "../Buttons/Button"; // Ellenőrizd, hogy a Button komponens import útvonala helyes-e
import "../../sass/components/_navbardesktopfeatured.scss"; // A stílusok útvonala szintén projekt-specifikus

const NavbarDesktopFeatured = () => {
    const desktopSubmenuItems = [
        { link: "/english", label: "ENGLISH" },
        { link: "/orarend", label: "ÓRAREND" },
        { link: "/astanga-mysore-program", label: "MYSORE PROGRAM" },
        { link: "/tanfolyam", label: "TANFOLYAMOK" },
    ];

    const handleNavigate = (url) => {
        window.location.href = url; // Navigáció az adott URL-re
    };

    return (
        <div className="navbar-desktop-featured-wrapper">
            <div className="navbar-desktop-featured-container">
                <ul>
                    {desktopSubmenuItems.map(({ label, link }) => (
                        <li key={label}>
                            <Button
                                type="button"
                                buttonStyle="btn--small--outline"
                                onClick={() => handleNavigate(link)}
                            >
                                {label}
                            </Button>
                        </li>
                    ))}
                </ul>
                <br />
                <br />
                <hr className="solid"></hr>
            </div>
        </div>
    );
};

export default NavbarDesktopFeatured;
