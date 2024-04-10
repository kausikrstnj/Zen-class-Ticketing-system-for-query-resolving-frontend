require("dotenv").config();
const config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_SECRET_KEY",
    mongoUri: process.env.DB_URL || "mongodb://localhost:27017/ZenClass",
    createQueryPublicKey: 'K8VsMKVO-imbFjfI6',
    createQueryserviceKey: 'service_hhv6shd',
    createQuerytemplate: 'template_wulhwvk',
    SignUptemplate: 'template_0q6iyrd',
    URL: 'http://localhost:3000',
};

module.exports = config;