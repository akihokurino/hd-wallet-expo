import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    infuraKey: process.env.INFURA_KEY,
  },
});
