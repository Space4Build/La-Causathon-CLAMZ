# Deploy the Contract on the IDEA Platform and Interact with Your Contract

## Step 1: Compile and Deploy the Smart Contract

### Compile the smart contract by running the following command:

    ```bash
    cargo build --release
    ```

Once the compilation is complete, locate the `*.opt.wasm` file in the `target/wasm32-unknown-unknown/release` directory.

## Step 2: Interact with Your Contract on Vara Network

1. Access [Gear IDE](https://idea.gear-tech.io/programs?node=wss%3A%2F%2Frpc.vara.network) using your web browser.
2. Connect your Substrate wallet to Gear IDE.
3. Upload the `*.opt.wasm` and `metadata.txt` files by clicking the "Upload Program" button.


## Integration with the Frontend: Traffic Light

### Prerequisites

Ensure you have the following dependencies installed before starting:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node.js package manager)

### 1. Getting Started: Clone the Frontend Template

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/Vara-Lab/Integration-Kit.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Integration-Kit/Chakra-UI-Vite-Template
    ```

3. Install the dependencies:
    ```bash
    yarn install
    ```

4. Start the project on localhost:
    ```bash
    yarn start
    ```

### 2. Enter the Home Page and Update the Metadata and ProgramID of the React Components:
```jsx
// Add your programID
const programIDFT = "your programID";

// Add your metadata.txt
const meta = "your metadata";
```
### 2. Use the Buttons to Interact with Your Smart Contract on Vara Network.
Congratulations, you now have your first smart contract integrated with the Vara Network.