import React, {Component} from 'react';
import {ApiClient} from "./service/ApiClient";
import "app/App.less";


export class App extends Component {

    apiClient: ApiClient = new ApiClient();

    /*componentDidMount() {
        console.log("Popup ID:", chrome.runtime.id)
        chrome.runtime.sendMessage(
            {
                type: "ACCESS_TOKEN",
                token: "asdasdasdadadsa",
                expiredIn: "05/09/1991"
            },
            response => {
                if (!response.success) {
                    console.log('error sending message', response);
                    return response;
                }
                console.log('Sucesss ::: ', response.message)
            }
        );
    }*/

    render(): React.ReactNode {
        let responses = [];

        for (let i = 0; i < 10; i++) {
            responses.push(<Response key={i}/>);
        }

        return (
            <div className="app">
                <div className="header">
                    <div className="domain">
                        <div className="name">some-domain.com</div>
                        <div className="description">Some domain description</div>
                    </div>
                    <div className="resource">
                        <div className="name">Som name of resource</div>
                    </div>
                </div>
                <div className="responses">
                    {responses}
                </div>
            </div>
        );
    }
}

const Response: React.FC = () => {
    return (
        <div className="response">
            <div className="user-name">Some User</div>
            <div className="rating">***</div>
            <div className="text">Som respoooonse of this resource</div>
            <div className="published">05-09-1991</div>
        </div>
    );
}

export default App;
