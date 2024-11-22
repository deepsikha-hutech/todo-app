const env = "local";

let variable = {};
variable.env = env;
if (env === "local") {
  variable.TODO_API_URL = "http://localhost:3000";
} else if (env === "dev") {
  variable.TODO_API_URL = "";
} else if (env === "qa") {
} else if (env === "uat") {
} else if (env === "prod") {
}

export default variable;
