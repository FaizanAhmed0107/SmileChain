// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EtherSender {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function sendEther(address payable recipient, uint256 amount) public payable onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance in the contract.");
        require(recipient != address(0), "Invalid recipient address.");

        recipient.transfer(amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
