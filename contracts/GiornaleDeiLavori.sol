pragma solidity >=0.4.22 <0.7.1;
pragma experimental ABIEncoderV2;

contract GiornaleDeiLavori {

    address owner;
    
    struct GiornaleItem {
        uint id;
        string hashImmagine;
        string timestamp;
        string misure;
        string annotazioni;
    }

    constructor() public {
        owner = msg.sender;
        length = 0;
    }

    modifier restricted() {
        if (msg.sender == owner) _;
    }
    
    GiornaleItem[] public giornale;

    uint256 length;

    function storeItem(string memory imageHash, string memory timestamp, string memory misure, string memory annotazioni) public restricted {
        giornale.push(GiornaleItem({
            id: length,
            hashImmagine: imageHash,
            timestamp: timestamp,
            misure: misure,
            annotazioni: annotazioni
        }));
        length++;
    }
    
    function getGiornale() public view returns (GiornaleItem[] memory){
        return giornale;
    }

    function getLength() public view returns (uint256){
        return length;
    }
}
