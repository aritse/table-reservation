class Customer {
  constructor(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.id = Customer.prototype.count;
    Customer.prototype.count++;
  }
}

Customer.prototype.count = 0;

module.exports = Customer;
