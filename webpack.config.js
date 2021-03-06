module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist/',
        filename: "bundle.js",
        publicPath: '/'
    },
    devServer: {
        inline: false,
        contentBase: "./dist",
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'] //presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};
