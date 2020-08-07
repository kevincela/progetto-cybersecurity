pragma solidity >=0.4.22 <0.7.1;
pragma experimental ABIEncoderV2;

contract ImageStorage {

    address owner;
    address drone;
    
    enum ImageState { UnProcessed, Processed, Completed }
    
    struct Image {
        string hashIpfs;
        string addTime;
        string creationTime;
        string fileName;
        ImageState state;
    }
    
    struct ImageIndex {
        uint index;
        bool isData;
    }
    
    Image[] public images;
    
    mapping(string => ImageIndex) hashToArray;

    uint length;
    
    constructor(address droneAddress) public {
        owner = msg.sender;
        drone = droneAddress;
        length = 0;
    }
    
    modifier dlOnly() {
        if (msg.sender == owner) _;
    }
    
    modifier restricted() {
        if (msg.sender == owner || msg.sender == drone) _;
    }

    function storeImage(string memory newImageHash, string memory fileName, string memory creationTimestamp, string memory addTimestamp) public restricted {
        if(!hashToArray[newImageHash].isData) {
            images.push(Image({
                hashIpfs: newImageHash,
                fileName: fileName,
                creationTime: creationTimestamp,
                addTime: addTimestamp,
                state: ImageState.UnProcessed
            }));
            hashToArray[newImageHash] = ImageIndex({
                index: length,
                isData: true
            });
            length++;
        }
    }
    
    function storeImages(string[] memory hashes, string[] memory fileNames, string[] memory creationTimestamp, string memory addTimestamp) public restricted {
        for(uint i = 0; i < hashes.length; i++) {
            if(!hashToArray[hashes[i]].isData) {
                images.push(Image({
                    hashIpfs: hashes[i],
                    creationTime: creationTimestamp[i],
                    fileName: fileNames[i],
                    addTime: addTimestamp,
                    state: ImageState.UnProcessed
                }));
                hashToArray[hashes[i]] = ImageIndex({
                    index: length,
                    isData: true
                });
                length++;
            }
        }
    }
    
    function setProcessedImage(string memory hash) public dlOnly {
        assert(hashToArray[hash].isData);
        images[hashToArray[hash].index].state = ImageState.Processed;
    }
    
    function setCompletedImage(string memory hash) public dlOnly {
        assert(hashToArray[hash].isData);
        images[hashToArray[hash].index].state = ImageState.Completed;
    }
    
    function getImages() public view returns (Image[] memory){
        return images;
    }
    
    function getImageFromHash(string memory hash) public view returns (Image memory){
        assert(hashToArray[hash].isData);
        return images[hashToArray[hash].index];
    }

    function getLength() public view returns (uint){
        return length;
    }
}