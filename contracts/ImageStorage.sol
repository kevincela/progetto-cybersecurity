pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract ImageStorage {
    
    struct Image {
        string hashIpfs;
        string addTime;
    }
    
    Image[] public images;

    uint256 length;
    
    constructor() public {
        length = 0;
    }

    function storeImage(string memory newImageHash, string memory timestamp) public {
        images.push(Image({
            hashIpfs: newImageHash,
            addTime: timestamp
        }));
        length++;
    }
    
    function storeImages(string[] memory hashes, string memory timestamp) public {
        for(uint i = 0; i < hashes.length; i++) {
            images.push(Image({
                hashIpfs: hashes[i],
                addTime: timestamp
            }));
            length++;
        }
    }
    
    function getImages() public view returns (Image[] memory){
        return images;
    }

    function getLength() public view returns (uint256){
        return length;
    }
}
