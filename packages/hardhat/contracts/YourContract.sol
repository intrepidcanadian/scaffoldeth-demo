//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {

    mapping(address => uint256) public balance;

	constructor() {
		balance[0xE283bF27c2D86809e53D187f477c699FC89dE1a3] = 100 ether;
	}

	function transfer(address _to, uint256 _amount) public {
		require(balance[msg.sender] >= _amount, "Not enough balance");
		balance[msg.sender] -= _amount;
		balance[_to] += _amount;
	}

}
