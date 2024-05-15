import React from "react";
import {Button} from "../../components/button/Button";
import {Icon, IconType} from "../../components/icon/Icon";
import ApplicationProperties from "../../service/ApplicationProperties";
import {Link} from "../../components/link/Link";
import "./AppFooter.less"

export const AppFooter: React.FC = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-section first">
                    <div className="logo-container">
                        <Icon type={IconType.REVIEWLY}/>
                        <span className="logo-text">Reviewly</span>
                    </div>
                </div>
                <div className="footer-section second">
                    <div className="contacts-container">
                        <h3 className="contacts-header">Contacts</h3>
                        <p className="contact">M. {ApplicationProperties.contactEmail}</p>
                        <p className="contact">W. reviewly.com</p>
                    </div>
                </div>
                <div className="footer-section third">
                    <div className="policies-container">
                        <Link href={ApplicationProperties.selfHost + "/privacy-policy"}>Privacy Policy</Link>
                        <Link href={ApplicationProperties.selfHost + "/cookie-policy"}>Cookie Policy</Link>
                    </div>
                </div>
                <div className="footer-section fourth">
                    <button className="button primary">
                        <Icon type={IconType.PLAY}/>
                        Start for free
                    </button>
                </div>
            </footer>

            <div className="terms">
                <div className="terms-section first">
                    &#169; Reviewly 2021. All rights reserved.
                </div>
                <div className="terms-section second">
                    <Button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                        Back to top
                        <Icon type={IconType.ARROW}/>
                    </Button>
                </div>
                <div className="terms-section third">
                    Website by Third Dimension Studio
                </div>
            </div>
        </>
    );
}