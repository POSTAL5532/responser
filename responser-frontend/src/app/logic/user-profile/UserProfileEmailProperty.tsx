import React from "react";
import {Button, ButtonSize, ButtonType} from "../../components/button/Button";
import {UserProfileProperty} from "./UserProfileProperty";
import {MessageBlock, MessageBlockType} from "../../components/message-block/MessageBlock";
import "./UserProfileEmailProperty.less";

type UserProfileEmailPropertyProps = {
    email: string;
    needEmailConfirmation: boolean;
    onResend?: () => void;
    resendConfirmationProcess?: boolean;
    confirmationResent?: boolean;
}

export const UserProfileEmailProperty: React.FC<UserProfileEmailPropertyProps> = (props: UserProfileEmailPropertyProps) => {
    const {email, needEmailConfirmation, onResend, resendConfirmationProcess, confirmationResent} = props;

    const resendButton = <Button className="resend-email-confirmation-button"
                                 size={ButtonSize.SMALL}
                                 styleType={ButtonType.LIGHT}
                                 loading={resendConfirmationProcess}
                                 onClick={onResend}>Resend email confirmation</Button>;

    const confirmationResentMessage = "Confirmation message was resent. Check your mailbox and confirm email. If message didn't receive - check spam folder.";
    const needResendConfirmationMessage = <>
        <span>Your email didn't confirm. Check your mailbox and confirm email or resend confirmation message. If message didn't receive - check spam folder.</span>
        {resendButton}
    </>
    const confirmationWarning = <MessageBlock className="confirmation-warning" type={MessageBlockType.ERROR}>{
        confirmationResent ? confirmationResentMessage : needResendConfirmationMessage
    }</MessageBlock>;

    const emailValueComponent = (
        <>
            <div className="email-value">{email}</div>
            {needEmailConfirmation && confirmationWarning}
        </>
    );

    return (
        <UserProfileProperty label="Email" value={emailValueComponent} className="email-property"/>
    );
}