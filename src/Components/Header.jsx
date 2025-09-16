import { Typography, Layout, Row, Col, Drawer, Button, Grid } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import Navbar from './Navbar';

const { Title } = Typography;
const { useBreakpoint } = Grid;

function Header() {
    const [open, setOpen] = useState(false);
    const screens = useBreakpoint();

    const isMobile = !screens.sm;

    return (
        <Layout.Header
            className="p-0"
            style={{
                padding: 0,
                background: "linear-gradient(90deg,#ffffffff 0%,#ffffffff 100%)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                height: 62,
            }}
        >
            <Row
                align="middle"
                justify="space-between"
                className="px-4"
            // style={{ height: 62 }}
            >
                {/* Left side */}
                <Col>
                    <div className="flex justify-start items-left">
                        {!isMobile && (
                            <Title
                                level={3}
                                style={{
                                    color: "black",
                                    fontWeight: "bold",
                                    fontSize: 20,
                                    paddingLeft: 10,
                                    // height: 50
                                }}
                            >
                                BAPS Swaminarayan Akshardham
                            </Title>
                            // <img
                            //     src="https://www.baps.org/images/baps_logo.svg"
                            //     alt="baps Logo"
                            //     style={{ height: 50, paddingLeft: 10 }}
                            // />
                        )}

                        {isMobile && (
                            // <img
                            //     src="https://www.baps.org/images/baps_logo.svg"
                            //     alt="baps Logo"
                            //     style={{
                            //         width: 300,
                            //         height: 35,
                            //     }}
                            // />
                            <Title
                                level={3}
                                style={{
                                    color: "black",
                                    fontWeight: "bold",
                                    fontSize: 18,
                                    paddingLeft: 10,
                                    height: 30
                                }}
                            >
                                BAPS Swaminarayan Akshardham
                            </Title>
                        )}
                    </div>
                </Col>

                {/* Right side */}
                <Col>
                    {isMobile ? (
                        <>
                            <Button
                                type="text"
                                icon={
                                    <MenuOutlined style={{ fontSize: 15, color: "black", width: 40 }} />
                                }
                                onClick={() => setOpen(true)}
                            />
                            <Drawer
                                title="Menu"
                                placement="right"
                                onClose={() => setOpen(false)}
                                open={open}
                                width={250}

                            >
                                <Navbar
                                    className="text-lg font-bold"
                                    style={{ display: "block" }}
                                />
                            </Drawer>
                        </>
                    ) : (
                        <Navbar
                            className="bg-transparent text-white border-0 text-lg font-bold"
                            style={{
                                fontSize: 16,
                                background: "transparent",
                                borderBottom: "none",
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        />
                    )}
                </Col>
            </Row>

        </Layout.Header>
    );
}

export default Header;
