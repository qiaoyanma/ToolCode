function Vehicle() {
    this.enginee = 1;
    let v = 2;
}
Vehicle.prototype.ignition = function () {
    console.log("Turning on my engine");
}
Vehicle.prototype.drive = function () {
    this.ignition();
    console.log("moving forward");
}

function Car() {
    this.a = "aa";
    let b = "bb";
    var car = new Vehicle();
    car.wheets = 4;
    var verDrive = car.drive;
    car.drive = function () {
        verDrive.call(this);
        console.log(this);
        console.log(this.wheets + "Wheets");
    }

    return car;
}

var car = new Car();
car.drive();