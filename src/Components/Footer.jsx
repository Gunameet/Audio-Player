import { Layout } from "antd";

const Footer = () => (
    <Layout.Footer className="text-center">
        BAPS Swaminarayan Sanstha &copy; {new Date().getFullYear()}
    </Layout.Footer>
);

export default Footer;
