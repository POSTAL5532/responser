import React, {useState} from "react";
import Page from "../../components/page/Page";
import {Button, ButtonSize, ButtonType} from "../../components/button/Button";
import {Icon, IconType} from "../../components/icon/Icon";
import {RadioButton} from "../../components/form/radio-button/RadioButton";
import {RadioButtonGroup} from "../../components/form/radio-button-group/RadioButtonGroup";
import {InputField} from "../../components/form/input-field/InputField";
import "./ComponentsPage.less";

export const COMPONENTS_PAGE_URL = "/components-page"

export const ComponentsPage: React.FC = () => {
    return (
        <Page tabTitle="Components page" className="components-page">
            <Buttons/>
            <Radio/>
            <InputFields/>
        </Page>
    );
}

export const Buttons: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    return(
        <div className="components-container buttons-container">
            <h1>Buttons</h1>
            <div style={{display: "flex", gap: 10}}>
                <Button size={ButtonSize.SMALL} styleType={loading ? ButtonType.PRIMARY : ButtonType.LIGHT} onClick={() => setLoading(!loading)}>Loading</Button>
                <Button size={ButtonSize.SMALL} styleType={disabled ? ButtonType.PRIMARY : ButtonType.LIGHT} onClick={() => setDisabled(!disabled)}>Disabled</Button>
            </div>

            <h3>Default</h3>
            <div className="components buttons">
                <Button loading={loading} disabled={disabled}>Button text</Button>
                <Button loading={loading} disabled={disabled}>Button text<Icon type={IconType.ALERT}/></Button>
            </div>

            <h3>Default small</h3>
            <div className="components buttons">
                <Button loading={loading} disabled={disabled} size={ButtonSize.SMALL}>Button text</Button>
                <Button loading={loading} disabled={disabled} size={ButtonSize.SMALL}>Button text<Icon type={IconType.ALERT}/></Button>
            </div>

            <h3>Primary</h3>
            <div className="components buttons">
                <Button loading={loading} disabled={disabled} styleType={ButtonType.PRIMARY}>Button text</Button>
                <Button loading={loading} disabled={disabled} styleType={ButtonType.PRIMARY}>Button text<Icon type={IconType.ALERT}/></Button>
            </div>

            <h3>Primary small</h3>
            <div className="components buttons">
                <Button loading={loading} disabled={disabled} size={ButtonSize.SMALL} styleType={ButtonType.PRIMARY}>Button text</Button>
                <Button loading={loading} disabled={disabled} size={ButtonSize.SMALL} styleType={ButtonType.PRIMARY}>Button text<Icon type={IconType.ALERT}/></Button>
            </div>

            <h3>Light</h3>
            <div className="components buttons">
                <Button loading={loading} disabled={disabled} styleType={ButtonType.LIGHT}>Button text</Button>
                <Button loading={loading} disabled={disabled} styleType={ButtonType.LIGHT}>Button text<Icon type={IconType.ALERT}/></Button>
            </div>

            <h3>Light small</h3>
            <div className="components buttons">
                <Button loading={loading} disabled={disabled} size={ButtonSize.SMALL} styleType={ButtonType.LIGHT}>Button text</Button>
                <Button loading={loading} disabled={disabled} size={ButtonSize.SMALL} styleType={ButtonType.LIGHT}>
                    Button text<Icon type={IconType.ALERT}/>
                </Button>
            </div>
        </div>
    );
};

export const Radio: React.FC = () => {
    const [currentValue, setCurrentValue] = useState("firstValue");

    return (
        <div className="components-container radios-container">
            <h1>Radio</h1>

            <h3>Active</h3>
            <div className="components radio">
                <RadioButton/>
                <RadioButton label="Radio label"/>
                <RadioButton label="Radio label" checked={true}/>
            </div>

            <h3>Disabled</h3>
            <div className="components radio">
                <RadioButton disabled={true}/>
                <RadioButton disabled={true} label="Radio label"/>
                <RadioButton disabled={true} label="Radio label" checked={true}/>
            </div>

            <h3>Radio button group</h3>
            <div className="components radio">
                <RadioButtonGroup<string>
                    options={[{label: "First value", value: "firstValue"}, {label: "Second value", value: "secondValue"}]}
                    currentValue={currentValue}
                    onChange={val => setCurrentValue(val)}/>
            </div>
        </div>
    );
};

export const InputFields: React.FC = () => {
    const [currentValue, setCurrentValue] = useState("firstValue");

    return (
        <div className="components-container buttons-container">
            <h1>Input fields</h1>

            <div className="components fields">
                <InputField placeholder="Placeholder"/>
                <InputField placeholder="Placeholder" value="One interesting value"/>
                <InputField placeholder="Placeholder" invalid={true}/>
                <InputField placeholder="Placeholder" invalid={true} value="One interesting value"/>
                <InputField placeholder="Disabled" disabled={true}/>
                <InputField placeholder="Disabled" disabled={true} value="Disabled value"/>
            </div>

            <h3>With message</h3>
            <div className="components fields">
                <InputField placeholder="Some label" message="I have an message for you. What do you think abou it?"/>
                <InputField placeholder="Some label" message="I have an message for you. What do you think abou it?" value="One interesting value"/>
                <InputField placeholder="Some label" message="I have an message for you. What do you think abou it?" invalid={true}/>
                <InputField placeholder="Some label" message="I have an message for you. What do you think abou it?" invalid={true} value="One interesting value"/>
            </div>

            <h3>With extra</h3>
            <div className="components fields">
                <InputField placeholder="Placeholder" leftExtraComponent={<Button>Extra</Button>}/>
                <InputField placeholder="Placeholder" rightExtraComponent={<Button>Extra</Button>}/>
                <InputField placeholder="Placeholder" leftExtraComponent={<Button>Extra</Button>} rightExtraComponent={<Button styleType={ButtonType.PRIMARY}>Extra</Button>}/>
                <InputField placeholder="Placeholder" leftExtraComponent={<Button styleType={ButtonType.PRIMARY}>Extra</Button>}/>
                <InputField placeholder="Placeholder" rightExtraComponent={<Button styleType={ButtonType.PRIMARY}>Extra</Button>}/>
                <InputField placeholder="Placeholder" leftExtraComponent={<Button>Extra</Button>} rightExtraComponent={<Button>Extra</Button>}/>
                <InputField placeholder="Placeholder" leftExtraComponent={<Button>Extra</Button>} value="Qwerty 123" invalid={true}/>
                <InputField placeholder="Placeholder" rightExtraComponent={<Button>Extra</Button>} value="Qwerty 123" invalid={true}/>
                <InputField placeholder="Placeholder" leftExtraComponent={<Button>Extra</Button>} rightExtraComponent={<Button>Extra</Button>} value="Qwerty 123" invalid={true}/>
            </div>
        </div>
    );
};
