import firebase from 'firebase';
import { getFirestore } from './config';

export default function addOrder({customer, cart, total}) {
    return new Promise(async (resolve, reject) => {
        const db = getFirestore();

        const insertOrder = async (order) => {
    
            const orders = db.collection('orders');
    
            orders.add(order).then(res => {
                console.log(res);
                resolve(res.id);
            }).error( error => reject(error))
        }
    
        const validateAndUpdateItemsStock = async () => {
            const itemsToUpdate = db.collection('productos')
                .where(firebase.firestore.FieldPath.documentId(), 'in', cart.map(item => item.id))
            const query = await itemsToUpdate.get();
            const batch = db.batch();
    
            const outOfStock = [];
    
            query.docs.forEach(doc => {
                const itemCart = cart.find(item => item.id === doc.id)
                if (doc.data().stock >= itemCart.quantity) {
                    batch.update(doc.ref, { stock: doc.data().stock - itemCart.quantity })
                } else {
                    outOfStock.push({ id: doc.id, ...doc.data() });
                }
            })
    
            if (outOfStock.length === 0) {
                batch.commit();
                const order = {
                    customer,
                    items: cart.map(item => {
                        return {
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity
                        }
                    }),
                    total,
                    date: firebase.firestore.Timestamp.fromDate(new Date()),
                }
                insertOrder(order);
            } else {
                reject(outOfStock)
            }
        }

        validateAndUpdateItemsStock();
    })
}
