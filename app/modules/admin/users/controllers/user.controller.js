const userRepo = require('admin/users/repositories/user.repository');
const roleRepo = require('admin/role/repositories/role.repository');
const bcrypt = require('bcrypt-nodejs')

exports.login = async (ctx) => {
    try{
        return await ctx.render('admin/users/views/login');
    } catch(error) {
        console.log('error', error);
        return error;
    }
}

exports.authenticate = async (ctx) => {
    try {
        let newRole = {
            role: 'admin',
            description: 'Admin role'
        }
        const role = await roleRepo.save(newRole);

        let newUser = {
            first_name: 'Super',
            last_name: 'Admin',
            role: role._id,
            email: 'admin@recipiesapp.com',
            password: bcrypt.hashSync('123456', bcrypt.genSaltSync(8), null)
        }
        console.log('29', newUser);
        const user = await roleRepo.save(newUser);
        console.log('31', user);
        return { status: 200, data: [], message: 'Users created Successfully' };
    } catch (error) {
        console.log('error', error);
        return error;
    }
}