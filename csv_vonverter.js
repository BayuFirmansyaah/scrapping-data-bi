const fs = require('fs');
const { Parser } = require('json2csv');

const files = fs.readdirSync('./database');

const writeToCsv = (data, filename) => {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);
    fs.writeFileSync(`./csv/${filename}.csv`, csv);
}

const formatData = (data) => {
    const keys = Object.keys(data[0]);

    let keyUsed = keys.filter(key => key !== 'no' && key !== 'name' && key !== 'level');
    let bankData = [];
    let header = ['Tanggal'];

    for(let i=0; i < data.length; i++) {
        header.push(data[i].name);
    }

    for(let i=0; i < data.length; i++) {
        for(key of keyUsed) {
            // CHECK IF DATA NOT EXIST
            if(findIndex(bankData, 'Tanggal', key) == -1) {
                let obj = header.reduce((acc, headerKey, index) => {
                    acc[headerKey] = data[i][headerKey] || null;
                    return acc;
                }, {});
    
                obj.Tanggal = key;
                bankData.push(obj);
            }
          
            // PUSH DATA INTO ARRAY
            let index = findIndex(bankData, 'Tanggal', key);
            if(index != -1) {

                // INSERT DATA BY CATEGORY
                let item = data[i]['name'];
                bankData[index][item] = data[i][key];
            }
        }
    }

    return bankData
};

const findIndex = (data, key, value) => {
    if(data.length == 0) {
        return -1
    }

    for(let i=0; i < data.length; i++) {
        if(data[i][key] == value) {
            return i
        }
    }

    return -1
}

const main = async () => {
    for (const file of files) {
        console.log(`Start convert data from ${file}`);
        let data = fs.readFileSync(`./database/${file}`);
        data = JSON.parse(data)
        data = formatData(data);
        
        writeToCsv(data, file.split('.')[0]);   
        console.log(`Finish convert data from ${file}`);     
    }
}

main();