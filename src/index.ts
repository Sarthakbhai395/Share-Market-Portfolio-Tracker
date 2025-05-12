// 1. Create type alias Stock with enum for sector and union type for status
enum Sector {
    TECHNOLOGY = "💻 Technology",
    FINANCE = "💰 Finance",
    HEALTHCARE = "🏥 Healthcare",
    ENERGY = "⚡ Energy",
    CONSUMER = "🛍️ Consumer",
    AUTOMOTIVE = "🚗 Automotive",
    COMMUNICATION = "📡 Communication",
    INDUSTRIAL = "🏭 Industrial"
}

type Stock = {
    symbol: string;
    name: string;
    quantity: number;
    price: number;
    sector: Sector;
    status: "active" | "sold" | "watching";
    lastUpdated: Date;
};

// 2. Define a tuple for [stockSymbol, quantityOwned, purchaseDate]
type StockQuantityTuple = [string, number, Date];

// 3. Create enhanced portfolio array with more stocks
let portfolio: Stock[] = [
    {
        symbol: "AAPL",
        name: "Apple Inc.",
        quantity: 15,
        price: 189.37,
        sector: Sector.TECHNOLOGY,
        status: "active",
        lastUpdated: new Date("2023-05-15")
    },
    {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        quantity: 8,
        price: 328.39,
        sector: Sector.TECHNOLOGY,
        status: "active",
        lastUpdated: new Date("2023-06-20")
    },
    {
        symbol: "JPM",
        name: "JPMorgan Chase & Co.",
        quantity: 0,
        price: 168.45,
        sector: Sector.FINANCE,
        status: "sold",
        lastUpdated: new Date("2023-03-10")
    },
    {
        symbol: "AMZN",
        name: "Amazon.com Inc.",
        quantity: 0,
        price: 125.98,
        sector: Sector.CONSUMER,
        status: "watching",
        lastUpdated: new Date("2023-07-01")
    },
    {
        symbol: "TSLA",
        name: "Tesla Inc.",
        quantity: 5,
        price: 265.28,
        sector: Sector.AUTOMOTIVE,
        status: "active",
        lastUpdated: new Date("2023-07-15")
    },
    {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        quantity: 3,
        price: 125.75,
        sector: Sector.COMMUNICATION,
        status: "active",
        lastUpdated: new Date("2023-06-05")
    },
    {
        symbol: "META",
        name: "Meta Platforms Inc.",
        quantity: 0,
        price: 298.61,
        sector: Sector.COMMUNICATION,
        status: "watching",
        lastUpdated: new Date("2023-07-10")
    },
    {
        symbol: "V",
        name: "Visa Inc.",
        quantity: 10,
        price: 240.50,
        sector: Sector.FINANCE,
        status: "active",
        lastUpdated: new Date("2023-05-22")
    }
];

// Helper function to format currency
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
    }).format(amount);
};

// Helper function to format date
const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
};

// Helper function to get status emoji
const getStatusEmoji = (status: "active" | "sold" | "watching"): string => {
    switch (status) {
        case "active": return "✅";
        case "sold": return "💰";
        case "watching": return "👀";
        default: return "❓";
    }
};

// 4. Enhanced function with rest parameters to add multiple stocks
function addStock(...stocks: Stock[]): void {
    const now = new Date();
    stocks.forEach(stock => {
        stock.lastUpdated = now;
        portfolio.push(stock);
    });
    console.log(`📥 Added ${stocks.length} stock(s) to portfolio on ${formatDate(now)}`);
}

// 5. Enhanced function overloading for getStockDetails
function getStockDetails(symbol: string): Stock | undefined;
function getStockDetails(symbol: string, includePrice: boolean): string;
function getStockDetails(symbol: string, includePrice?: boolean): Stock | string | undefined {
    const stock = portfolio.find(s => s.symbol === symbol);
    
    if (!stock) {
        console.log(`❌ Stock with symbol ${symbol} not found`);
        return undefined;
    }
    
    if (includePrice) {
        const emoji = getStatusEmoji(stock.status);
        return `${emoji} ${stock.symbol} (${stock.name}): ${stock.quantity} shares at ${formatCurrency(stock.price)} each (${stock.status}, last updated ${formatDate(stock.lastUpdated)})`;
    }
    
    return stock;
}

// 6. Enhanced type assertion with 'as' keyword
function parseStockData(jsonData: string): Stock {
    try {
        const data = JSON.parse(jsonData);
        // Using type assertion with additional validation
        if (!data.symbol || !data.name) {
            throw new Error("Invalid stock data");
        }
        return {
            ...data as Stock,
            lastUpdated: new Date(data.lastUpdated || new Date())
        };
    } catch (error) {
        console.error("❌ Error parsing stock data:", error);
        throw error;
    }
}

// 7. Enhanced callback-based function to filter stocks
function filterStocks(callback: (stock: Stock) => boolean): Stock[] {
    const result = portfolio.filter(callback);
    console.log(`🔍 Found ${result.length} stocks matching your criteria`);
    return result;
}

// 8. Enhanced function type expression for logStockSummary
type LogStockSummaryFn = (stocks: Stock[], showDetails?: boolean) => void;

const logStockSummary: LogStockSummaryFn = (stocks, showDetails = false) => {
    console.log("📊 === Stock Portfolio Summary ===");
    console.log(`📌 Total Stocks: ${stocks.length}`);
    
    const totalValue = stocks.reduce((sum, stock) => sum + (stock.quantity * stock.price), 0);
    console.log(`💰 Total Portfolio Value: ${formatCurrency(totalValue)}`);
    
    if (showDetails) {
        stocks.forEach(stock => {
            const value = stock.quantity * stock.price;
            console.log(
                `${getStatusEmoji(stock.status)} ${stock.symbol.padEnd(5)}: ` +
                `${stock.quantity.toString().padStart(3)} shares ` +
                `@ ${formatCurrency(stock.price).padStart(10)} ` +
                `= ${formatCurrency(value).padStart(12)} ` +
                `| ${stock.sector} | ${formatDate(stock.lastUpdated)}`
            );
        });
    }
    console.log("📊 ===============================");
};

// 9. Enhanced void function to display all stocks
function displayAllStocks(): void {
    console.log("📋 === All Stocks in Portfolio ===");
    portfolio.forEach((stock, index) => {
        console.log(
            `${(index + 1).toString().padStart(2)}. ${getStatusEmoji(stock.status)} ` +
            `${stock.symbol} - ${stock.name} | ` +
            `Qty: ${stock.quantity} | ` +
            `Price: ${formatCurrency(stock.price)} | ` +
            `Sector: ${stock.sector} | ` +
            `Updated: ${formatDate(stock.lastUpdated)}`
        );
    });
}

// 10. Enhanced function using never type for unexpected status
function handleUnexpectedStatus(status: never): never {
    const error = new Error(`🚨 Unexpected stock status: ${status}`);
    console.error(error.message);
    throw error;
}

function processStockStatus(stock: Stock): string {
    const emoji = getStatusEmoji(stock.status);
    switch (stock.status) {
        case "active":
            return `${emoji} ${stock.name} (${stock.symbol}) is active in your portfolio with ${stock.quantity} shares worth ${formatCurrency(stock.quantity * stock.price)}`;
        case "sold":
            return `${emoji} You sold your position in ${stock.name} (${stock.symbol}) on ${formatDate(stock.lastUpdated)}`;
        case "watching":
            return `${emoji} You're watching ${stock.name} (${stock.symbol}) - current price: ${formatCurrency(stock.price)}`;
        default:
            return handleUnexpectedStatus(stock.status);
    }
}

// ===== Test the enhanced implementation =====
function runEnhancedPortfolioDemo() {
    console.log("🚀 Starting Enhanced Portfolio Tracker Demo\n");
    
    // Display all stocks first
    displayAllStocks();
    console.log("");
    
    // Test adding new stocks
    const newStocks: Stock[] = [
        {
            symbol: "NVDA",
            name: "NVIDIA Corporation",
            quantity: 7,
            price: 459.77,
            sector: Sector.TECHNOLOGY,
            status: "active",
            lastUpdated: new Date()
        },
        {
            symbol: "WMT",
            name: "Walmart Inc.",
            quantity: 0,
            price: 160.23,
            sector: Sector.CONSUMER,
            status: "watching",
            lastUpdated: new Date()
        }
    ];
    addStock(...newStocks);
    console.log("");
    
    // Test tuple type with purchase date
    const aaplStock: StockQuantityTuple = ["AAPL", 15, new Date("2023-05-15")];
    console.log(`📅 Tuple example: ${aaplStock[0]} - ${aaplStock[1]} shares purchased on ${formatDate(aaplStock[2])}\n`);
    
    // Test function overloading
    console.log("ℹ️ Stock details for MSFT (without price):", getStockDetails("MSFT"));
    console.log("ℹ️ Stock details for MSFT (with price):", getStockDetails("MSFT", true));
    console.log("");
    
    // Test type assertion with JSON parsing
    const jsonStock = JSON.stringify({
        symbol: "DIS",
        name: "The Walt Disney Company",
        quantity: 4,
        price: 89.50,
        sector: Sector.COMMUNICATION,
        status: "active",
        lastUpdated: new Date().toISOString()
    });
    try {
        const parsedStock = parseStockData(jsonStock);
        console.log("🔄 Parsed stock from JSON:", parsedStock);
        addStock(parsedStock);
    } catch (error) {
        console.error("Failed to parse stock:", error);
    }
    console.log("");
    
    // Test filtering with callback
    const activeTechStocks = filterStocks(stock => 
        stock.status === "active" && stock.sector === Sector.TECHNOLOGY
    );
    console.log("💻 Active Technology Stocks:", activeTechStocks.length);
    logStockSummary(activeTechStocks, true);
    console.log("");
    
    // Test detailed summary
    logStockSummary(portfolio, true);
    console.log("");
    
    // Test status processing
    console.log(processStockStatus(portfolio[0])); // AAPL - active
    console.log(processStockStatus(portfolio[2])); // JPM - sold
    console.log(processStockStatus(portfolio[3])); // AMZN - watching
    console.log("");
    
    // Display final portfolio
    console.log("🏁 Final Portfolio Overview");
    logStockSummary(portfolio);
}

// Run the enhanced demo when the script loads
runEnhancedPortfolioDemo();