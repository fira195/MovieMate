const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    await userModel.create({ username, password: hashedPassword, email });
    res.status(201).json({ message: "User Created" });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(e);
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) return res.status(404).json({ message: "User Not Found" });
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Unauth" });
    res.status(200).json({ user });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(e);
  }
};
export {login}
export default createUser