import React from "react";
import {IStore, IUser} from "../models";

interface IProps {
    user: Partial<IUser>;
}

export class HomePage extends React.PureComponent <IProps> {
    render() {
        const {user} = this.props;
        return(
            <h1>
                {`HELLO, ${user.email}`}
            </h1>
        )
    }
}