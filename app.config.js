import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    infuraKey: process.env.INFURA_KEY,
    eas: {
      projectId: "7cd1efd8-6801-4e62-bc26-7d0e3fa3449f",
    },
  },
});
