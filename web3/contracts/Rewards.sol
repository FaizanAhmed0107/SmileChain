// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Rewards {
    mapping(address => uint256) private points;
    address public owner;

    event PointsAdded(address indexed account, uint256 pointsAdded);
    event PointsRedeemed(address indexed account, uint256 pointsRedeemed, uint256 ethersTransferred);
    event ContractToppedUp(uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addPoints(address _account, uint256 pointsToAdd) public onlyOwner {
        require(_account != address(0), "Invalid account address.");
        require(pointsToAdd > 0, "Points to add must be greater than zero.");

        // Automatically initialize account if it does not exist
        if (points[_account] == 0) {
            points[_account] = pointsToAdd;
        } else {
            points[_account] += pointsToAdd;
        }

        emit PointsAdded(_account, pointsToAdd);
    }

    function redeemPoints(uint256 pointsToRedeem, uint256 etherAmount) public {
        address payable account = payable(msg.sender);

        require(points[account] >= pointsToRedeem, "Not enough points.");
        require(etherAmount > 0, "Ether amount must be greater than zero.");
        require(etherAmount <= address(this).balance, "Insufficient contract balance.");

        points[account] -= pointsToRedeem;
        account.transfer(etherAmount);

        emit PointsRedeemed(account, pointsToRedeem, etherAmount);
    }

    function topUpContract(uint256 requiredAmount) external onlyOwner payable {
        require(requiredAmount > 0, "Top-up amount must be greater than zero.");
        require(msg.value >= requiredAmount, "Insufficient Ether sent for top-up.");

        emit ContractToppedUp(requiredAmount);
    }

    function getPointsBalance(address _account) public view returns (uint256) {
        require(_account != address(0), "Invalid account address.");
        return points[_account];
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
