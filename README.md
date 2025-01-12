# SmileChain 😄⛓️

**SmileChain** is a MERN + Web3-based decentralized application that rewards users for their smiles. Leveraging AI and
blockchain technology, SmileChain creates a unique and fun way to interact with Ethereum transactions while promoting
positivity.

---

## 🛠️ Features

- **AI-Powered Smile Detection**: Utilizes the [FaceAPI](https://github.com/justadudewhohacks/face-api.js) model to
  detect smiles.
- **Decentralized Rewards System**: Implements Ethereum smart contracts (via Solidity) to award 0.01 Ether for smiles
  with a score above 60%.
- **Robust User Authentication**: Ensures secure tracking of users with login and session management.
- **Interactive Gallery**: Displays all rewarded pictures in a gallery where logged-in users can view and like images,
  promoting engagement.
- **Seamless Frontend**: Built with React for an intuitive user interface.
- **Robust Backend**: Node.js and Express handle the application logic.
- **Efficient Storage**: MongoDB is used to store user data, transaction logs, and gallery interactions.
- **Blockchain Integration**: Interacts with the Ethereum network using Truffle and Ganache for testing.

---

## 📸 How It Works

1. **Smile Detection**:
    - The app uses your webcam to analyze your smile using the FaceAPI model.
    - A "smiling score" is calculated in real-time.

2. **Blockchain Interaction**:
    - If the smiling score exceeds **60%**, a request is sent to the Ethereum blockchain.
    - A Solidity smart contract verifies the transaction and awards **0.01 Ether** to your account.

3. **Gallery of Awarded Pictures**:
    - Successfully rewarded smiles are saved and displayed in a public gallery.
    - Logged-in users can browse the gallery, like their favorite smiles, and interact with others.

4. **Transaction Logging**:
    - User data and transaction details are securely stored in a MongoDB database for tracking.

5. **User Authentication**:
    - Robust user authentication ensures secure access to the platform.
    - Each user has a unique account to maintain accurate records of smiles, rewards, and interactions.

---

## 🚀 Tech Stack

### **Frontend**

- **React**: For building a dynamic user interface.
- **FaceAPI.js**: For AI-based face and smile detection.

### **Backend**

- **Node.js**: Backend runtime environment.
- **Express.js**: Server-side framework for API endpoints.
- **MongoDB**: Database for storing user data, logs, and gallery interactions.

### **Blockchain**

- **Solidity**: For writing Ethereum smart contracts.
- **Truffle**: Development environment for Ethereum.
- **Ganache**: Local Ethereum blockchain for testing.

---

## 🛠️ Setup Instructions

### **Prerequisites**

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)
- **Truffle** and **Ganache**
- **Metamask** (browser wallet)

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mrunknown101331/SmileChain.git
   cd SmileChain

2. **Install dependencies**:

    ```bash
   cd server
   npm install
   cd ../client
   npm install
   cd ..

---

## 📷 Screenshots

### **Smile Detection**

*Real-time smile detection in action.*

### **Reward Confirmation**

*Ether reward confirmation message.*

### **Interactive Gallery**

*Gallery showcasing smiles and allowing likes from logged-in users.*

---

## 🛡️ Smart Contract

The Ethereum smart contract handles:

- Transferring Ether (0.01) to the user's wallet.

Deployed on the **Ganache test network** for development.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork the repository**.
2. **Create a new feature branch**:
   ```bash
   git checkout -b feature-branch-name
3. **Commit your changes**:
   ```bash
   git commit -m "Description of changes"
4. **Push to your branch**:
   ```bash
   git push origin feature-branch-name
5. **Submit a pull request**

---

## ❤️ Acknowledgments

- **[BasedSmiles](https://github.com/roshanbvadassery/basedsmiles)**: Original idea and inspiration for SmileChain.
- [FaceAPI.js](https://github.com/justadudewhohacks/face-api.js): For its amazing AI capabilities.
- [Truffle](https://trufflesuite.com/) and [Ganache](https://trufflesuite.com/ganache/): For blockchain development.
- The Ethereum developer community: For continuous support and resources.

---

## 📬 Contact

For queries or collaboration opportunities, feel free to reach out:
- **Email**: [faizanahmed0107@gmail.com](mailto:faizanahmed0107@gmail.com)
