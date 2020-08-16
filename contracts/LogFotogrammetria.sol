pragma solidity >=0.4.22 <0.7.1;
pragma experimental ABIEncoderV2;

contract LogFotogrammetria {

    address owner;

    mapping(string => string) hashToMeasure;
    
    struct LogItem {
        uint id;
        string hashImmagine;
        address caller;
        string timestamp;
        // 0 = ERROR, 1 = SUCCESS
        uint result;
    }
    
    LogItem[] public log;

    uint256 length;
    
    constructor() public {
        owner = msg.sender;
        length = 0;
    }

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    function storeItem(string memory timestamp, uint result, string memory hashImmagine, string memory misure) public restricted {
        log.push(LogItem({
            id: length,
            hashImmagine: hashImmagine,
            caller: msg.sender,
            timestamp: timestamp,
            result: result
        }));
        length++;

        if(result == 1) {
            hashToMeasure[hashImmagine] = misure;
        }
    }
    
    function getLog() public view returns (LogItem[] memory){
        return log;
    }

    function getMeasureFromHash(string memory hashImmagine) public view returns (string memory) {
        return hashToMeasure[hashImmagine];
    }

    function getLength() public view returns (uint256){
        return length;
    }
}
