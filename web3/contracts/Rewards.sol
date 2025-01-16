// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Rewards {
    enum RewardType {Ether, Other}

    address public immutable owner;
    mapping(address => uint256) private points;
    mapping(uint256 => uint256) private etherRewards;
    mapping(uint256 => string) private otherRewards;
    uint256[] public rewardKeys; // Stores the points associated with all rewards

    event PointsAdded(address indexed account, uint256 pointsAdded);
    event PointsRedeemed(address indexed account, uint256 pointsRedeemed, RewardType rewardType, string rewardDetails);
    event ContractToppedUp(uint256 amount);
    event EtherRewardModified(uint256 indexed points, uint256 etherValue, address indexed modifiedBy, uint256 timestamp);
    event OtherRewardModified(uint256 indexed points, string details, address indexed modifiedBy, uint256 timestamp);
    event RewardDeleted(uint256 indexed points, address indexed modifiedBy, uint256 timestamp);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    function modifyReward(uint256 _points, uint256 _etherValue, string memory _details) public onlyOwner {
        require(_points > 0, "Points must be greater than zero.");

        if (_etherValue > 0) {
            etherRewards[_points] = _etherValue;
            delete otherRewards[_points];
            emit EtherRewardModified(_points, _etherValue, msg.sender, block.timestamp);
        } else if (bytes(_details).length > 0) {
            otherRewards[_points] = _details;
            delete etherRewards[_points];
            emit OtherRewardModified(_points, _details, msg.sender, block.timestamp);
        } else {
            revert("Either etherValue or details must be provided.");
        }

        if (
            !(etherRewards[_points] > 0 ||
            bytes(otherRewards[_points]).length > 0)
        ) {
            rewardKeys.push(_points);
        }
    }

    function deleteReward(uint256 _points) public onlyOwner {
        delete etherRewards[_points];
        delete otherRewards[_points];

        for (uint256 i = 0; i < rewardKeys.length; i++) {
            if (rewardKeys[i] == _points) {
                rewardKeys[i] = rewardKeys[rewardKeys.length - 1];
                rewardKeys.pop();
                emit RewardDeleted(_points, msg.sender, block.timestamp);
                break;
            }
        }
    }

    function getReward(uint256 _points) public view returns (uint256 etherReward, string memory otherReward) {
        etherReward = etherRewards[_points];
        otherReward = otherRewards[_points];

        if (etherReward > 0) {
            return (etherReward, "");
        } else if (bytes(otherReward).length > 0) {
            return (0, otherReward);
        } else {
            revert("No reward found for the specified points.");
        }
    }

    function redeemPoints(uint256 pointsToRedeem) public {
        address payable account = payable(msg.sender);
        require(points[account] >= pointsToRedeem, "Not enough points.");

        if (etherRewards[pointsToRedeem] > 0) {
            uint256 etherValue = etherRewards[pointsToRedeem];
            require(etherValue <= address(this).balance, "Insufficient contract balance for Ether reward.");
            points[account] -= pointsToRedeem;
            account.transfer(etherValue);
            emit PointsRedeemed(account, pointsToRedeem, RewardType.Ether, "Ether Reward");
        } else if (bytes(otherRewards[pointsToRedeem]).length > 0) {
            string memory details = otherRewards[pointsToRedeem];
            points[account] -= pointsToRedeem;
            emit PointsRedeemed(account, pointsToRedeem, RewardType.Other, details);
        } else {
            revert("No reward available for the specified points.");
        }
    }

    function addPoints(address _account, uint256 pointsToAdd) public onlyOwner {
        require(_account != address(0), "Invalid account address.");
        require(pointsToAdd > 0, "Points to add must be greater than zero.");

        points[_account] += pointsToAdd;
        emit PointsAdded(_account, pointsToAdd);
    }

    function topUpContract() external payable onlyOwner {
        require(msg.value > 0, "Top-up amount must be greater than zero.");
        emit ContractToppedUp(msg.value);
    }

    function getPointsBalance(address _account) public view returns (uint256) {
        require(_account != address(0), "Invalid account address.");
        return points[_account];
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}