const { Schema, model } = require("mongoose");
const EmployeesSchema = Schema(
  {
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    executingUnit: {
      // required: true,
      type: Schema.Types.ObjectId,
      ref: "Unidad",
    },
    telephone: {
      type: String,
    },
    positionHeld: {
      required: true,
      type: String,
    },
    homeAddress: {
      type: String,
    },
  },
  { collection: "empleados" }
);

EmployeesSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.empId = _id;
  return object;
});

module.exports = model("Employee", EmployeesSchema);
