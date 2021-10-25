const categories = [
    {
        id: 'cat-chair',
        name: 'Sillas',
        description: 'Lorem Ipsum  Sillas es simplemente el texto de relleno de las imprentas y archivos de texto.',
        photoUrl: '../../assets/sillas.jpeg'
    },
    {
        id: 'cat-desktop',
        name: 'Escritorios',
        description: 'Lorem Ipsum  Escritorios es simplemente el texto de relleno de las imprentas y archivos de texto.',
        photoUrl: '../../assets/escritorios.jpeg'
    },
    {
        id: 'cat-accesory',
        name: 'Accesorios',
        description: 'Lorem Ipsum  Accesorios es simplemente el texto de relleno de las imprentas y archivos de texto.',
        photoUrl: 'https://firebasestorage.googleapis.com/v0/b/home-office-coder-react.appspot.com/o/categories%2Faccesorios.jpeg?alt=media&token=d15ffd71-d440-4349-9f68-fc95be58dba8'
    },
]

const products = [
    {
        id: 101,
        name: 'Silla Gamer X100',
        category: 'cat-chair',
        description: 'Lorem Ipsum  Sillas es simplemente el texto de relleno de las imprentas y archivos de texto.',
        photoUrl: '../../assets/silla-gamer.jpeg',
        price: 620
    },
    {
        id: 102,
        name: 'Silla Office Pro',
        category: 'cat-chair',
        description: 'Lorem Ipsum  Escritorios es simplemente el texto de relleno de las imprentas y archivos de texto.',
        photoUrl: '../../assets/silla-ergo.jpeg',
        price: 1080
    },
    {
        id: 103,
        name: 'Silla Confort 360',
        category: 'cat-chair',
        description: 'Lorem Ipsum  Accesorios es simplemente el texto de relleno de las imprentas y archivos de texto.',
        photoUrl: '../../assets/silla-confort.jpeg',
        price: 890
    },
    {
        id: 104,
        name: 'Escritorio Melamine Cenizzo',
        category: 'cat-desktop',
        description: 'Lorem Ipsum  Accesorios es simplemente el texto de relleno de las imprentas y archivos de texto.',
        photoUrl: '../../assets/esc-mela-cen.jpeg',
        price: 710
    },
    {
        id: 105,
        name: 'Escritorio Gamer Racing',
        category: 'cat-desktop',
        description: 'Lorem Ipsum  Accesorios es simplemente el texto de relleno de las imprentas y archivos de texto.',
        photoUrl: '../../assets/esc-gamer.jpeg',
        price: 400
    },
    {
        id: 106,
        name: 'Escritorio Vintage Tosso',
        category: 'cat-desktop',
        description: 'Lorem Ipsum  Accesorios es simplemente el texto de relleno de las imprentas y archivos de texto.',
        photoUrl: '../../assets/esc-vintage.jpeg',
        price: 670
    },
    {
        id: 107,
        name: 'Mouse Wireless Logitech G310',
        category: 'cat-accesory',
        description: 'Lorem Ipsum  Accesorios es simplemente el texto de relleno de las imprentas y archivos de texto.',
        photoUrl: '../../assets/mouse1.jpeg',
        price: 399
    },
    {
        id: 108,
        name: 'Teclado Razer Cynosa v2',
        category: 'cat-accesory',
        description: 'Lorem Ipsum  Accesorios es simplemente el texto de relleno de las imprentas y archivos de texto.',
        photoUrl: '../../assets/teclado-razer-cynosa-chroma.jpeg',
        price: 360
    },
    {
        id: 109,
        name: 'Camara Logitech Z1080',
        category: 'cat-accesory',
        description: 'Lorem Ipsum  Accesorios es simplemente el texto de relleno de las imprentas y archivos de texto.',
        photoUrl: '../../assets/camara-logitech-c270-hd.jpeg',
        price: 450
    },
]

function getCategories() {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(categories);
        }, 2000);
    })
}

function getCategoryById(categoryId) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(categories.find(c => c.id === categoryId));
        }, 2000);
    })
}

function getProducts(categoryId) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let category;
            getCategoryById(categoryId).then(
                r => {
                    category = r;
                    resolve({ category: category, products: category ? products.filter(p => p.category === categoryId) : products });
                }
            );
        }, 1000);
    })
}

function getProductById(productId) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            getProducts().then(
                r => {
                    resolve(r ? r.products.find(p => String(p.id) === String(productId)) : null);
                }
            );
        }, 1000);
    })
}

export { getCategories, getProducts, getProductById }
