const fs = require("fs");

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function formatData(input) {
    let output = ""
    for(let key in input) {
        output += `${key}: ${input[key]}\n`
    }
    return output;
}

class PhotogrammetryService {
    static async invoke() {
        const mockData = JSON.parse(fs.readFileSync("./utils/MOCK_DATA.json"));
        const randomIndex = getRandomArbitrary(0, 1000);
        return formatData(mockData[randomIndex]);
    }
}

module.exports = PhotogrammetryService;