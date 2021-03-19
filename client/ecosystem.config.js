module.exports = {
    apps: [{
        name: "itsite-client",
        script: "npm",
        args: 'start',
        interpreter: 'none',
        watch: ["./"],
        watch_delay: 2000,
        ignore_watch: ["node_modules"],
        watch_options: {
            "followSymlinks": false
        }
    }]
}