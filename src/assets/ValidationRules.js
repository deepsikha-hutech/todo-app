const Signuprule = {
  name: {
    mandatory: true,
    allowNull: false,
    type: "string",
    minLength: 3,
    minLengthError: "Name must have minimum 3 characters.",
  },
  email: {
    type: "email",
    mandatory: false,
    allowNull: false,
  },
  password: {
    mandatory: true,
    allowNull: false,
    type: "string",
  },
};

const Loginrule = {
  email: {
    mandatory: true,
    allowNull: false,
    type: "string",
  },
  password: {
    mandatory: true,
    allowNull: false,
    type: "string",
  },
};

export default { Signuprule, Loginrule };
