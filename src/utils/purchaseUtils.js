// Purchase utility functions for localStorage management

export const savePurchase = (purchaseData) => {
  try {
    const existingPurchases = JSON.parse(
      localStorage.getItem("purchases") || "[]"
    );
    const newPurchase = {
      ...purchaseData,
      id: Date.now().toString(),
      savedAt: new Date().toISOString(),
      status: "completed",
    };
    existingPurchases.push(newPurchase);
    localStorage.setItem("purchases", JSON.stringify(existingPurchases));
    return { success: true, purchase: newPurchase };
  } catch (error) {
    console.error("Error saving purchase:", error);
    return { success: false, error: error.message };
  }
};

export const getPurchases = () => {
  try {
    const purchases = JSON.parse(localStorage.getItem("purchases") || "[]");
    return purchases.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt)); // Most recent first
  } catch (error) {
    console.error("Error getting purchases:", error);
    return [];
  }
};

export const getPurchaseById = (id) => {
  try {
    const purchases = getPurchases();
    return purchases.find((purchase) => purchase.id === id);
  } catch (error) {
    console.error("Error getting purchase by ID:", error);
    return null;
  }
};

export const getPurchasesByUser = (userId) => {
  try {
    const purchases = getPurchases();
    return purchases.filter((purchase) => purchase.buyerUid === userId);
  } catch (error) {
    console.error("Error getting purchases by user:", error);
    return [];
  }
};

export const clearAllPurchases = () => {
  try {
    localStorage.removeItem("purchases");
    return { success: true };
  } catch (error) {
    console.error("Error clearing purchases:", error);
    return { success: false, error: error.message };
  }
};

