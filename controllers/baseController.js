function baseController(controllerCallback) {
    const categories = await MainCategory.SelectMainCategori();
    // ...
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
