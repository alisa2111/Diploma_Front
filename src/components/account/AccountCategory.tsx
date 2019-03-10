import React from 'react';
import IconWrapper from "../icons/IconWrapper";
import {ISummaryExpense} from "../../models";

const styles = {
    category: {
        width: "max-content",
    },
    categoryText: {
        textAlign: "center",
        color: "grey",
    } as any,
    categoryIcon: {
        fontSize: "50px"
    }
};

interface IProps {
    summaryExpense: ISummaryExpense
    handleClick: (selfId: string, selfTitle: string) => () => void
}

export default class AccountCategory extends React.PureComponent<IProps, {}> {

    render() {
        const {summaryExpense, handleClick} = this.props;
        return (
            <div style={styles.category}>
                <div style={styles.categoryText}>{summaryExpense.title}</div>
                <IconWrapper
                    icon={summaryExpense.iconKey}
                    handleClick={handleClick(summaryExpense.categoryId, summaryExpense.title)}
                />
                <div style={styles.categoryText}>{`${summaryExpense.totalAmount}p.`}</div>
            </div>
        )
    }
}