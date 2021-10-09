export default function dataSource() {

    const data = [
        {
            name: 'Sillas', 
            description: 'Lorem Ipsum  Sillas es simplemente el texto de relleno de las imprentas y archivos de texto.',
            photoUrl: '../../assets/sillas.jpeg'
        },
        {
            name: 'Escritorios', 
            description: 'Lorem Ipsum  Escritorios es simplemente el texto de relleno de las imprentas y archivos de texto.',
            photoUrl: '../../assets/escritorios.jpeg'
        },
        {
            name: 'Accesorios', 
            description: 'Lorem Ipsum  Accesorios es simplemente el texto de relleno de las imprentas y archivos de texto.',
            photoUrl: '../../assets/accesorios.jpeg'
        },
        {
            name: 'Accesorios', 
            description: 'Lorem Ipsum  Accesorios es simplemente el texto de relleno de las imprentas y archivos de texto.',
            photoUrl: '../../assets/accesorios.jpeg'
        },
        {
            name: 'Accesorios', 
            description: 'Lorem Ipsum  Accesorios es simplemente el texto de relleno de las imprentas y archivos de texto.',
            photoUrl: '../../assets/accesorios.jpeg'
        },
        {
            name: 'Accesorios', 
            description: 'Lorem Ipsum  Accesorios es simplemente el texto de relleno de las imprentas y archivos de texto.',
            photoUrl: '../../assets/accesorios.jpeg'
        },
    ]

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 2000);
    })
}
