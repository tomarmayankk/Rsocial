export const signup = async(req, res) => {
    const {fullName, email, password} = req.body;
    try {
        const newUser = ({
            fullName,
            email, 
            password
        })

        if(newUser){
            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                password: newUser.password
            })

            console.log(newUser)
        }
    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({message: "internal server error"})
    }
}