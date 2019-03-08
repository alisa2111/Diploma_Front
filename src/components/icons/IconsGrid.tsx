import React from "react";
import {getIconsKeys} from './IconWrapper';
import IconWrapper from "./IconWrapper";

const styles = {
    root: {
        "width": "640px",
        "display": "grid",
        "grid-gap": "10px",
        "grid-template-columns": "repeat(auto-fill, 50px)",
        "grid-template-rows": "repeat(auto-fill, 50px)",
    }
};

export default class IconsGrid extends React.Component<{}, {}> {

    render() {
        return (
            <div style={styles.root}>
                {getIconsKeys().map(iconKey => (
                    <IconWrapper icon={iconKey}/>
                ))}
            </div>
        );
    }
}