# SmileChain 😄⛓️

**SmileChain** is a MERN + Web3-based decentralized application that rewards users for their smiles. Leveraging AI and
blockchain technology, SmileChain provides a unique and engaging experience by turning smiles into valuable rewards, all
while promoting positivity.

---

## 🛠️ Features

- **AI-Powered Smile Detection**: Detects smiles using the [FaceAPI](https://github.com/justadudewhohacks/face-api.js)
  model.
- **Reward Point System**: Users earn reward points for smiles with a score greater than **0.60**, which can be
  accumulated for future redemptions.
- **Reward Exchange Options**: Redeem points for Ether, gift cards, or exclusive coupons.
- **Admin Panel**: Manage reward settings, transaction delays, and reward exchange options.
- **Secure User Authentication**: Ensures secure tracking of users with login and session management.
- **Interactive Gallery**: Displays rewarded smile pictures in a gallery where users can engage by viewing and liking
  them.
- **Efficient Data Storage**: MongoDB securely stores user information, transaction logs, and gallery interactions.
- **Blockchain Integration**: Interacts with the Ethereum network using Truffle and Ganache for testing.

---

## 📸 How It Works

### **Smile Detection**

- The app uses your webcam to detect smiles in real-time with the FaceAPI model.
- A "smiling score" is calculated, measuring the intensity and quality of the smile.

### **Reward Point System**

- Smiles with a score greater than **0.60** earn reward points for the user.
- Points are stored in the user's account for future redemptions.

### **Reward Exchange Options**

- Accumulated reward points can be redeemed for:
    - **Ether:** Exchange points via smart contracts.
    - **Gift Cards:** Use points to access exclusive deals and discounts.
    - **Coupons:** Redeem points for special offers.

### **Admin Panel for Reward Management**

- The admin panel provides the following controls:
    - Configure the reward points granted per successful smile.
    - Set a cooldown period between consecutive reward point claims.
    - Manage reward exchange options by adding, deleting, or modifying available rewards.

### **Interactive Gallery**

- Successfully rewarded smiles are saved and displayed in a public gallery.
- Logged-in users can browse, like their favorite smiles, and engage with others.

---

## 🚀 Tech Stack

### **Frontend**

- **React**: For building a dynamic user interface.
- **FaceAPI.js**: For AI-based smile detection.

### **Backend**

- **Node.js**: Backend runtime environment.
- **Express.js**: Server-side framework for API endpoints.
- **MongoDB**: Database for storing user data and interactions.

### **Blockchain**

- **Solidity**: For writing Ethereum smart contracts.
- **Truffle**: Development environment for Ethereum.
- **Ganache**: Local Ethereum blockchain for testing.

---

## 🛠️ Setup Instructions

### **Prerequisites**

- **Node.js** (v18.20.5)
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

# 🛡️ Smart Contract

The Ethereum smart contract handles:

- **Transparent Reward Distribution:** Ensure that reward points are awarded fairly and accurately based on user
  interactions.
- **Secure Point Exchange Management:** Safeguard the process of exchanging reward points for Ether, gift cards, or
  coupons.
- **Comprehensive Transaction History:** Maintain a detailed and transparent record of all reward and transaction
  activities for audit and user reference.
- **Scalable Smart Contract Design:** Enable easy updates and scalability for future reward mechanisms or additional
  features.
- **Automated Reward Redemption:** Handle the seamless processing of reward redemptions based on smart contract logic.
- **Anti-Fraud Measures:** Implement safeguards to prevent fraudulent claims and unauthorized transactions.
- **User Notifications:** Provide real-time notifications for successful smile detections, point awards, and reward
  redemptions.
- **Flexible Reward Policy Configuration:** Allow dynamic changes to reward criteria and redemption options through the
  admin panel.

---

# 🤝 Contributing

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
