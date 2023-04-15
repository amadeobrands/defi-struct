// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";


contract Vault is ERC4626 {
    address private admin;

    // These are sepolia
    address private apool = 0xE7EC1B0015eb2ADEedb1B7f9F1Ce82F9DAD6dF08; // proxy
    address private poolunderlying = 0x68194a729C2450ad26072b3D33ADaCbcef39D574; // DAI
    address private pooltokenlp = 0x67550Df3290415611F6C140c81Cd770Ff1742cb9; // aDAI

    constructor(IERC20Metadata asset) ERC20("vExampleToken", "vEEE") ERC4626(asset) {
        admin = msg.sender;
    }

    modifier onlyAdmin() { // Modifier
        require(
            msg.sender == admin,
            "Only admin can call this."
        );
        _;
    }

    function killme() public onlyAdmin {
        selfdestruct(payable(address(this)));
    }


    //////////////////
    function _asupply(address pool, address token, uint256 amount) private {
        require(amount > 0, 'Invalid amount');
        require(IERC20(token).balanceOf(address(this)) >= amount, 'Insufficient token balance');
        require(IERC20(token).approve(pool, amount), 'Token approval failed');
        IPool(pool).deposit(token, amount, address(this), 0);
    }

    function _awithdraw(address pool, address token, uint256 amount) private {
        IPool(pool).withdraw(token, amount, address(this));
    }

    //function _asupplyAll(address pool, address token) private {
    //    uint256 amount = IERC20(token).balanceOf(address(this));
    //    require(amount > 0, 'Token balance is zero');
    //    require(IERC20(token).approve(pool, amount), 'Token approval failed');
    //    IPool(pool).deposit(token, amount, address(this), 0);
    //}

    //function _awithdrawAll(address pool, address token) private {
    //    IPool(pool).withdraw(token, type(uint256).max, address(this));
    //}
    //////////////////

    function aaatest() public {
        uint256 assets = this.maxWithdraw(msg.sender);
        _asupply(apool, poolunderlying, assets);
    }

    function deposit(uint256 assets, address receiver) public override returns (uint256) {
        require(assets <= maxDeposit(receiver), "ERC4626: deposit more than max");

        uint256 shares = previewDeposit(assets);
        _deposit(_msgSender(), receiver, assets, shares);

        //_asupply(apool, poolunderlying, assets);

        // https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
        // THESE ARE SEPOLIA, DO NOT USE ELSEWHERE
        // aDAI 0x67550Df3290415611F6C140c81Cd770Ff1742cb9
        // PoolAddressesProviderRegistry 0xb13Cfa6f8B2Eed2C37fB00fF0c1A59807C585810
        // PoolAddressesProvider-Aave 0x0496275d34753A48320CA58103d5220d394FF77F
        // ^^ this is v3 version of LendingPoolAddressesProvider

        /*
        Load the LendingPoolAddressesProvider contract.
        Retrieve the LendingPool address.
        Load the LendingPool.
        Deposit ETH to the LendingPool.
        */

        return shares;
    }

    function withdraw(uint256 assets, address receiver, address owner) public override returns (uint256) {
        require(assets <= maxWithdraw(owner), "ERC4626: withdraw more than max");

        uint256 shares = previewWithdraw(assets);

        _awithdraw(apool, poolunderlying, assets);

        _withdraw(_msgSender(), receiver, owner, assets, shares);

        return shares;
    }

    function removetokens(address token, address to, uint256 amount) public onlyAdmin returns (uint256) {
        IERC20 tokenInstance = IERC20(token);
        uint256 tokenBalance = tokenInstance.balanceOf(address(this));
        require (tokenBalance >= amount, "insufficient balance");
        uint256 approved = tokenInstance.allowance(address(this), to);
        if (approved < amount) {
            require(
                tokenInstance.approve(msg.sender, amount - approved),
                "approve failed"
            );
        }
        
        tokenInstance.transferFrom(address(this), msg.sender, amount);
        return tokenBalance;
    }
}

contract ExampleToken is ERC20, ERC20Burnable, Pausable, Ownable {
    constructor() ERC20("ExampleToken", "EEE") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}
