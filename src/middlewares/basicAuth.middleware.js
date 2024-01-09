import { UserModel } from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
  // Credentials sent from user will be part of authorization header
  // Note - By header we mean http header
  const authHeader = req.headers["authorization"];
  //1. Check of authorization header is empty
  if (!authHeader) {
    //401 - status code signifies unauthorized request
    return res.status(401).send("No authorization details found");
  }
  // If authorization details exists then we need to extract the
  // credentials and then verify if the credentials are correct or not
  console.log(authHeader); //-----------------------------------------------------
  // 2. Extract the credentials
  // Credentials which we are going to sent in the client and receive in
  // server, they will be encoded with base64 encoding

  const base64Credentials = authHeader.replace("Basic ", "");
  // Note - authHeader is in the format "Basic wixivnqw48yu283rhfn2pr2p239ru23o"
  // i.e., we repalce the prefix "Basic " with empty string using .replace method
  // Then we are only left with encoded credential which we will decode.
  // Decoding credential will give us the actual user name and password which cleint
  // had sent to us.
  console.log("base64Credential - ", base64Credentials); //-----------------------

  // 3. Decoding Credentials
  const decodededCredentials = Buffer.from(
    base64Credentials,
    "base64"
  ).toString("utf-8");

  console.log(decodededCredentials); //---------------------------------------------
  // Here in decodedCredentials we will get a string [username:password]
  // in which username and password will be separated by a semi colon

  // Which we will separate using .splits(':') - will give us username and password
  // separated in an array.
  const credentials = decodededCredentials.split(":");

  // 4. Mathching the credentials with users info stored in the UserModel
  // For retrieving all the user details, we will need to create a
  // getAllUser kind of method in the UserModel
  const user = UserModel.getAlluser().find(
    (u) => u.email === credentials[0] && u.password === credentials[1]
  );
  if (user) {
    next();
  } else {
    res.status(401).send("Invalid user");
  }
};
export default basicAuthorizer;
