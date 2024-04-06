const multer = require('multer');
const fileUpload = () => {
    const storage = multer.diskStorage({})

    const upload = multer({storage:storage})
    return upload
}

const uploadFields = (fieldName) => {
    return fileUpload().fields(fieldName)
}

module.exports = uploadFields
