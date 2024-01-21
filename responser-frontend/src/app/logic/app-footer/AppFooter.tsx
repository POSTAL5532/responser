import React from "react";
import {Button} from "../../components/button/Button";
import "./AppFooter.less"

export const AppFooter: React.FC = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-section first">
                    <div className="logo-container">
                        <svg className="icon logo" width="28" height="31" viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M0.09375 2.60318C0.09375 1.58353 0.869152 0.749268 1.81687 0.749268H11.3514C12.5289 0.749268 13.3617 2.01611 12.9597 3.22116L9.94423 12.2435C9.54217 13.4486 10.375 14.7154 11.5525 14.7154H26.2564C27.2041 14.7154 27.9795 15.5497 27.9795 16.5694V28.9288C27.9795 29.9484 27.2041 30.7827 26.2564 30.7827H25.3661C24.9641 30.7827 24.562 30.6282 24.2748 30.3501L10.4899 17.9289C9.57089 17.0946 8.19239 17.4963 7.79033 18.7323L4.17179 29.5777C3.91332 30.3192 3.28151 30.7827 2.56355 30.7827H1.81687C0.869152 30.7827 0.09375 29.9484 0.09375 28.9288L0.09375 2.60318ZM18.5885 7.11438C18.1865 8.31942 19.0193 9.58627 20.1968 9.58627H26.2564C27.2041 9.58627 27.9795 8.752 27.9795 7.73235V2.60318C27.9795 1.58353 27.2041 0.749268 26.2564 0.749268H21.9199C21.2019 0.749268 20.5701 1.24365 20.3116 1.95431L18.5885 7.08348V7.11438Z"
                                  fill="#404038"/>
                        </svg>
                        <span className="logo-text">Reviewly</span>
                    </div>
                </div>
                <div className="footer-section second">
                    <div className="contacts-container">
                        <h3 className="contacts-header">Contacts</h3>
                        <p className="contact">M. support@reviewly.com</p>
                        <p className="contact">W. reviewly.com</p>
                    </div>
                </div>
                <div className="footer-section third">
                    <button className="button primary submit-form">
                        <svg className="icon play" width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.75 1.25L11.25 8L0.75 14.75V1.25Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>
                        Start for free
                    </button>
                </div>
            </footer>

            <div className="terms">
                <div className="terms-section first">&#169; Reviewly 2021. All rights reserved.</div>

                <div className="terms-section second">
                    <Button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                        Back to top
                        <svg className="icon arrow" width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5.25L5.5 0.75L10 5.25" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>
                    </Button>
                </div>

                <div className="terms-section third">
                    Website by Third Dimension Studio
                </div>
            </div>
        </>
    );
}