const fs = require('fs');

const run = () => {
    const provinsiData = {
        "1": "Aceh",
        "2": "Bali",
        "3": "Banten",
        "4": "Bengkulu",
        "5": "DI Yogyakarta",
        "6": "DKI Jakarta",
        "7": "Gorontalo",
        "8": "Jambi",
        "9": "Jawa Barat",
        "10": "Jawa Tengah",
        "11": "Jawa Timur",
        "12": "Kalimantan Barat",
        "13": "Kalimantan Selatan",
        "14": "Kalimantan Tengah",
        "15": "Kalimantan Timur",
        "16": "Kalimantan Utara",
        "17": "Kepulauan Bangka Belitung",
        "18": "Kepulauan Riau",
        "19": "Lampung",
        "20": "Maluku",
        "21": "Maluku Utara",
        "22": "Nusa Tenggara Barat",
        "23": "Nusa Tenggara Timur",
        "24": "Papua",
        "25": "Papua Barat",
        "26": "Riau",
        "27": "Sulawesi Barat",
        "28": "Sulawesi Selatan",
        "29": "Sulawesi Tengah",
        "30": "Sulawesi Tenggara",
        "31": "Sulawesi Utara",
        "32": "Sumatera Barat",
        "33": "Sumatera Selatan",
        "34": "Sumatera Utara"
    };

    const listProvinsi = Object.values(provinsiData);

    let bankData = [];

    for(let i=0; i < listProvinsi.length; i++) {
        for(let year=2017; year <=2024; year++) {
            let data = fs.readFileSync(`./data/${year}/${listProvinsi[i]}.json`);
                data = JSON.parse(data).data

            for(let j=0; j < data.length; j++) {
                if(findIndex(bankData, 'name', data[j]['name']) == -1) {
                    bankData.push({
                        no: data[j]['no'],
                        name: data[j]['name'],
                        level: data[j]['level']
                    });
                }

                let index = findIndex(bankData, 'name', data[j]['name']);
                if(index != -1) {
                    let keys = Object.keys(data[j]);

                    keys = keys.filter(key => key !== 'no' && key !== 'name' && key !== 'level');
                    
                    for(let k=0; k < keys.length; k++) {
                        bankData[index][keys[k]] = data[j][keys[k]].replace(',', '.');
                    }
                }
            }
        }

        fs.writeFileSync(`./database/${listProvinsi[i]}.json`, JSON.stringify(bankData, null, 4));

        bankData = [];
    }
}

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


run();