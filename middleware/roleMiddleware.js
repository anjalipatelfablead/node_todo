const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {

        const userRole = req.headers.role; 

        if (!userRole) {
            return res.status(403).json({ message: "Role not provided" });
        }

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    };
};

module.exports = roleMiddleware;
