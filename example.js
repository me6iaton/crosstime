var Person = function(name) {
  this.name = name;
  this.canTalk = true;
  this.greet = function() {
    if (this.canTalk) {
      console.log('Привет, я ' + this.name);
    }
  };
};

var Employee = function(name, title) {
  this.name = name;
  this.title = title;
  this.greet = function() {
    if (this.canTalk) {
      console.log('Привет, я ' + this.name + ', ' + this.title);
    }
  };
};
Employee.prototype = new Person();

var Customer = function(name) {
  this.name = name;
};
Customer.prototype = new Person();

var Mime = function(name) {
  this.name = name;
  this.canTalk = false;
};
Mime.prototype = new Person();

var bob = new Employee('Боб', 'Строитель');
var joe = new Customer('Джо');
var rg = new Employee('Ред Грин', 'Разнорабочий');
var mike = new Customer('Майк');
var mime = new Mime('Мим');
bob.greet();
joe.greet();
rg.greet();
mike.greet();
mime.greet();
mime.greet();
