import React, {useState} from "react";
import {observer} from "mobx-react";
import Page from "../../components/page/Page";
import {useSignUpPageStore} from "./SignUpPageStore";
import SignUpForm from "./form/SignUpForm";
import {Link, LinkSize} from "../../components/link/Link";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import {PageName} from "../../components/page-name/PageName";
import {Icon, IconType} from "../../components/icon/Icon";
import Modal from "../../components/modal/Modal";
import {Button, ButtonType} from "../../components/button/Button";
import "./SignUpPage.less";

export const SIGN_UP_PAGE_URL = "/sign-up";

const SignUpPage: React.FC = () => {
    const {signUpPayload, signUpInProcess, signUp} = useSignUpPageStore();
    const [showUserRegisteredModal, setShowUserRegisteredModal] = useState<boolean>(false);

    const onFinish = async (setFieldError?: (field: string, message: string) => void) => {
        await signUp(setFieldError);
        setShowUserRegisteredModal(true);
    }

    return (
        <Page tabTitle="Sign Up" className="sign-up-page">
            <section className="section">
                <PageName className="sign-up-header">Start for free</PageName>
                <h2 className="sign-up-description">Create new account</h2>

                <SignUpForm
                    disabled={signUpInProcess}
                    signUpPayload={signUpPayload}
                    onFinish={onFinish}/>

                <span className="or">or</span>

                <Link size={LinkSize.BIG} href={AuthorizationService.getLoginPagePreparedUrl()}>
                    Already have an account? Log in now
                    <Icon type={IconType.LINK}/>
                </Link>
            </section>

            <Modal isOpen={showUserRegisteredModal} className="user-registerd-modal">
                <Modal.Body>
                    <h2 className="result-header">You was successfully registered!</h2>
                    <p className="result-text">Message with confirmation link was sent to your email.<br/>Click "Ok" for Login page redirect.</p>
                    <Button styleType={ButtonType.PRIMARY} onClick={AuthorizationService.requestLoginPage}>Ok</Button>
                </Modal.Body>
            </Modal>
        </Page>
    );
}

export default observer(SignUpPage);
