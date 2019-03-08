import React from 'react';
import {IStore, ISummaryExpense} from "../../models";
import {connect} from "react-redux";
import {PieChart} from 'react-easy-chart';
import Sources from "./Sources";
import SummaryExpenses from "./SummaryExpenses";

// material ui version 3.6.2

interface IReduxProps {
    summaryExpenses: ISummaryExpense[];
}

class Account extends React.PureComponent <IReduxProps> {

    render() {
        const {summaryExpenses} = this.props;
        return (
            <div style={styles.accountContainer}>

                <div style={styles.pieChart}>
                    <PieChart
                        labels
                        innerHoleSize={300}
                        data={summaryExpenses ? summaryExpenses.map(summaryExpense => {
                            return {
                                key: summaryExpense.title,
                                value: summaryExpense.totalAmount,
                                color: summaryExpense.color
                            }
                        }) : [{key: "", value: 1, color: "lightgreen"}]}
                    />
                    <Sources/>
                </div>

                <div style={styles.expensesList}>
                    <SummaryExpenses/>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (store: IStore) => ({
    summaryExpenses: store.summaryExpenses,
});

export default connect(mapStateToProps, {})(Account as any);

const styles = {
    accountContainer: {
        display: "flex",
        height: "85vh",
    },
    pieChart: {
        margin: "auto 0 auto 100px"
    },
    expensesList: {
        marginLeft: "50px",
    }
};