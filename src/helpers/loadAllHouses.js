import { db } from "../firebase/firebase-config"

export const loadAllHouses = async () => {
    const allHouses = await db.collection(`houses`).get();
    const houses = [];

    allHouses.forEach((snapChild) => {
        houses.push({id: snapChild.id, ...snapChild.data()})
    });
    return houses;
}
