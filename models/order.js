class Order {
  constructor(id, items, totalAmount, date, locationAddress) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
    this.locationAddress = locationAddress;
  }
  get readableDate() {
    return this.date.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

export default Order;
