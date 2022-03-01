const ModelCategory = require('../modules/ModelCategory')

function baseController(controllerCallback) {
    const categories = await ModelCategory.SelectMainCategori();
    
    controllerCallback({categories})
}

/*class BaseController {
    dataForRender = {}

    render() {
        const categories = await MainCategory.SelectMainCategori();
        this.dataForRender = { categories }
    }
}*/

module.export.default = baseController 
