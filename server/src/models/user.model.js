import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Userschema = new mongoose.Schema({
    email: {type: String, unique: true}, 
    username: {type: String},
    password: {type: String},
    role: {type: String, enum: ["user", "admin"]}
})

// Pre-save hook to hash password
Userschema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', Userschema);





export default User;