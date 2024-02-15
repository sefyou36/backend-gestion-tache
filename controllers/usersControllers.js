const User = require('../models/userModel');


const createUser = (req, res) => {
    const { lastName, firstName, password, email } = req.body; // Extraire les données du corps de la requête

    // Vérifier si l'email existe déjà dans la base de données
    User.findOne({ email })
        .then(existingUser => {
            if (existingUser) { // Si un utilisateur avec cet email existe déjà
                return res.status(400).json({ message: "Email already exists" });
            }
            // Si l'email est unique, créer un nouvel utilisateur
            const newUser = new User({ lastName, firstName, password, email });
            return newUser.save(); // Enregistrer l'utilisateur dans la base de données
        })
        .then(user => {
            res.status(201).json({ user }); // Répondre avec l'utilisateur créé
        })
        .catch(err => {
            res.status(500).json({ error: err.message }); // Gérer les erreurs
        });
};

const getAllUser = async (req,res) => {
    const users = await User.find();

    res.json({
        data: {
            users
        }
    })
};

const getOneUser = async (req,res) => {
    const id = req.params.id ;
    const user = await User.findById(id);
    if(!user) {
        return res.status(404).json({error : 'User not found'});

    }
    res.json({
        user : user

    })
};

const updateUser = async (req,res) => {
    const id = req.params.id;
    const update = req.body;
    const updateUser = await User.findByIdAndUpdate(id,update, {new:true});

    if(!updateUser) {

        return res.status(404).json({ error : 'User not found'});

    }
    res.json({
        updateUser : updateUser
    })
};

const deleteUser = async (req,res) => {
    const id = req.params.id;
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
        return res.status(404).json({ error : 'User not found'});

    }
    res.json({
        deleteUser : deleteUser
    })

};

module.exports = {
    createUser,
    getAllUser,
    getOneUser,
    updateUser,
    deleteUser
    }