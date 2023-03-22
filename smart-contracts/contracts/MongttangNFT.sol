// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./token/ERC721/ERC721.sol";
import "./utils/Counters.sol";
import "./access/Ownable.sol";
import "./token/ERC20/IERC20.sol";


contract MongttangNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 private _token;   


    constructor(address _erc20Address) ERC721("MongttangBook", "MTTBook") {
        _token = IERC20(_erc20Address);
    }

    mapping(uint => string) tokenURIs;
    mapping(uint => uint) _nftBalances;

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
      return tokenURIs[tokenId];
    }

    function create(address to, string memory _tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(to, newItemId);
        tokenURIs[newItemId] = _tokenURI;

        return newItemId;
    }

    function deposit(uint256 tokenId, uint256 amount) public {
        require(amount > 0, "MongttangNFT: amount must be greater than 0");
        
        bool success = _token.transferFrom(_msgSender(), address(this), amount);
        require(success, "MyNFT: ERC20 transfer failed");
        
        _nftBalances[tokenId] = _nftBalances[tokenId] + amount;
    }
    
    function withdraw(uint256 tokenId, uint256 amount) public {
        require(amount > 0, "MongttangNFT: amount must be greater than 0");
        require(amount <= _nftBalances[tokenId], "MongttangNFT: amount should not be greater than nftBalance");
        require(_msgSender() == ownerOf(tokenId), "MongttangNFT: Only owner can withdraw");

        bool success = _token.transfer(_msgSender(), amount);
        require(success, "MyNFT: ERC20 transfer failed");

        _nftBalances[tokenId] = _nftBalances[tokenId] - amount;
    }

    function nftBalances(uint256 tokenId) public view returns (uint256){        
        return _nftBalances[tokenId];
    }
}