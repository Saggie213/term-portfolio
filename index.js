#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import boxen from "boxen";
import figlet from "figlet";
import clear from "clear";

// Get terminal dimensions
const getTerminalSize = () => ({
    width: process.stdout.columns || 80,
    height: process.stdout.rows || 24,
});

// Creates a centered box with specified content and styling
const createBox = (content, color, title = "") => {
    // Calculate the width of the content
    const contentWidth = Math.max(
        ...content.split("\n").map((line) => line.length)
    );
    // Add padding, borders, and margin to get total box width
    const totalBoxWidth = contentWidth + 4; // 2 for padding + 2 for borders

    // Get terminal width
    const { width: terminalWidth } = getTerminalSize();

    // Calculate left margin to center the box
    const marginLeft = Math.max(
        0,
        Math.floor((terminalWidth - totalBoxWidth) / 2)
    );

    return boxen(chalk[color](content), {
        padding: 1,
        margin: {
            top: 1,
            bottom: 1,
            left: marginLeft,
            right: marginLeft,
        },
        borderStyle: "double",
        borderColor: color,
        title: title,
        titleAlignment: "center",
        textAlignment: "center",
        float: "center",
    });
};

// Display welcome message
const showWelcome = () => {
    const welcomeText = figlet.textSync("Welcome!", {
        font: "Standard",
        horizontalLayout: "full",
    });
    console.log(createBox(welcomeText, "cyan", "✨ My Portfolio ✨"));
};

// Portfolio content
const portfolioContent = {
    "About Me": {
        content: `Hello, my name is Sougata Halder. I am a BTech student with an interest in coding. I have built a few personal projects and enjoy solving DSA/CP problems every now and then. I love outdoor sports and am up for any challengers anytime (unless it’s some kind of martial arts, and I’m going to get beaten up).`,
        color: "green",
    },

    "Tech Stack I know": {
        content: `${chalk.blue("Frontend")}:  React.js  |  TypeScript  |  HTML5/CSS3 | TailwindCSS
${chalk.green("Backend")}:   Node.js  |  Express | Firebase 
${chalk.red("Database")}:  MongoDB  |  PostgreSQL  |  OracleSQL | MySQl 
${chalk.magenta("DevOps")}:    GitHub  |  Docker  |  CI/CD  |  Jenkins
${chalk.yellow("Tools")}:     Git  |  Jira  |  Postman  |  VS Code`,
        color: "blue",
    },
    "My Coding Profiles": {
        content: `🏆 LeetCode: ${chalk.cyan("https://leetcode.com/u/vasuli12/")}
    Max Rating: 1493 | Problems Solved: 120+

⭐ CodeForces: ${chalk.cyan("https://codeforces.com/profile/Thande_papa14")}
    Max Rating: 1216 | Problem Solved: 120+

🌟 GeeksForGeeks: ${chalk.cyan(
            "https://www.geeksforgeeks.org/user/saggi7xux/"
        )}
    Problem Solved: 130+ 

💻 Codechef: ${chalk.cyan(
            "https://www.codechef.com/users/thanda_chai14"
        )}
    3⭐ in Problem Solving`,
        color: "magenta",
    },
    "Contact Info": {
        content: `📧 Email: ${chalk.cyan("halderdk33@gmail.com")}
🔗 LinkedIn: ${chalk.cyan("https://www.linkedin.com/in/sougata-halder-b76b94134/")}
🐙 GitHub: ${chalk.cyan("https://github.com/Saggie213")}

${chalk.italic("Fun fact: I can debug faster than a rubber duck! 🦆")}`,
        color: "red",
    },
    Exit: {
        content:
            "Thanks for checking out my portfolio! May your code be bug-free! 👋",
        color: "yellow",
    },
};

// Show menu and handle selection
const showMenu = async () => {
    // Add some vertical spacing before the menu
    console.log("\n");

    const { choice } = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Choose an option:",
            choices: Object.keys(portfolioContent),
            // Center the menu using padding
            prefix: " ".repeat(Math.floor(getTerminalSize().width / 4)),
        },
    ]);

    clear();

    if (choice === "Exit") {
        console.log(
            createBox(
                portfolioContent[choice].content,
                portfolioContent[choice].color
            )
        );
        process.exit(0);
    }

    console.log(
        createBox(
            portfolioContent[choice].content,
            portfolioContent[choice].color,
            choice
        )
    );
    showMenu();
};

// Main function
const main = () => {
    clear();
    showWelcome();
    showMenu();
};

// Start the application
main();
