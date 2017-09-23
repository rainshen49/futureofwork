const path = require('path')
module.exports = {
    entry: "./ts/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    externals: {
        "react": 'React',
        "react-dom": "ReactDOM",
        "redux":"Redux"
    }
}