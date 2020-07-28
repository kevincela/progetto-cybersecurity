pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract GiornaleDeiLavori {
    
    struct GiornaleItem {
        uint id;
        string hashImmagine;
        string timestamp;
        string misure;
        string annotazioni;
    }
    
    GiornaleItem[] public giornale;

    uint256 length;
    
    constructor() public {
        length = 0;
    }

    function storeItem(string memory imageHash, string memory timestamp, string memory misure, string memory annotazioni) public {
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
