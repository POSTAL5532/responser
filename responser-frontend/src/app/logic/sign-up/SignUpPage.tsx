import React from "react";
import {observer} from "mobx-react";
import Page from "../../components/page/Page";
import {useSignUpPageStore} from "./SignUpPageStore";
import SignUpForm from "./form/SignUpForm";
import "./SignUpPage.less";
import {Link, LinkSize} from "../../components/link/Link";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import {PageName} from "../../components/page-name/PageName";

export const SIGN_UP_PAGE_URL = "/sign-up";

const SignUpPage: React.FC = () => {

    const {signUpPayload, signUpInProcess, signUp} = useSignUpPageStore();

    const onFinish = async (setFieldError?: (field: string, message: string) => void) => {
        await signUp(setFieldError);
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
                    <svg className="icon link" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.791016" y="0.344727" width="30" height="30" rx="8" fill="#605C55"></rect>
                        <path d="M13.541 19.8447L18.041 15.3447L13.541 10.8447" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </Link>
            </section>
        </Page>
    );
}

export default observer(SignUpPage);
