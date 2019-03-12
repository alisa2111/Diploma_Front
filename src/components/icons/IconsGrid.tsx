import React from "react";
import {getIconsKeys} from './IconWrapper';
import IconWrapper from "./IconWrapper";

interface IProps {
    checkedIcon?: string
    onChooseIcon: (iconKey: string) => () => void
}

export default class IconsGrid extends React.Component<IProps, {}> {

    render() {
        const {checkedIcon} = this.props;
        const iconKeys = getIconsKeys();
        return (
            <div style={styles.root}>
                <h3>Иконка:</h3>
                {iconKeys.map(iconKey => (
                    <IconWrapper key={iconKey}
                                 icon={iconKey}
                                 checked={iconKey == checkedIcon}
                                 handleClick={this.props.onChooseIcon(iconKey)}/>
                ))}
            </div>
        );
    }
}

const styles = {
    root: {
        maxWidth: "500px",
        maxHeight: "500px",
        marginLeft: "10%"
    }
};