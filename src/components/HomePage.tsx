import React from "react";
import {IStore, IUser} from "../models";
import PrimarySearchAppBar from "./PrimarySearchAppBar";

interface IProps {
    user: Partial<IUser>;
}

export class HomePage extends React.PureComponent <IProps> {
    render() {
        const {user} = this.props;
        return (
            <div>
                <PrimarySearchAppBar/>
                <h1>
                    {`HELLO, ${user.name}`}
                </h1>
            </div>
        )
    }
}