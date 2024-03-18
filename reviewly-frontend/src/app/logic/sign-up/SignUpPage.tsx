import React from "react";
import {observer} from "mobx-react";
import Page from "../../components/page/Page";
import {useSignUpPageStore} from "./SignUpPageStore";
import SignUpForm from "./form/SignUpForm";
import {Link, LinkSize} from "../../components/link/Link";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import {PageName} from "../../components/page-name/PageName";
import {Icon, IconType} from "../../components/icon/Icon";
import "./SignUpPage.less";

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
                    <Icon type={IconType.LINK}/>
                </Link>
            </section>
        </Page>
    );
}

export default observer(SignUpPage);
