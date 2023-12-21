const LOGGED_IN_KEY = "loggedIn";

const JUMBO_CARDS = [
  {
    title: "Personalized Financial Planning",
    image: "./assets/appointment-advice.jpg",
    description:
      "Our team of experts takes the time to understand your unique financial goals and creates personalized investment and wealth management strategies just for you.",
  },
  {
    title: "Secure and Diverse Investment Options",
    image: "./assets/register-account.jpg",
    description:
      "Access a wide range of investment opportunities, from stocks and bonds to alternative investments, carefully curated to mitigate risks and maximize returns.",
  },
];

const ACTIONS = [
  {
    eventName: "", // TODO
    title: "Open Account",
    image: "./assets/open-account.jpeg",
    description:
      "Sign up for a new online financial account, provide personal information, and set up login credentials to access financial services.",
    properties: [
      { name: "Account Type", value: "Savings" },
      { name: "Account Tier", value: "Basic" },
      { name: "Initial Deposit Amount", value: "$1,000" },
      { name: "Identification Documents", value: "Passport" },
    ],
  },
  {
    eventName: "", // TODO
    title: "Transfer Funds",
    image: "./assets/transfer-funds.jpeg",
    description:
      "Initiate the movement of funds between different financial accounts, whether within the same institution or to external accounts at other banks.",
    properties: [
      { name: "Transfer Amount", value: "$500" },
      { name: "Source Account", value: "Checking Account" },
      { name: "Destination Account", value: "Savings Account" },
      { name: "Recipient Information", value: "Account Number" },
      { name: "Purpose of Transfer", value: "Bill Payment" },
    ],
  },
  {
    eventName: "", // TODO
    title: "Purchase Crypto",
    image: "./assets/purchase-crypto.jpeg",
    description:
      "Buy digital currencies like Bitcoin, Ethereum, and more through our secure platform.",
    properties: [
      { name: "Cryptocurrency Type", value: "Bitcoin" },
      { name: "Purchase Amount", value: "1 BTC" },
      { name: "Payment Method", value: "Credit Card" },
    ],
  },
  {
    eventName: "", // TODO
    title: "Manage Investments",
    image: "./assets/manage-investments.jpeg",
    description:
      "Buy or sell various types of investments, such as stocks, bonds, or mutual funds, to actively manage or grow your investment portfolio.",
    properties: [
      { name: "Investment Portfolio", value: "Stocks" },
      { name: "Investment Amount", value: "$10,000" },
      { name: "Risk Tolerance", value: "Conservative" },
      { name: "Investment Time Horizon", value: "Short-term" },
    ],
  },
  {
    eventName: "", // TODO
    title: "Pay Bills",
    image: "./assets/pay-bills.jpeg",
    description:
      "Make payments for bills, loans, or recurring expenses through your financial account, often with the option to set up automated payments for convenience.",
    properties: [
      { name: "Biller Information", value: "Name of the Company" },
      { name: "Bill Amount", value: "$100" },
      { name: "Payment Date", value: "Due Date" },
      { name: "Payment Method", value: "Online Banking" },
    ],
  },
  {
    eventName: "", // TODO
    title: "Request Customer Support",
    image: "./assets/customer-support.jpeg",
    description:
      "Contact customer support to seek assistance with account-related issues, resolve problems, or ask questions regarding products and services.",
    properties: [
      { name: "Customer Name", value: "Your Name" },
      { name: "Contact Information", value: "Email" },
      { name: "Issue Description", value: "Transaction Inquiry" },
      { name: "Priority Level", value: "High" },
      { name: "Request Timestamp", value: "Date and Time of Request" },
    ],
  },
];

const HEADER_NAV_CONFIG = [
  { htmlId: "homeLink", pageName: "Home" },
  { htmlId: "servicesLink", pageName: "Savings" },
  { htmlId: "solutionsLink", pageName: "Investments" },
  { htmlId: "contactLink", pageName: "Crypto" },
];
