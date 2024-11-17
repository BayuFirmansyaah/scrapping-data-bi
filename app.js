const fs = require('fs');


const runAPI = async (url) => {
    const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timed out')), 1200000) // 20 minutes
    );

    const fetchData = fetch(url).then(response => response.json());

    try {
        const data = await Promise.race([fetchData, timeout]);
        return data;
    } catch (error) {
        throw error; 
    }
}

const scrapper = async () => {
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
      
    const keyProvinces = Object.keys(provinsiData);
    const valuesProvinces = Object.values(provinsiData);
    let countingTimes = [];
    let timeStart = null;

    for(let year= 2017; year <= 2024; year++) {
        for(let i = 0; i < keyProvinces.length; i++) {
            timeStart = Date.now();
            console.log(`Sedang mengambil data dari provinsi ${valuesProvinces[i]} tahun ${year}`);
    
            const url = `https://www.bi.go.id/hargapangan/WebSite/TabelHarga/GetGridDataDaerah?price_type_id=1&comcat_id=cat_2%2Ccom_7%2Ccat_5%2Ccom_11%2Ccat_6%2Ccom_12%2Ccat_7%2Ccom_13%2Ccom_14%2Ccat_8%2Ccom_15%2Ccom_16&province_id=${keyProvinces[i]}&regency_id=&market_id=&tipe_laporan=1&start_date=${year}-01-01&end_date=${year}-12-31&_=1730856415111`;
    
            const data = await runAPI(url);
            fs.writeFileSync(`./data/${year}/${valuesProvinces[i]}.json`, JSON.stringify(data, null, 2));
    
            countingTimes.push((Date.now() - timeStart)/1000);
            console.log(`Sudah mengambil data dari provinsi ${valuesProvinces[i]} tahun ${year} dengan waktu ${(Date.now() - timeStart)/1000} seconds`);    
        }
    }

    console.log(`Total waktu : ${countingTimes.reduce((a, b) => a + b, 0)} seconds`);
    console.log(`Average Waktu : ${countingTimes.reduce((a, b) => a + b, 0) / keyProvinces.length} seconds`);
}

scrapper();