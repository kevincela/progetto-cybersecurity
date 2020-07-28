pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract LogFotogrammetria {
    
    struct LogItem {
        uint id;
        address caller;
        string timestamp;
        string result;
    }
    
    LogItem[] public log;

    uint256 length;
    
    constructor() public {
        length = 0;
    }

    function storeItem(string memory timestamp, string memory result) public {
        log.push(LogItem({
            id: length,
            caller: msg.sender,
            timestamp: timestamp,
            result: result
        }));
        length++;
    }
    
    function getLog() public view returns (LogItem[] memory){
        return log;
    }

    function getLength() public view returns (uint256){
        return length;
    }
}
