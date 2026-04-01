import jsPDF from 'jspdf';

export const generateInvoice = (order) => {
  const doc = new jsPDF();
  doc.setFontSize(22);
  doc.setTextColor(232, 62, 140);
  doc.text('Aaraz. Invoice', 20, 20);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Order ID: #${order.id}`, 20, 30);
  doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 20, 40);
  doc.text(`Shipping Address: ${order.address}`, 20, 50);
  doc.text('Items:', 20, 70);
  let yPos = 80;
  let total = 0;
  order.items.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.name} - $${item.price}`, 20, yPos);
    total += item.price;
    yPos += 10;
  });
  doc.setFontSize(14);
  doc.text(`Total Amount: $${total.toFixed(2)}`, 20, yPos + 10);
  doc.save(`Aaraz_Invoice_${order.id}.pdf`);
};