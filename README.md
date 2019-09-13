# BlackJack by [Ronak Shah](https://ronakshah.org)

This contains the code for my Kleiner Perkins Coding Submission. Created by [Ronak Shah](https://ronakshah.org)

## Table of Contents

1. [How to Run | Setup](#how-to-run--setup)
2. [How to Run | Actually Running It](#how-to-run--actually-running-it)
3. [Decisions Made](#decisions-made)
4. [Code Structure](#code-structure)
5. [Background and Disclaimer](#background-and-disclaimer)


## How to Run | Setup

This project is written in [node.js](https://nodejs.org/) and [typescript](typescriptlang.org/). For your convenience, I have precompiled this project so the output javascript is there.

First, you'll need to get the project

	git clone https://github.com/ronakdev/blackjack_ts
	cd blackjack_ts
	
Or, if you don't have git

	wget https://github.com/ronakdev/blackjack_ts/archive/master.zip
	unzip master.zip
	cd blackjack_ts-master/

To run this, you'll first need to install `node` (`npm` should install with it as well)

### Install for Mac

Using [Homebrew](https://brew.sh), it's as simple as 

	brew install node

### Install for Debain and Ubuntu based Linux

	curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
	sudo apt-get install -y nodejs
	sudo apt-get install -y build-essential

### Install for Windows

[Treehouse](https://blog.teamtreehouse.com/install-node-js-npm-windows) has a great guide on windows.

### Other operating systems

Don't worry, it's super simple to install! Follow [this guide](https://nodejs.org/en/download/package-manager/)

## How to Run | Actually Running It

Once you have node and npm installed, simply run `npm start`. If you run into issues, you may need to install the required packages (`npm install`)

	npm start
	

## Decisions Made

**Why Typescript?**

In the [background](#Background-and-Disclaimer), I explain why I decided to revamp my old submission to properly demonstrate my coding abilities. Last year, I wrote a version of blackjack that didn't implement splitting (had some bugs) in pure javascript. This year, I wanted to make sure I submitted a complete game.

I knew I had wanted to use Typescript beforehand, after my mentor and boss from USDS suggested it after I mentioned to him my loven of Javascript. I can honestly say he was completely right - Typescript is quite fun to write with.

**Styling**

As part of running the student org [ACM at UC San Diego](https://acmucsd.github.io), I assist the development team. Our development team strictly adheres to [Google's JS Style Guide](https://google.github.io/styleguide/jsguide), which I initially fought heavily against. (I'm a fan of 4 spaces, not 2). I eventually realized the benefits of a style consistency, and have thus used [Google's Typescript Linter](https://github.com/google/gts) in this project

## Code Structure

In building this, I decided to build a solid foundation (`Deck/`) and build the game (`BlackJack/`) as an implementation of the foundation.

As such, I built Deck to be a functional foundation for any command-line-based game. Deck holds an array of Card objects, which contain a Suite (an enum) and a value (number). I use an array for the Card object, because Javascript supports stack operations by default (`peek` and `pop`). The runtime also [remains practically constant](https://stackoverflow.com/a/22615787/4166655).


The actual game itself is broken up into 3 classes - `BlackJack`, `Interface`, and `Player` (leveraging an enum, `Decision`).

I wrote the core game class, `BlackJack` by taking the logic from last year's submission and heavily modularizing the components. By doing so, I cleaned up the code, made it more efficient, and fixed several bugs.

The `UserInterface` class was written to keep ui printing away from the main game. If this game was to be ported to a different medium, the existing `Interface` would easily be able to become true to its name and be used as an [`interface`](https://www.typescriptlang.org/docs/handbook/interfaces.html) for that different medium.

In `UserInterface`, a method exists called `promptData()`. This function prompts the user for any custom data type and will not quit until it passes the user-specified verification method. This method is extremely powerful and is used to write the other prompt methods and is also why the `Decision` enum exists.

In `BlackJack`, we prompt the user for a decision, which utilizing `promptData()`, we're able to get a guranteed exhaustive case checking to help with the backend logic.

Lastly, the `Player` class manages the balance, bid, and cards for the user and the dealer. To implement splitting, I followed my advice from last year (in that writeup I wrote about what I would change to make splitting work) and have an instance variable called `hands` in the `Player` class, which contains every possible hand for the Player.

**Some UI Notes**

I purposely made sure almost every action within the actual game takes as little keystrokes as possible. Every decision can be made by a single key press (no enter needed!) with the only exception of entering the users bid.

I also ask the user about clearing - the best experience is yes, but I provided the alternative in case the user wanted an easy way to see their progress (users who opt to clear can simply scroll to see their history).

## Background and Disclaimer

Last year, I submitted blackjack as my coding sample. However, because I heard about KP too late, I didn't have to make the best sample that truly represented my abilities. This time, I did have the time. I reused some of the original code, but instead rewrote the entire project in Typescript, a language my mentor and boss had told me about while working at the US Digital Service. This project provided to be an amazing way to learn about Typescript's features, and I now feel confident listing Typescript as a skill.

