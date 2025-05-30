# 🚀 Share Market Portfolio Tracker

A TypeScript application to track your stock market investments with beautiful console output using emojis and formatted data.

## 🌟 Features

- 📊 Track multiple stocks with detailed information
- 💰 Calculate portfolio value automatically
- 🔍 Filter stocks by status, sector, or custom criteria
- 📅 Track purchase dates and last updates
- 🎨 Colorful console output with emojis
- 🛡️ Type-safe with advanced TypeScript features

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### 🏗️ Installation

1. **Clone the repository** (if applicable) or create a new folder:
   ```bash
   mkdir stock-portfolio-tracker
   cd stock-portfolio-tracker

npm init -y
npm install typescript ts-node @types/node --save-dev
Add scripts to package.json:

"scripts": {
  "dev": "ts-node index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}

npm run dev


📂 Project Structure:-
stock-portfolio-tracker/
├── index.ts          # Main TypeScript code
├── tsconfig.json     # TypeScript configuration
├── package.json      # Project dependencies and scripts
└── README.md         # This documentation file

📊 === Stock Portfolio Summary ===
📌 Total Stocks: 8
💰 Total Portfolio Value: $9,856.23

✅ AAPL :  15 shares @   $189.37 =     $2,840.55 | 💻 Technology | May 15, 2023
✅ MSFT :   8 shares @   $328.39 =     $2,627.12 | 💻 Technology | Jun 20, 2023
💰 JPM  :   0 shares @   $168.45 =         $0.00 | 💰 Finance | Mar 10, 2023
👀 AMZN :   0 shares @   $125.98 =         $0.00 | 🛍️ Consumer | Jul 1, 2023
📊 ===============================


## 🎯 Key Notes for Implementation

1. Make sure you have all files in place before running
2. The `npm run dev` command uses `ts-node` to execute TypeScript directly
3. For production, you'll need to build first (`npm run build`) then run (`npm start`)
4. All TypeScript features mentioned in your requirements are properly implemented
5. The console output is designed to be visually appealing with emojis and proper formatting

This README provides clear instructions and visual cues to make the setup and running process enjoyable for any developer!
