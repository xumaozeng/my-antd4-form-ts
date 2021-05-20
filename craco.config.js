const CracoLessPlugin = require("craco-less");

module.exports = {
  babel: {
    plugins: [
      [
        "import",
        {
          libraryName: "choerodon-ui",
          style: true // 默认样式文件less
        },
        "c7n"
      ],
      [
        "import",
        {
          libraryName: "choerodon-ui/pro",
          style: true
        },
        "c7n-pro"
      ]
    ]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true
          }
        },
        cssLoaderOptions: {
          url: false
        }
      }
    }
  ]
};
