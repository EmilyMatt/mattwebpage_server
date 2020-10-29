const fs = require('fs')
const path = require('path')
const { cwd } = require('process')
const Busboy = require('busboy')
const jimp = require('jimp')
const sizeOf = require('image-size');

const checkHeader = (buffer) => {
    let mime = ""
    switch (buffer) {
        case "47494638":
            mime = "image/gif"
            break;
        case "4d4d002a":
        case "4d4d002b":
        case "49492a00":
            mime = "image/tiff"
            break;
        case "ffd8ffdb":
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
        case "ffd8ffee":
            mime = "image/jpeg"
            break;
        case "89504e47":
            mime = "image/png"
            break;
        default:
            if (buffer.startsWith("424d"))
                mime = "image/bmp";
    }
    return mime
}

const resizeImg = async (img) => {
    
    //add _thumb to filename, and resize both files
    const thumb = img.substring(0, img.lastIndexOf('.'))
        + "_thumb"
        + img.substring(img.lastIndexOf('.'))

    const image = await jimp.read(img)

    //full image size
    await image
        .contain(500, 500)
        .quality(100)
        .write(img)

    //thumb size
    await image
        .contain(250, 250)
        .quality(100)
        .write(thumb)

    return thumb
}

module.exports = {

    async uploadImg (dir, name, req) {

        let info = { uploaded: false , err: [] }
        fs.existsSync(dir) || fs.mkdirSync(dir, { recursive: true });

        //make sure function doesnt return until file is uploaded
        await new Promise( resolve => {
    
            //get file from form and write to disk
            const busboy = new Busboy({ headers: req.headers })
            req.pipe(busboy)

            busboy.on('file', (fieldname, file, filename) => {
                //set name and extension
                name = name + filename.slice(filename.lastIndexOf('.'))
                info.path = path.join(dir, name)
                file.pipe(fs.createWriteStream(info.path))
            })
            busboy.on('finish', () => {

                //read file header
                let chunks = []
                fs.createReadStream(info.path, { start: 0, end: 3 })
                    .on('data', chunk => chunks.push(chunk))
                    .on('end', async () =>
                    {
            
                        const buff = Buffer.concat(chunks)
                        //check mime type 
                        const mime = checkHeader(buff.toString('hex'))

                        if (mime.startsWith('image/'))
                        {

                            //check dimensions ratio
                            const { height, width } = sizeOf(info.path)

                            if ( height/width < 0.5 && height/width > 1.5)
                                info.err.push("err_ratio")

                            //check dimensions
                            if (height < 200 && width < 200)
                                info.err.push("err_dimensions")
                        } else
                            info.err.push("err_filetype")
                        
                        if (info.err.length == 0)
                        {
                            info.uploaded = true
                            info.thumb = await resizeImg(info.path)
                        } else
                            fs.unlinkSync(info.path)

                        resolve()
                    })
            })
        })
        return info
    },

    moveTmpFile(filePath, uuid, fileName) {

        const dir = path.join(process.cwd(), 'public/img/recipes', uuid)
        fs.existsSync(dir) || fs.mkdirSync(dir, { recursive: true });

        fileName = fileName + filePath.slice(filePath.lastIndexOf('.'))
        filePath = filePath.replace("files", "public/files")
        filePath = path.join(cwd(), filePath)

        const newPath = path.join(dir, fileName)
        let success = ''
        if (fs.existsSync(filePath))
        {
            fs.renameSync(filePath, newPath)
            success = '/img/recipes/'+uuid+'/'+fileName
        }

        return success
    }
}