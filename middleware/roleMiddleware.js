// const roleMiddleware = (allowedRoles) => {
//     return (req, res, next) => {

//         const userRole = req.headers.role; 

//         if (!userRole) {
//             return res.status(403).json({ message: "Role not provided" });
//         }

//         if (!allowedRoles.includes(userRole)) {
//             return res.status(403).json({ message: "Access denied" });
//         }

//         next();
//     };
// };

// module.exports = roleMiddleware;


const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: Access denied" });
        }

        next();
    };
};

module.exports = roleMiddleware;
