import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore"
import { db } from "./config"

// Products
export const getProducts = async (filters = {}) => {
  try {
    let q = collection(db, "products")

    if (filters.category) {
      q = query(q, where("category", "==", filters.category))
    }

    if (filters.minPrice && filters.maxPrice) {
      q = query(q, where("price", ">=", filters.minPrice), where("price", "<=", filters.maxPrice))
    }

    if (filters.sortBy) {
      const [field, direction] = filters.sortBy.split("-")
      q = query(q, orderBy(field, direction === "desc" ? "desc" : "asc"))
    }

    if (filters.limit) {
      q = query(q, limit(filters.limit))
    }

    const querySnapshot = await getDocs(q)
    const products = []

    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() })
    })

    return { success: true, products }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getProduct = async (productId) => {
  try {
    const docRef = doc(db, "products", productId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { success: true, product: { id: docSnap.id, ...docSnap.data() } }
    } else {
      return { success: false, error: "Product not found" }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    return { success: true, productId: docRef.id }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateProduct = async (productId, productData) => {
  try {
    const docRef = doc(db, "products", productId)
    await updateDoc(docRef, {
      ...productData,
      updatedAt: new Date().toISOString(),
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, "products", productId))
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Orders
export const createOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    return { success: true, orderId: docRef.id }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getUserOrders = async (userId) => {
  try {
    const q = query(collection(db, "orders"), where("userId", "==", userId), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(q)
    const orders = []

    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() })
    })

    return { success: true, orders }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateOrderStatus = async (orderId, status) => {
  try {
    const docRef = doc(db, "orders", orderId)
    await updateDoc(docRef, {
      status,
      updatedAt: new Date().toISOString(),
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Categories
export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"))
    const categories = []

    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() })
    })

    return { success: true, categories }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Real-time listeners
export const subscribeToProducts = (callback, filters = {}) => {
  let q = collection(db, "products")

  if (filters.category) {
    q = query(q, where("category", "==", filters.category))
  }

  return onSnapshot(q, (querySnapshot) => {
    const products = []
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() })
    })
    callback(products)
  })
}

export const subscribeToUserOrders = (userId, callback) => {
  const q = query(collection(db, "orders"), where("userId", "==", userId), orderBy("createdAt", "desc"))

  return onSnapshot(q, (querySnapshot) => {
    const orders = []
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() })
    })
    callback(orders)
  })
}
