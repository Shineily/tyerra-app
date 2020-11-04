import { db } from "../firebase/firebase-config"

export const loadUserInfo = async (uid) => {
    const userInfo =  await db.collection(`/${uid}/auth/userype`).get();
    const info = [];

    userInfo.forEach((snapChild) => {
        info.push({id: snapChild.id, ...snapChild.data()});
    })

    return info;
}