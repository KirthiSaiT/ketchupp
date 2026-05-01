/**
 * Mock email utility for handling transactional emails during phase 1.
 * This will be replaced by Brevo (Sendinblue) in the future.
 */

interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  total: number;
  items: any[];
}

export async function sendMockOrderConfirmation(details: OrderDetails) {
  console.log("\n--- [MOCK EMAIL LOG] ---");
  console.log(`TO: ${details.customerEmail}`);
  console.log(`SUBJECT: Order Confirmation - ${details.orderId}`);
  console.log(`DEAR: ${details.customerName},`);
  console.log(`THANK YOU FOR SHOPPING WITH KETCHUPP!`);
  console.log(`TOTAL AMOUNT: \u20b9${details.total}`);
  console.log(`ITEMS:`);
  details.items.forEach((item, i) => {
    console.log(`  ${i+1}. ${item.name} (${item.size}) x ${item.quantity}`);
  });
  console.log("--- [END MOCK EMAIL LOG] ---\n");
  
  return { success: true };
}
