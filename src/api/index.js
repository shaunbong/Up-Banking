import axios from "axios";
import strftime from "strftime";

const url = "https://api.up.com.au/api/v1";
const auth =
  "up:yeah:l19rnnYwHCG2HP4F1bdniAuDmZj1blK3H568oPcnWVpL56k5WUVRNOyBSZA2Dfr5JSa947pVyiFIgdLjUWVCKRG4TscLaTjgfKxfQXulj3Bdlsibw66WBqjg5BK4kssX";
const config = {
  headers: {
    Authorization: `Bearer ${auth}`,
  },
};

export const fetchAccounts = async () => {
  try {
    const { data } = await axios.get(`${url}/accounts`, config);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchTransactions = async () => {
  let baseUrl = `${url}/transactions?page[size]=100`;
  let transactions = [];

  do {
    try {
      const {
        data: { data, links },
      } = await axios.get(baseUrl, config);

      data.map((transaction) => {
        transactions.push({
          transactionDate: strftime(
            "%F",
            new Date(transaction.attributes.createdAt)
          ),
          description: transaction.attributes.description,
          amount: parseFloat(transaction.attributes.amount.value),
          transactionMonth: strftime(
            "%b %Y",
            new Date(transaction.attributes.createdAt)
          ),
        });
        return [];
      });

      baseUrl = links.next;
    } catch (error) {
      console.log(error);
      break;
    }
  } while (baseUrl !== null);
  {
    const monthlyData = groupBy(transactions, "transactionMonth", "amount");
    return monthlyData.reverse();
  }
};

export function groupBy(collection, property, value) {
  let groupedData = collection.reduce((acc, obj) => {
    if (!acc[obj[property]]) {
      acc[obj[property]] = 0;
    }
    acc[obj[property]] += obj[value];
    return acc;
  }, {});

  groupedData = Object.keys(groupedData).map((date) => {
    return { date, amount: groupedData[date] };
  });

  return groupedData;
}
