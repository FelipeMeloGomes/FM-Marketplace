module.exports = {
  hooks: {
    readPackage(packageJson) {
      const allowed = [
        '@prisma/client',
        '@prisma/engines',
        'bcrypt',
        'prisma',
        'sharp'
      ];

      if (allowed.includes(packageJson.name)) {
        packageJson.scripts = packageJson.scripts || {};
        return packageJson;
      }

      delete packageJson.scripts;
      return packageJson;
    },
  },
};
