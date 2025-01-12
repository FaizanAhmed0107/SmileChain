// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EtherSender {
    address public owner;

    // Modifier to restrict access to the owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    // Constructor to set the contract owner
    constructor() {
        owner = msg.sender;
    }

    // Function to send Ether to a specific address
    function sendEther(address payable recipient, uint256 amount) public payable onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance in the contract.");
        require(recipient != address(0), "Invalid recipient address.");

        // Transfer the specified amount to the recipient
        recipient.transfer(amount);
    }

    // Function to deposit Ether into the contract
    function deposit() public payable {}

    // Function to check the contract's balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
