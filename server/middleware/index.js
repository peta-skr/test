const admin = require("../config/firebase-config");

/**
 * アクセストークンを受け取って、トークンを検証する。
 * あっていたらそのまま次の処理へ移行。
 * 間違っていたらエラーを吐く。
 */

const protect = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    // console.log(decodeValue);
    if (decodeValue) {
      req.user = decodeValue;
      return next();
    }
    return res.json({ message: "Un authorize" });
  } catch (e) {
    return res.json({ message: "Internal Error" });
  }
};

module.exports = { protect };
