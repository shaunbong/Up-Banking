import React from "react";
import styles from "./App.module.css";
import { fetchTransactions } from "./api/index";
import { Chart } from "./components";

class App extends React.Component {
  state = { data: {} };

  async componentDidMount() {
    const fetchedTransactions = await fetchTransactions();
    this.setState({ data: fetchedTransactions });
  }

  render() {
    const { data } = this.state;
    return (
      <div className={styles.container}>
        <Chart data={data} />
      </div>
    );
  }
}

export default App;
