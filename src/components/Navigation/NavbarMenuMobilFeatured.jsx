import Button from "../Buttons/Button";
import "../../sass/components/_navbarmenumobilfeatured.scss";

const NavbarMenuMobilFeatured = () => {
    const mobilFeaturedItems = [
        { link: "/astanga-mysore-program", label: "MYSORE PROGRAM" },
        { link: "/tanfolyam", label: "TANFOLYAMOK" },
        // { link: "/admin", label: "LOG_IN" },
        // { link: "/english", label: "日本語" },
    ];

    const handleNavigate = (url) => {
        window.location.href = url; // Navigáció az adott URL-re
    };

    return (
        <div className="navbar-menu-mobil-featured">
            <div className="navbar-menu-mobil-featured-container">
                {mobilFeaturedItems.map(({ label, link }) => (
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

export default NavbarMenuMobilFeatured;
