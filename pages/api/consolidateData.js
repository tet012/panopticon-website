import fs from 'fs';
import path from 'path';

const consolidateData = (data) => {
    const filePath = path.join(process.cwd(), 'consolidatedData.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export default consolidateData;
