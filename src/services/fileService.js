const path = require('path');

const uploadSingleFile = async (fileObject) => {
    //path.resolve mean plus __dirname and ../public/images/upload
    let uploadPath = path.resolve(__dirname, "../public/images/upload");

    let extName = path.extname(fileObject.name);


    let baseName = path.basename(fileObject.name, extName);


    let finalName = `${baseName}-${Date.now()}${extName}`

    //create final path: eg:/upload/your-image.extName
    let finalPath = `${uploadPath}/${finalName}`;

    try {
        await fileObject.mv(finalPath);
        return {
            status: 'successed',
            path: finalName,
            error: null
        }
    } catch (err){
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(err)
        }
    }

}

const uploadMultipleFiles = async (filesArr) => {
    let uploadPath = path.resolve(__dirname, "../public/images/upload");

    let resultArr = [];
    let countSuccess = 0;

    for (let i=0; i < resultArr.length; i++) {
        let extName = path.extname(filesArr[i].name);


    let baseName = path.basename(filesArr[i].name, extName);


    let finalName = `${baseName}-${Date.now()}${extName}`

    //create final path: eg:/upload/your-image.extName
    let finalPath = `${uploadPath}/${finalName}`;

    try {
        await filesArr[i].mv(finalPath)
        resultArr.push({
            status: 'successed',
            path: finalName,
            fileName: filesArr[i].name,
            error: null
        })
        countSuccess++;
            
    } catch (err){
        resultArr.push({
            status: 'failed',
            path: null,
            fileName: filesArr[i].name,
            error: JSON.stringify(err)
        })
    }
    }
    return {
        countSuccess: countSuccess,
        detail: resultArr
    }
}

module.exports = {
    uploadSingleFile, uploadMultipleFiles
}