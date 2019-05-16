import React from 'react';
import IconWrapper from "../icons/IconWrapper";
import {ISummaryExpense} from "../../models";

interface IProps {
    summaryExpense: ISummaryExpense
    handleClick: (selfId: string, selfTitle: string) => () => void
}

export default class AccountCategory extends React.PureComponent<IProps, {}> {

    render() {
        const {summaryExpense, handleClick} = this.props;
        return (
            <div className="category" onClick={handleClick(summaryExpense.categoryId, summaryExpense.title)}>
                <div className="category-text">{summaryExpense.title}</div>
                <IconWrapper
                    icon={summaryExpense.iconKey}
                    handleClick={handleClick(summaryExpense.categoryId, summaryExpense.title)}
                    className={"category-icon-button"}
                />
                <div className="category-text">{`${summaryExpense.totalAmount}p.`}</div>
            </div>
        )
    }
}