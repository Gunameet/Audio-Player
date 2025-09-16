import { Button, Menu } from "antd";
import { Link } from "react-router-dom";

function Navbar({ className, style, }) {

    const items = [
        {
            label: <Link to="/profile">Profile</Link>,
            key: "profile",
        },
    ];

    return (
        <Menu
            mode="horizontal"
            items={items}
            className={className ?? "text-white p-4 text-lg font-bold"}
            style={{ background: "transparent", borderBottom: "none", ...style }}
        />
    );
}

export default Navbar;
